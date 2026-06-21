const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.set('trust proxy', 1)

app.use(express.json())
app.use(cors())
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}))
app.use('/uploads', express.static('uploads'))

const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

const complaintRoutes = require('./routes/complaintRoutes')
app.use('/api/complaints', complaintRoutes)

const adminRoutes = require('./routes/adminRoutes')
app.use('/api/admin', adminRoutes)

const chatRoutes = require('./routes/chatRoutes')
app.use('/api/chat', chatRoutes)

const notificationRoutes = require('./routes/notificationRoutes')
app.use('/api/notifications', notificationRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'NivaranX Backend Running!' })
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected!')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log('DB Error:', err)
  })