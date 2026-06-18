const express = require('express')
const router = express.Router()
const { register, login, updateProfile, forgotPassword, resetPassword } = require('../controllers/authController')
const { loginLimiter } = require('../middleware/rateLimitMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', register)
router.post('/login', loginLimiter, login)
router.put('/profile', authMiddleware, updateProfile)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

module.exports = router