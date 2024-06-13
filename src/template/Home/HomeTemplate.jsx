import { Outlet } from 'react-router-dom'

import Footer from '@/template/Home/Footer'
import Header from '@/template/Home/Header'

function HomeTemplate() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default HomeTemplate
