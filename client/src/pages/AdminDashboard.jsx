import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import toast, { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import axios from 'axios'
import Chatbot from '../components/Chatbot'

const AdminDashboard = () => {
  const { user, logoutUser } = useAuth()
  const [complaints, setComplaints] = useState([])
  const [analytics, setAnalytics] = useState({})
  const [activePage, setActivePage] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const token = localStorage.getItem('token')

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('https://nivaranx.onrender.com/api/admin/complaints', {
        headers: { authorization: `Bearer ${token}` }
      })
      setComplaints(res.data.complaints)
    } catch (err) {
      toast.error('Error loading complaints!')
    }
  }

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get('https://nivaranx.onrender.com/api/admin/analytics', {
        headers: { authorization: `Bearer ${token}` }
      })
      setAnalytics(res.data)
    } catch (err) {
      toast.error('Error loading analytics!')
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://nivaranx.onrender.com/api/admin/complaints/${id}/status`,
        { status },
        { headers: { authorization: `Bearer ${token}` } }
      )
      toast.success('Status updated!')
      fetchComplaints()
    } catch (err) {
      toast.error('Error updating status!')
    }
  }

  useEffect(() => {
    fetchComplaints()
    fetchAnalytics()
  }, [])

  const statusColor = (status) => {
    if (status === 'resolved') return 'bg-green-500/20 text-green-400 border border-green-500/30'
    if (status === 'in_progress') return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
    if (status === 'under_review') return 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    if (status === 'rejected') return 'bg-red-500/20 text-red-400 border border-red-500/30'
    return 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
  }

  const filteredComplaints = complaints.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.user?.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus ? c.status === filterStatus : true
    const matchCategory = filterCategory ? c.category === filterCategory : true
    return matchSearch && matchStatus && matchCategory
  })

  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'complaints', icon: '📋', label: 'All Complaints' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
  ]

  const handlePageChange = (page) => {
    setActivePage(page)
    setSidebarOpen(false)
  }

  const renderContent = () => {
    if (activePage === 'dashboard') {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Admin Dashboard 👨‍💼</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl text-center">
              <p className="text-3xl font-bold text-blue-400">{analytics.total || 0}</p>
              <p className="text-gray-400 mt-1 text-sm">Total</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl text-center">
              <p className="text-3xl font-bold text-yellow-400">{analytics.pending || 0}</p>
              <p className="text-gray-400 mt-1 text-sm">Pending</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl text-center">
              <p className="text-3xl font-bold text-green-400">{analytics.resolved || 0}</p>
              <p className="text-gray-400 mt-1 text-sm">Resolved</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl text-center">
              <p className="text-3xl font-bold text-purple-400">{analytics.users || 0}</p>
              <p className="text-gray-400 mt-1 text-sm">Users</p>
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mb-4">Recent Complaints</h3>
          {complaints.slice(0, 5).map((c, index) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 border border-gray-800 p-4 rounded-2xl mb-3"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1 mr-2">
                  <h3 className="font-bold text-white text-sm">{c.title}</h3>
                  <p className="text-gray-500 text-xs">by {c.user?.name} — {c.location}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor(c.status)}`}>
                  {c.status}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )
    }

    if (activePage === 'complaints') {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">All Complaints</h2>
          <div className="flex flex-col gap-3 mb-6">
            <input
              type="text"
              placeholder="Search by title, user, location..."
              className="w-full bg-gray-900 border border-gray-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex gap-3">
              <select
                className="flex-1 bg-gray-900 border border-gray-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                className="flex-1 bg-gray-900 border border-gray-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Road Damage">Road Damage</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Electricity">Electricity</option>
                <option value="Garbage">Garbage</option>
                <option value="Street Light">Street Light</option>
                <option value="Public Safety">Public Safety</option>
              </select>
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-4">{filteredComplaints.length} complaints found</p>
          {filteredComplaints.map((c, index) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 border border-gray-800 p-4 rounded-2xl mb-4"
            >
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="font-bold text-white text-sm">{c.title}</h3>
                  <p className="text-gray-400 mt-1 text-sm">{c.description}</p>
                  {c.image && (
                    <img
                      src={c.image}
                      alt="complaint"
                      className="mt-3 rounded-xl w-full max-h-48 object-cover"
                    />
                  )}
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                    <span>👤 {c.user?.name}</span>
                    <span>📍 {c.location}</span>
                    <span>🏷️ {c.category}</span>
                  </div>
                </div>
                <select
                  className="w-full bg-gray-800 border border-gray-700 text-white p-2 rounded-xl text-sm"
                  value={c.status}
                  onChange={(e) => updateStatus(c._id, e.target.value)}
                >
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )
    }

    if (activePage === 'analytics') {
      const categories = complaints.reduce((acc, c) => {
        acc[c.category] = (acc[c.category] || 0) + 1
        return acc
      }, {})

      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Analytics 📊</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(categories).map(([cat, count]) => (
              <div key={cat} className="bg-gray-900 border border-gray-800 p-4 rounded-2xl">
                <p className="text-gray-400">{cat}</p>
                <p className="text-3xl font-bold text-blue-400 mt-1">{count}</p>
                <div className="mt-2 bg-gray-800 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / complaints.length) * 100}%` }}
                    className="bg-blue-500 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Toaster />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed md:relative z-30 md:z-auto h-full transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <motion.div
          className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col"
        >
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              NivaranX
            </h1>
            <p className="text-gray-500 text-xs mt-1">Admin Panel</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.03, x: 5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePageChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activePage === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <p className="text-gray-500 text-xs mb-2">Logged in as</p>
            <p className="text-white font-bold text-sm">{user.name}</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={logoutUser}
              className="w-full mt-3 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-medium"
            >
              <span>🚪</span>
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-400 hover:text-white text-xl"
          >
            ☰
          </button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent md:hidden">
            NivaranX
          </h1>
          <span className="ml-auto text-gray-400 text-sm">{user.name}</span>
        </div>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      <Chatbot />
    </div>
  )
}

export default AdminDashboard