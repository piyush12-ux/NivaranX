import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
  const { user, loginUser, logoutUser } = useAuth()
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone || ''
  })
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.put(
        'http://localhost:5000/api/auth/profile',
        form,
        { headers: { authorization: `Bearer ${token}` } }
      )
      loginUser(res.data.user, token)
      toast.success('Profile updated!')
    } catch (err) {
      toast.error('Error updating profile!')
    }
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <Toaster />
      <h2 className="text-2xl font-bold text-white mb-6">My Profile 👤</h2>

      <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl mb-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-white font-bold text-xl">{user.name}</h3>
            <p className="text-gray-400">{user.email}</p>
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/30">
              {user.role}
            </span>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Full Name</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Email</label>
            <input
              type="email"
              className="w-full bg-gray-800 border border-gray-700 text-gray-500 p-3 rounded-xl cursor-not-allowed"
              value={user.email}
              disabled
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Phone</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-xl font-bold shadow-lg shadow-blue-500/30"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </motion.button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-gray-900 border border-red-500/30 p-6 rounded-2xl">
        <h3 className="text-red-400 font-bold mb-4">Danger Zone</h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={logoutUser}
          className="w-full bg-red-500/20 text-red-400 border border-red-500/30 p-3 rounded-xl font-bold"
        >
          Logout
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Profile