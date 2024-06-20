import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { CircleArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { TOKEN, USER_LOGIN } from '@/utils/config'

const tabs = ['Home', 'News', 'Contact']

const Header = () => {
  const [hidden, setHidden] = useState(false)

  const navigate = useNavigate()

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latestScrollY => {
    const previousScrollY = scrollY.getPrevious()

    if (latestScrollY > previousScrollY && latestScrollY > 200) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  const user = useMemo(() => JSON.parse(localStorage.getItem(USER_LOGIN)), [])

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' }
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={`sticky top-0 z-30 flex h-14 items-center gap-4 px-4 sm:h-auto sm:border-0 sm:px-6 w-full bg-gray-800 transition-colors duration-200 ease-in`}
    >
      <nav className='mx-auto w-full flex max-w-7xl items-center justify-between p-4'>
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
          {!user && (
            <>
              <NavLink to='/signin' className='font-semibold leading-6 text-gray-900'>
                <Button
                  variant='outline'
                  onClick={() => {
                    navigate('/signin')
                  }}
                >
                  Sign In
                </Button>
              </NavLink>
              <NavLink to='/signup' className='pl-2 font-semibold leading-6 text-gray-900'>
                <Button
                  className='bg-orange-500 hover:bg-orange-600'
                  onClick={() => {
                    navigate('/signup')
                  }}
                >
                  Sign Up
                </Button>
              </NavLink>
            </>
          )}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger className='cursor-pointer outline-none'>
                <Avatar>
                  <AvatarFallback>{user.hoTen.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='mt-2 cursor-pointer'>
                <DropdownMenuLabel>Hello, {user.hoTen}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer'>
                  <NavLink to='/profile' className='flex items-center gap-2'>
                    <span>Profile</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='cursor-pointer text-red-800'
                  onClick={() => {
                    localStorage.removeItem(USER_LOGIN)
                    localStorage.removeItem(TOKEN)
                    navigate('/')
                    window.location.reload()
                  }}
                >
                  Logout <CircleArrowRight size={20} className='ml-2' />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </motion.header>
  )
}

export default Header
