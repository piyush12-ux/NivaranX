const Complaint = require('../models/Complaint')
const User = require('../models/user')
const Notification = require('../models/Notification')

// Get all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })

    res.json({ complaints })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Update complaint status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    // Notification create karo
    await Notification.create({
      user: complaint.user,
      message: `Your complaint "${complaint.title}" status updated to: ${status}`,
      complaintId: complaint._id
    })

    res.json({ message: 'Status updated!', complaint })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json({ users })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get analytics
const getAnalytics = async (req, res) => {
  try {
    const total = await Complaint.countDocuments()
    const resolved = await Complaint.countDocuments({ status: 'resolved' })
    const pending = await Complaint.countDocuments({ status: { $ne: 'resolved' } })
    const users = await User.countDocuments()

    res.json({ total, resolved, pending, users })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getAllComplaints, updateStatus, getAllUsers, getAnalytics }