const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts! Try after 1 hour.' }
})

const complaintLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 5,
  message: { message: 'Maximum 5 complaints per day allowed!' }
})

module.exports = { loginLimiter, complaintLimiter }