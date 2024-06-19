import { motion } from 'framer-motion'

function Loading() {
  return (
    <motion.div className='fixed bg-slate-400 opacity-50 h-screen top-0 left-0 w-full flex justify-center items-center z-10'>
      <div className='p-4 rounded-md'>
        <div className='flex justify-center'>
          <>
            <motion.span
              className='w-8 h-4 my-12 mx-1 bg-orange-600 rounded-full'
              animate={{
                y: [0, -20, 0],
                opacity: [1, 0],
                transition: { duration: 1, repeat: Infinity }
              }}
            />
            <motion.span
              className='w-8 h-4 my-12 mx-1 bg-orange-600 rounded-full'
              animate={{
                y: [0, -20, 0],
                opacity: [1, 0],
                transition: { duration: 1, repeat: Infinity, delay: 0.2 }
              }}
            />
            <motion.span
              className='w-8 h-4 my-12 mx-1 bg-orange-600 rounded-full'
              animate={{
                y: [0, -20, 0],
                opacity: [1, 0],
                transition: { duration: 1, repeat: Infinity, delay: 0.4 }
              }}
            />
            <motion.span
              className='w-8 h-4 my-12 mx-1 bg-orange-600 rounded-full'
              animate={{
                y: [0, -20, 0],
                opacity: [1, 0],
                transition: { duration: 1, repeat: Infinity, delay: 0.6 }
              }}
            />
          </>
        </div>
      </div>
    </motion.div>
  )
}

export default Loading
