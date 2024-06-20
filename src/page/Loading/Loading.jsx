import { motion } from 'framer-motion'

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 1,
      ease: 'circIn'
    }
  }
}
const Loading = () => {
  return (
    <div className='fixed top-0 left-0 z-30 h-screen w-full grid place-content-center bg-white px-4 py-24'>
      <motion.div
        transition={{
          staggerChildren: 0.25
        }}
        initial='initial'
        animate='animate'
        className='flex gap-1'
      >
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <motion.div key={index} variants={variants} className='h-14 w-2 bg-orange-500' />
          ))}
      </motion.div>
    </div>
  )
}

export default Loading
