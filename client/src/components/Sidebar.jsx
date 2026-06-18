import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({ activePage, setActivePage }) => {
  const { logoutUser } = useAuth()

  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'complaints', icon: '📋', label: 'My Complaints' },
    { id: 'new', icon: '➕', label: 'New Complaint' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ]

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          NivaranX
        </h1>
        <p className="text-gray-500 text-xs mt-1">AI Grievance System</p>
      </div>

      {/* Menu */}
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

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={logoutUser}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-medium"
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Sidebar