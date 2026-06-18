const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const chat = async (req, res) => {
  try {
    const { message } = req.body

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are NivaranX AI Assistant for a grievance management system in India. 
          Help citizens with complaints about road damage, water supply, electricity, garbage, street lights, public safety.
          Answer in the same language the user writes in — Hindi or English.
          Keep answers short and helpful.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'llama-3.1-8b-instant',
    })

    const reply = completion.choices[0].message.content
    res.json({ reply })

  } catch (error) {
    console.log('Groq Error:', error.message)
    res.status(500).json({ message: 'AI Error', error: error.message })
  }
}

module.exports = { chat }