import cybersoft from '@/assets/logo/cybersoft.png'

function Header() {
  return (
    <header className='sticky bg-opacity-0 bg-white'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <a href='#' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Your Company</span>
            <img className='h-20' src={cybersoft} alt='CyberSoft' />
          </a>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          <a href='#' className='font-semibold leading-6 text-gray-900'>
            Product
          </a>
          <a href='#' className='font-semibold leading-6 text-gray-900'>
            Features
          </a>
          <a href='#' className='font-semibold leading-6 text-gray-900'>
            Marketplace
          </a>
          <a href='#' className='font-semibold leading-6 text-gray-900'>
            Company
          </a>
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <a href='#' className='font-semibold leading-6 text-gray-900'>
            Log in <span aria-hidden='true'>&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header
