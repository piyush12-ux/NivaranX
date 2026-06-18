const express = require('express')
const router = express.Router()
const { createComplaint, getMyComplaints } = require('../controllers/complaintController')
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')
const { complaintLimiter } = require('../middleware/rateLimitMiddleware')

router.post('/create', authMiddleware, complaintLimiter, upload.single('image'), createComplaint)
router.get('/my', authMiddleware, getMyComplaints)

module.exports = router