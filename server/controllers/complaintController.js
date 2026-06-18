const Complaint = require('../models/Complaint')
const leoProfanity = require('leo-profanity')
const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const createComplaint = async (req, res) => {
  try {
    const { title, description, category, location } = req.body

    // Image mandatory check
    if (!req.file) {
      return res.status(400).json({ message: 'Photo upload karna zaroori hai!' })
    }

    // Minimum length check
    if (title.length < 10) {
      return res.status(400).json({ message: 'Title kam se kam 10 characters ka hona chahiye!' })
    }

    if (description.length < 20) {
      return res.status(400).json({ message: 'Description kam se kam 20 characters ka hona chahiye!' })
    }

    // Profanity check
    if (leoProfanity.check(title) || leoProfanity.check(description)) {
      return res.status(400).json({ message: 'Abusive language use mat karo!' })
    }

    // AI Fake Detection
    const aiCheck = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a complaint validator. Analyze if the complaint is genuine or fake/spam.
          Reply with ONLY "GENUINE" or "FAKE" — nothing else.
          Genuine complaints are about real public issues like road damage, water supply, electricity, garbage, etc.
          Fake complaints are random text, test messages, gibberish, or irrelevant content.`
        },
        {
          role: 'user',
          content: `Title: ${title}\nDescription: ${description}`
        }
      ],
      model: 'llama-3.1-8b-instant',
    })

    const aiResult = aiCheck.choices[0].message.content.trim()
    console.log('AI Check Result:', aiResult)

    if (aiResult === 'FAKE') {
      return res.status(400).json({ message: 'Yeh complaint genuine nahi lagti! Sahi complaint submit karo.' })
    }

    const complaint = await Complaint.create({
      user: req.user.id,
      title,
      description,
      category,
      location,
      image: req.file ? req.file.filename : null
    })

    res.status(201).json({
      message: 'Complaint submitted successfully!',
      complaint
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id })
      .sort({ createdAt: -1 })

    res.json({ complaints })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { createComplaint, getMyComplaints }