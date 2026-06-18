const express = require('express')
const router = express.Router()
const { getAllComplaints, updateStatus, getAllUsers, getAnalytics } = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.get('/complaints', authMiddleware, adminMiddleware, getAllComplaints)
router.put('/complaints/:id/status', authMiddleware, adminMiddleware, updateStatus)
router.get('/users', authMiddleware, adminMiddleware, getAllUsers)
router.get('/analytics', authMiddleware, adminMiddleware, getAnalytics)

module.exports = router