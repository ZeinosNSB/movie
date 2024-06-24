import { AnimatePresence, motion } from 'framer-motion'
import { CircleArrowRight, Film, Package2, PanelLeft, Settings, Users2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

import logo from '@/assets/logo/cybersoft.png'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useGetUserInfoMutation } from '@/redux/api/user.service'
import { setUserInfo } from '@/redux/reducer/user.slice'
import { TOKEN, USER_LOGIN } from '@/utils/config'

const tabs = [
  { name: 'Users', path: 'users', icon: <Users2 className='h-5 w-5' /> },
  { name: 'Films', path: 'films', icon: <Film className='h-5 w-5' /> }
]

function AdminTemplate() {
  const [selected, setSelected] = useState(tabs[0].path)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const user = useMemo(() => JSON.parse(localStorage.getItem(USER_LOGIN)), [])
  const currentPath = location.pathname.split('/').pop()

  if (user?.maLoaiNguoiDung !== 'QuanTri') {
    navigate('/home')
  }
  const [getUserInfo] = useGetUserInfoMutation()

  useEffect(() => {
    setSelected(currentPath)
  }, [currentPath])

  // Why dont use method GET????????
  const onNavigate = async () => {
    const result = await getUserInfo().unwrap()
    dispatch(setUserInfo(result))
  }

  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <aside className='fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r bg-background sm:flex'>
        <nav className='flex flex-col items-center gap-4 px-2 py-4'>
          <Link
            to='/home'
            className='group flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base mb-4'
          >
            <img src={logo} alt='Logo' className='h-11 transition-all group-hover:scale-110' />
            <span className='sr-only'>CyberSoft</span>
          </Link>
          {tabs.map(tab => (
            <TooltipProvider key={tab.path}>
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      to={`/admin/${tab.path}`}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                        selected === tab.path ? 'bg-primary text-primary-foreground' : ''
                      }`}
                      onClick={() => setSelected(tab.path)}
                    >
                      {tab.icon}
                      <span className='sr-only'>{tab.name}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side='right'>{tab.name}</TooltipContent>
                </Tooltip>
                <AnimatePresence>
                  {selected === tab.path && (
                    <motion.span
                      className='bg-primary text-primary-foreground'
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    ></motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </TooltipProvider>
          ))}
        </nav>
        <nav className='mt-auto flex flex-col items-center gap-4 px-2 py-4'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to='/home'
                  className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                >
                  <Settings className='h-5 w-5' />
                  <span className='sr-only'>Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-20'>
        <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button size='icon' variant='outline' className='sm:hidden'>
                <PanelLeft className='h-5 w-5' />
                <span className='sr-only'>Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='sm:max-w-xs'>
              <nav className='grid gap-6 text-lg font-medium'>
                <Link
                  to='/home'
                  className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                >
                  <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
                  <span className='sr-only'>CyberSoft</span>
                </Link>
                {tabs.map(tab => (
                  <Link
                    to={`/admin/${tab.path}`}
                    key={tab.path}
                    className={`flex items-center gap-4 py-1 px-2.5 text-muted-foreground ${
                      selected === tab.path ? 'text-foreground bg-primary rounded-full text-slate-100' : ''
                    }`}
                    onClick={() => setSelected(tab.path)}
                  >
                    {tab.icon}
                    {tab.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className='hidden md:flex'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to='/admin'>Admin</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{tabs.find(tab => tab.path === selected)?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='relative ml-auto flex-1 md:grow-0' />
          <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer outline-none'>
              <Avatar>
                <AvatarFallback>{user?.hoTen.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='mt-2 cursor-pointer'>
              <DropdownMenuLabel>Hello, {user?.hoTen}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <NavLink to='/profile' onClick={onNavigate}>
                <DropdownMenuItem className='cursor-pointer'>
                  <span>Profile</span>
                </DropdownMenuItem>
              </NavLink>
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
        </header>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminTemplate
