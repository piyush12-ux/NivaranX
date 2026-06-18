import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import * as api from '../services/api'
import toast, { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import Chatbot from '../components/Chatbot'
import Profile from './Profile'
import ComplaintDetail from './ComplaintDetail'
import Notifications from '../components/Notifications'

const Dashboard = () => {
  const { user } = useAuth()
  const [activePage, setActivePage] = useState('dashboard')
  const [complaints, setComplaints] = useState([])
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    image: null
  })

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      const res = await api.getMyComplaints()
      setComplaints(res.data.complaints)
    } catch (err) {
      toast.error('Complaints load nahi hui!')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.image) {
      toast.error('Photo upload karna zaroori hai!')
      return
    }
    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('category', form.category)
      formData.append('location', form.location)
      formData.append('image', form.image)

      await api.createComplaint(formData)
      toast.success('Complaint submitted!')
      setForm({ title: '', description: '', category: '', location: '', image: null })
      fetchComplaints()
      setActivePage('complaints')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error aaya!')
    }
  }

  const statusColor = (status) => {
    if (status === 'resolved') return 'bg-green-500/20 text-green-400 border border-green-500/30'
    if (status === 'in_progress') return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
    if (status === 'under_review') return 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    return 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
  }

  const filteredComplaints = complaints.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = filterCategory ? c.category === filterCategory : true
    return matchSearch && matchCategory
  })

  const renderContent = () => {
    if (activePage === 'dashboard') {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white mb-6">Welcome back, {user.name}! 👋</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
              <p className="text-4xl font-bold text-blue-400">{complaints.length}</p>
              <p className="text-gray-400 mt-1">Total</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
              <p className="text-4xl font-bold text-yellow-400">
                {complaints.filter(c => c.status !== 'resolved').length}
              </p>
              <p className="text-gray-400 mt-1">Pending</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
              <p className="text-4xl font-bold text-green-400">
                {complaints.filter(c => c.status === 'resolved').length}
              </p>
              <p className="text-gray-400 mt-1">Resolved</p>
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mb-4">Recent Complaints</h3>
          {complaints.slice(0, 3).map((c, index) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => { setSelectedComplaint(c); setActivePage('detail') }}
              className="bg-gray-900 border border-gray-800 p-4 rounded-2xl mb-3 hover:border-blue-500/50 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white">{c.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor(c.status)}`}>
                  {c.status}
                </span>
              </div>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>📍 {c.location}</span>
                <span>🏷️ {c.category}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )
    }

    if (activePage === 'detail') {
      return (
        <ComplaintDetail
          complaint={selectedComplaint}
          onBack={() => setActivePage('complaints')}
        />
      )
    }

    if (activePage === 'complaints') {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white mb-6">My Complaints</h2>
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Search complaints..."
              className="flex-1 bg-gray-900 border border-gray-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="bg-gray-900 border border-gray-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Road Damage">Road Damage</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Electricity">Electricity</option>
              <option value="Garbage">Garbage Collection</option>
              <option value="Street Light">Street Light</option>
              <option value="Public Safety">Public Safety</option>
            </select>
          </div>
          {filteredComplaints.length === 0 ? (
            <p className="text-gray-500">Koi complaint nahi mili!</p>
          ) : (
            filteredComplaints.map((c, index) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => { setSelectedComplaint(c); setActivePage('detail') }}
                className="bg-gray-900 border border-gray-800 p-5 rounded-2xl mb-4 hover:border-blue-500/50 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg text-white">{c.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor(c.status)}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-gray-400 mt-2">{c.description}</p>
                {c.image && (
                  <img
                    src={`http://localhost:5000/uploads/${c.image}`}
                    alt="complaint"
                    className="mt-3 rounded-xl w-full max-h-48 object-cover"
                  />
                )}
                <div className="flex gap-4 mt-3 text-sm text-gray-500">
                  <span>📍 {c.location}</span>
                  <span>🏷️ {c.category}</span>
                  <span>⚡ {c.priority}</span>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )
    }

    if (activePage === 'new') {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">New Complaint</h2>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title (min 10 characters)"
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                placeholder="Description (min 20 characters)"
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                rows="4"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <select
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Road Damage">Road Damage</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Electricity">Electricity</option>
                <option value="Garbage">Garbage Collection</option>
                <option value="Street Light">Street Light</option>
                <option value="Public Safety">Public Safety</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <div className="border border-dashed border-red-500/50 rounded-xl p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="imageUpload"
                  onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  {form.image ? (
                    <p className="text-green-400">✅ {form.image.name}</p>
                  ) : (
                    <p className="text-red-400">📷 Photo upload karo (zaroori hai!) *</p>
                  )}
                </label>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-xl font-bold shadow-lg shadow-blue-500/30"
              >
                Submit Complaint
              </motion.button>
            </form>
          </div>
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
          <h2 className="text-2xl font-bold text-white mb-6">Analytics</h2>
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

    if (activePage === 'profile') {
      return <Profile />
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Toaster />
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-gray-900 border-b border-gray-800 px-8 py-3 flex justify-between items-center">
          <p className="text-gray-400 text-sm">Hello, <span className="text-white font-bold">{user.name}</span>!</p>
          <Notifications />
        </div>
        <main className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      <Chatbot />
    </div>
  )
}

export default Dashboard