import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '@/template/Home/Footer'
import Header from '@/template/Home/Header'

function HomeTemplate() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default HomeTemplate
