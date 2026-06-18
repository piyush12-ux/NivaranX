import { motion } from 'framer-motion'

const Home = ({ onLogin, onRegister, onAbout, onContact }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center px-8 py-4 border-b border-gray-800"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          NivaranX
        </h1>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAbout}
            className="px-6 py-2 text-gray-300 rounded-xl font-bold hover:text-white"
          >
            About
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContact}
            className="px-6 py-2 text-gray-300 rounded-xl font-bold hover:text-white"
          >
            Contact
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogin}
            className="px-6 py-2 border border-blue-500 text-blue-400 rounded-xl font-bold hover:bg-blue-500/10"
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRegister}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30"
          >
            Register
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-bold border border-blue-500/30">
            🤖 AI Powered Platform
          </span>
          <h1 className="text-6xl font-bold mt-6 mb-6 leading-tight">
            Your Voice,
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Our Resolution
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
            NivaranX is an AI-powered grievance management platform where citizens can submit public complaints and track their status in real-time.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRegister}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30"
            >
              Submit Complaint 🚀
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogin}
              className="px-8 py-4 border border-gray-700 text-gray-300 rounded-xl font-bold text-lg hover:bg-gray-800"
            >
              Login
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-3 gap-6 mt-20"
        >
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <p className="text-4xl font-bold text-blue-400">500+</p>
            <p className="text-gray-400 mt-2">Complaints Resolved</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <p className="text-4xl font-bold text-green-400">98%</p>
            <p className="text-gray-400 mt-2">Success Rate</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <p className="text-4xl font-bold text-purple-400">24hrs</p>
            <p className="text-gray-400 mt-2">Avg Resolution Time</p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-white mb-10">Why Choose NivaranX?</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: '🤖', title: 'AI Powered', desc: 'AI automatically detects complaint category and priority' },
              { icon: '📊', title: 'Real-time Tracking', desc: 'Track your complaint status in real-time' },
              { icon: '🔒', title: 'Secure Platform', desc: 'JWT authentication and advanced security features' },
              { icon: '📷', title: 'Photo Evidence', desc: 'Upload photos as proof with your complaint' },
              { icon: '⚡', title: 'Fast Resolution', desc: 'AI-powered fast department assignment and resolution' },
              { icon: '💬', title: 'AI Chatbot', desc: '24/7 AI assistant to help you anytime' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-left hover:border-blue-500/50 transition-all"
              >
                <span className="text-4xl">{feature.icon}</span>
                <h3 className="text-white font-bold text-lg mt-3">{feature.title}</h3>
                <p className="text-gray-400 mt-2 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-white mb-10">Complaint Categories</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {['🛣️ Road Damage', '💧 Water Supply', '⚡ Electricity', '🗑️ Garbage Collection', '💡 Street Light', '🚨 Public Safety'].map((cat, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.1 }}
                className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-full text-gray-300 font-medium hover:border-blue-500/50 cursor-pointer"
              >
                {cat}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-20 border-t border-gray-800 pt-8 text-gray-500 text-sm flex justify-center gap-8"
        >
          <p>© 2024 NivaranX — AI Powered Grievance Management System</p>
          <span onClick={onAbout} className="text-blue-400 cursor-pointer hover:text-blue-300">About</span>
          <span onClick={onContact} className="text-blue-400 cursor-pointer hover:text-blue-300">Contact</span>
        </motion.div>
      </div>
    </div>
  )
}

export default Home