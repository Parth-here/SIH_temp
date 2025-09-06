import { motion } from 'framer-motion'
import { IoCalendarOutline } from 'react-icons/io5'

export default function SchedulePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
          <IoCalendarOutline className="w-12 h-12 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">Schedule</h1>
        <p className="text-gray-600">View your academic schedule and timetable</p>
      </div>
    </motion.div>
  )
}
