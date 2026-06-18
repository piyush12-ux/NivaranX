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

  const renderContent = () => {
    if (activePage === 'dashboard') {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white mb-6">Admin Dashboard 👨‍💼</h2>

          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
              <p className="text-4xl font-bold text-blue-400">{analytics.total || 0}</p>
              <p className="text-gray-400 mt-1">Total</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
              <p className="text-4xl font-bold text-yellow-400">{analytics.pending || 0}</p>
              <p className="text-gray-400 mt-1">Pending</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
              <p className="text-4xl font-bold text-green-400">{analytics.resolved || 0}</p>
              <p className="text-gray-400 mt-1">Resolved</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
              <p className="text-4xl font-bold text-purple-400">{analytics.users || 0}</p>
              <p className="text-gray-400 mt-1">Users</p>
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
                <div>
                  <h3 className="font-bold text-white">{c.title}</h3>
                  <p className="text-gray-500 text-sm">by {c.user?.name} — {c.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor(c.status)}`}>
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
          <h2 className="text-2xl font-bold text-white mb-6">All Complaints</h2>

          {/* Search & Filter */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Search by title, user, location..."
              className="flex-1 bg-gray-900 border border-gray-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="bg-gray-900 border border-gray-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
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
              className="bg-gray-900 border border-gray-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
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

          <p className="text-gray-500 text-sm mb-4">{filteredComplaints.length} complaints found</p>

          {filteredComplaints.map((c, index) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 border border-gray-800 p-5 rounded-2xl mb-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white">{c.title}</h3>
                  <p className="text-gray-400 mt-1">{c.description}</p>
                  {c.image && (
                    <img
                      src={`https://nivaranx.onrender.com/uploads/${c.image}`}
                      alt="complaint"
                      className="mt-3 rounded-xl w-full max-h-48 object-cover"
                    />
                  )}
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>👤 {c.user?.name}</span>
                    <span>📍 {c.location}</span>
                    <span>🏷️ {c.category}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <select
                    className="bg-gray-800 border border-gray-700 text-white p-2 rounded-xl text-sm"
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
          <h2 className="text-2xl font-bold text-white mb-6">Analytics 📊</h2>
          <div className="grid grid-cols-2 gap-4">
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

      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
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
              onClick={() => setActivePage(item.id)}
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
      <Chatbot />
    </div>
  )
}

export default AdminDashboard