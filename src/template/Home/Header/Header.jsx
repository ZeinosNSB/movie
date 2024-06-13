import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'

function Header() {
  return (
    <header className='sticky bg-opacity-40 bg-slate-600'>
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
              `font-semibold leading-10 ${
                isActive
                  ? 'text-slate-700 border-b-2 border-transparent border-slate-600'
                  : 'text-slate-100 hover:text-slate-600 '
              } `
            }
          >
            Home
          </NavLink>
          <NavLink
            to='/news'
            className={({ isActive }) =>
              `font-semibold leading-10 ${
                isActive
                  ? 'text-slate-700 border-b-2 border-transparent border-slate-600'
                  : 'text-slate-100 hover:text-slate-600 '
              } `
            }
          >
            News
          </NavLink>
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              `font-semibold leading-10 ${
                isActive
                  ? 'text-slate-700 border-b-2 border-transparent border-slate-600'
                  : 'text-slate-100 hover:text-slate-600 '
              } `
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
