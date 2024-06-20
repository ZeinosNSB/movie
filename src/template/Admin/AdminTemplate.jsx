import { CircleArrowRight, Clock, Film, Package2, PanelLeft, Search, Settings, Users2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

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
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { TOKEN, USER_LOGIN } from '@/utils/config'

const tabs = [
  { name: 'Users', path: 'users', icon: Users2 },
  { name: 'Films', path: 'films', icon: Film },
  { name: 'Showtime', path: 'showtime', icon: Clock }
]

function AdminTemplate() {
  const user = useMemo(() => JSON.parse(localStorage.getItem(USER_LOGIN)), [])
  const [selected, setSelected] = useState(tabs[0].path)

  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
        <nav className='flex flex-col items-center gap-4 px-2 py-4'>
          <Link
            to='/home'
            className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
          >
            <Package2 className='h-4 w-4 transition-all group-hover:scale-110 ' />
            <span className='sr-only'>CyberSoft</span>
          </Link>
          {tabs.map(tab => (
            <TooltipProvider key={tab.path}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    to={`/admin/${tab.path}`}
                    className='flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8'
                    onClick={() => setSelected(tab.path)}
                  >
                    <tab.icon className='h-5 w-5' />
                    <span className='sr-only'>{tab.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right'>{tab}</TooltipContent>
              </Tooltip>
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
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
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
                    className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground ${
                      selected === tab.path ? 'text-foreground' : ''
                    }`}
                    onClick={() => setSelected(tab.path)}
                  >
                    <tab.icon className='h-5 w-5' />
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
                  <Link to='#'>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to='#'>Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='relative ml-auto flex-1 md:grow-0'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search...'
              className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]'
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer outline-none'>
              <Avatar>
                <AvatarFallback>{user?.hoTen.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='mt-2 cursor-pointer'>
              <DropdownMenuLabel>Hello, {user?.hoTen}</DropdownMenuLabel>
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
        </header>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminTemplate
