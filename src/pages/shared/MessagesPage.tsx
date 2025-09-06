import { motion } from 'framer-motion'
import { IoChatboxOutline } from 'react-icons/io5'

export default function MessagesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center">
          <IoChatboxOutline className="w-12 h-12 text-pink-600" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with teachers and students</p>
      </div>
    </motion.div>
  )
}
