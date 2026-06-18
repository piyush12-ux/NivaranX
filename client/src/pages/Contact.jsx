import { useState } from 'react'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'

const Contact = ({ onBack }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent! We will get back to you soon.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Toaster />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center px-8 py-4 border-b border-gray-800"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          NivaranX
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-6 py-2 border border-gray-700 text-gray-300 rounded-xl font-bold hover:bg-gray-800"
        >
          ← Back
        </motion.button>
      </motion.nav>

      <div className="max-w-4xl mx-auto px-8 py-16">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            Contact{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Us
            </span>
          </h1>
          <p className="text-gray-400 text-xl">
            Have a question or feedback? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 border border-gray-800 p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Message</label>
                <textarea
                  placeholder="Your message..."
                  rows="5"
                  className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-xl font-bold shadow-lg shadow-blue-500/30"
              >
                Send Message 📨
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
              <h3 className="text-white font-bold text-lg mb-2">📧 Email</h3>
              <p className="text-gray-400">support@nivaranx.com</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
              <h3 className="text-white font-bold text-lg mb-2">📍 Location</h3>
              <p className="text-gray-400">Aligarh, Uttar Pradesh, India</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
              <h3 className="text-white font-bold text-lg mb-2">⏰ Support Hours</h3>
              <p className="text-gray-400">24/7 AI Chatbot Support</p>
              <p className="text-gray-400">Mon-Fri: 9AM - 6PM (Human Support)</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
              <h3 className="text-white font-bold text-lg mb-2">🤖 AI Chatbot</h3>
              <p className="text-gray-400">Login to access our 24/7 AI assistant for instant help!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact