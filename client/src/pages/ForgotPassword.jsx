import { useState } from 'react'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

const ForgotPassword = ({ onBack }) => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleForgot = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('https://nivaranx.onrender.com/api/auth/forgot-password', { email })
      setResetToken(res.data.resetToken)
      toast.success('Token generated! Enter new password.')
      setStep(2)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error!')
    }
    setLoading(false)
  }

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('https://nivaranx.onrender.com/api/auth/reset-password', {
        token: resetToken,
        newPassword
      })
      toast.success('Password reset successfully! Please login.')
      setTimeout(() => onBack(), 1500)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error!')
    }
    setLoading(false)
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
          <p className="text-gray-400 mt-2">Reset Your Password</p>
        </motion.div>

        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Forgot Password 🔑
            </h2>
            <form onSubmit={handleForgot} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-xl font-bold shadow-lg shadow-blue-500/30"
              >
                {loading ? 'Sending...' : 'Get Reset Token'}
              </motion.button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Set New Password 🔒
            </h2>
            <form onSubmit={handleReset} className="space-y-4">
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-xl font-bold shadow-lg shadow-blue-500/30"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </motion.button>
            </form>
          </>
        )}

        <p className="text-center mt-6 text-gray-400">
          <span
            onClick={onBack}
            className="text-blue-400 cursor-pointer font-bold hover:text-blue-300"
          >
            ← Back to Login
          </span>
        </p>
      </motion.div>
    </div>
  )
}

export default ForgotPassword