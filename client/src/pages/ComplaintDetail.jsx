import { motion } from 'framer-motion'

const ComplaintDetail = ({ complaint, onBack }) => {
  const statusColor = (status) => {
    if (status === 'resolved') return 'bg-green-500/20 text-green-400 border border-green-500/30'
    if (status === 'in_progress') return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
    if (status === 'under_review') return 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    if (status === 'rejected') return 'bg-red-500/20 text-red-400 border border-red-500/30'
    return 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
  }

  const priorityColor = (priority) => {
    if (priority === 'high') return 'text-red-400'
    if (priority === 'medium') return 'text-yellow-400'
    if (priority === 'emergency') return 'text-red-600'
    return 'text-green-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-all"
      >
        ← Back to Complaints
      </motion.button>

      <h2 className="text-2xl font-bold text-white mb-6">Complaint Detail 📋</h2>

      <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl mb-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white flex-1">{complaint.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ml-4 ${statusColor(complaint.status)}`}>
            {complaint.status}
          </span>
        </div>

        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-1">Description</p>
          <p className="text-white">{complaint.description}</p>
        </div>

        {complaint.image && (
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-2">Evidence Photo</p>
            <img
              src={complaint.image}
              alt="complaint evidence"
              className="rounded-xl w-full max-h-64 object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">📍 Location</p>
            <p className="text-white font-medium mt-1">{complaint.location}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">🏷️ Category</p>
            <p className="text-white font-medium mt-1">{complaint.category}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">⚡ Priority</p>
            <p className={`font-medium mt-1 ${priorityColor(complaint.priority)}`}>
              {complaint.priority}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">📅 Submitted</p>
            <p className="text-white font-medium mt-1">
              {new Date(complaint.createdAt).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-400 text-sm mb-3">Status Timeline</p>
          <div className="flex items-center gap-2">
            {['submitted', 'under_review', 'in_progress', 'resolved'].map((s, index) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  ['submitted', 'under_review', 'in_progress', 'resolved'].indexOf(complaint.status) >= index
                    ? 'bg-blue-500'
                    : 'bg-gray-700'
                }`} />
                <span className="text-gray-400 text-xs">{s.replace('_', ' ')}</span>
                {index < 3 && <div className="w-8 h-0.5 bg-gray-700" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ComplaintDetail