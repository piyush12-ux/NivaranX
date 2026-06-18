import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as api from '../services/api'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const res = await api.getNotifications()
      setNotifications(res.data.notifications)
      setUnread(res.data.notifications.filter(n => !n.isRead).length)
    } catch (err) {
      console.log('Error fetching notifications')
    }
  }

  const handleOpen = async () => {
    setIsOpen(!isOpen)
    if (!isOpen && unread > 0) {
      await api.markNotificationsRead()
      setUnread(0)
    }
  }

  return (
    <div className="relative">
      {/* Bell Icon */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpen}
        className="relative p-2 text-gray-400 hover:text-white"
      >
        🔔
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-10 w-80 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl z-50"
          >
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-white font-bold">Notifications 🔔</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No notifications yet!</p>
              ) : (
                notifications.map((n, index) => (
                  <motion.div
                    key={n._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 border-b border-gray-800 ${!n.isRead ? 'bg-blue-500/5' : ''}`}
                  >
                    <p className="text-white text-sm">{n.message}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(n.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Notifications