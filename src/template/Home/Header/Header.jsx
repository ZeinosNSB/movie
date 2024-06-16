import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
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
    <header className={`fixed z-10 w-full ${isScrolled ? 'bg-slate-600' : 'bg-transparent'}`}>
      <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <a href='#' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Your Company</span>
            <img
              className='h-10'
              src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png'
              alt='CyberSoft'
            />
          </a>
        </div>
        <div className='text-sm lg:flex lg:gap-x-12'>
          <NavLink
            to='/home'
            className={({ isActive }) =>
              `font-semibold leading-8 w-24 text-center ${
                isActive ? 'text-orange-300 border-2 border-transparent rounded-3xl bg-slate-900' : 'text-slate-100'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to='/news'
            className={({ isActive }) =>
              `font-semibold leading-8 w-24 text-center ${
                isActive ? 'text-orange-300 border-2 border-transparent rounded-3xl bg-slate-900' : 'text-slate-100'
              }`
            }
          >
            News
          </NavLink>
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              `font-semibold leading-8 w-24 text-center ${
                isActive ? 'text-orange-300 border-2 border-transparent rounded-3xl bg-slate-900' : 'text-slate-100'
              }`
            }
          >
            Contact
          </NavLink>
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <NavLink to='/signin' className='font-semibold leading-6 text-gray-900'>
            <Button variant='outline'>Sign In</Button>
          </NavLink>
          <NavLink to='/signup' className='pl-2 font-semibold leading-6 text-gray-900'>
            <Button>Sign Up</Button>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header
