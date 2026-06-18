const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered!' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'Registered successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Email not registered!' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password!' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone },
      { new: true }
    ).select('-password')

    res.json({ message: 'Profile updated!', user })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Email not registered!' })
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ 
      message: 'Password reset token generated!',
      resetToken
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword })

    res.json({ message: 'Password reset successfully!' })

  } catch (error) {
    res.status(500).json({ message: 'Invalid or expired token!' })
  }
}

module.exports = { register, login, updateProfile, forgotPassword, resetPassword }