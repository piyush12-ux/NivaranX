import { motion } from 'framer-motion'

const About = ({ onBack }) => {
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
            About{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              NivaranX
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            An AI-powered grievance management platform built to bridge the gap between citizens and government departments.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 border border-gray-800 p-8 rounded-2xl mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">🎯 Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            NivaranX aims to make grievance reporting simple, transparent, and effective. We believe every citizen deserves to be heard and every complaint deserves a resolution. Our AI-powered platform ensures complaints reach the right department instantly.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 border border-gray-800 p-8 rounded-2xl mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">🚀 What We Offer</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🤖', text: 'AI-powered complaint categorization' },
              { icon: '📊', text: 'Real-time complaint tracking' },
              { icon: '🔒', text: 'Secure JWT authentication' },
              { icon: '📷', text: 'Photo evidence upload' },
              { icon: '⚡', text: 'Fast department assignment' },
              { icon: '💬', text: '24/7 AI chatbot support' },
              { icon: '🛡️', text: 'Anti-spam & fake detection' },
              { icon: '📈', text: 'Analytics dashboard' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-800 p-3 rounded-xl">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-gray-300 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 border border-gray-800 p-8 rounded-2xl mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">🛠️ Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Groq AI', 'Tailwind CSS', 'Framer Motion'].map((tech, index) => (
              <span key={index} className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-bold border border-blue-500/30">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Developer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900 border border-gray-800 p-8 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4">👨‍💻 Developer</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-2xl font-bold">
              P
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">Piyush Yadav</h3>
              <p className="text-gray-400">BCA Student — Full Stack Developer</p>
              <p className="text-gray-500 text-sm mt-1">Built with ❤️ using React, Node.js & AI</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default About