import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'

const tabs = ['Home', 'News', 'Contact']

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed z-10 w-full ${isScrolled ? 'bg-gray-800' : 'bg-transparent'} transition-colors duration-200 ease-in`}
    >
      <nav className='mx-auto w-full flex max-w-7xl items-center justify-between p-6 lg:px-8'>
        <div className='flex lg:flex-1'>
          <NavLink to='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Your Company</span>
            <img
              className='h-10'
              src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png'
              alt='CyberSoft'
            />
          </NavLink>
        </div>
        <div className='text-sm lg:flex lg:gap-x-12'>
          {tabs.map(tab => (
            <NavLink
              to={tab.toLowerCase()}
              key={tab}
              className={({ isActive }) =>
                `${
                  !isActive && 'hover:text-slate-200 hover:bg-slate-700'
                } text-slate-100 font-semibold text-center leading-8 w-24 text-sm transition-colors rounded-3xl relative py-0.5`
              }
            >
              {({ isActive }) => (
                <>
                  <div className='relative z-10'>{tab}</div>
                  {isActive && (
                    <motion.div
                      layoutId='pill-tab'
                      transition={{ type: 'spring', duration: 0.5 }}
                      className='absolute inset-0 z-0 bg-orange-500 rounded-3xl'
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <NavLink to='/signin' className='font-semibold leading-6 text-gray-900'>
            <Button variant='outline'>Sign In</Button>
          </NavLink>
          <NavLink to='/signup' className='pl-2 font-semibold leading-6 text-gray-900'>
            <Button className='bg-orange-500'>Sign Up</Button>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header
