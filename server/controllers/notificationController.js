const Notification = require('../models/Notification')

// Get all notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20)

    res.json({ notifications })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Mark as read
const markAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id },
      { isRead: true }
    )

    res.json({ message: 'All notifications marked as read!' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getNotifications, markAsRead }