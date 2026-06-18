const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'low'
  },
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'in_progress', 'resolved', 'rejected'],
    default: 'submitted'
  },
  location: {
    type: String
  },
  image: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Complaint', complaintSchema)