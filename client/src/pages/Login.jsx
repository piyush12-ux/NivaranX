import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import * as api from '../services/api'
import toast, { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'

const Login = ({ onSwitch, onHome, onForgot }) => {
  const [form, setForm] = useState({ email: '', password: '' })
  const { loginUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.login(form)
      loginUser(res.data.user, res.data.token)
      toast.success('Login successful!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            NivaranX
          </h1>
          <p className="text-gray-400 mt-2">AI Powered Grievance System</p>
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email"
            className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <div className="text-right">
            <span
              onClick={onForgot}
              className="text-blue-400 text-sm cursor-pointer hover:text-blue-300"
            >
              Forgot Password?
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Account nahi hai?{' '}
          <span
            onClick={onSwitch}
            className="text-blue-400 cursor-pointer font-bold hover:text-blue-300"
          >
            Register karo
          </span>
        </p>
      </motion.div>
    </div>
  )
}

export default Login