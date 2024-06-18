import { Outlet } from 'react-router-dom'

import banner from '@/assets/img/banner.jpg'

function AccountTemplate() {
  return (
    <div className='w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
      <Outlet />
      <div
        className='hidden bg-muted lg:block rounded-l-3xl h-full w-full bg-center object-cover dark:brightness-[0.2] dark:grayscale'
        style={{ backgroundImage: `url(${banner})` }}
      ></div>
    </div>
  )
}

export default AccountTemplate
