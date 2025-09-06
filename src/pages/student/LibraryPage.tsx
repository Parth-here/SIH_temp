import { motion } from 'framer-motion'
import { IoLibraryOutline } from 'react-icons/io5'

export default function LibraryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
          <IoLibraryOutline className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">Library</h1>
        <p className="text-gray-600">Access digital resources and study materials</p>
      </div>
    </motion.div>
  )
}
