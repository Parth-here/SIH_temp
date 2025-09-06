import { motion } from 'framer-motion'
import { IoClipboardOutline } from 'react-icons/io5'

export default function AttendancePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
          <IoClipboardOutline className="w-12 h-12 text-orange-600" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-2">Attendance</h1>
        <p className="text-gray-600">Track and manage class attendance</p>
      </div>
    </motion.div>
  )
}
