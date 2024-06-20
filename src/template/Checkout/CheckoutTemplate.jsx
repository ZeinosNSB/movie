import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { USER_LOGIN } from '@/utils/config'

function CheckoutTemplate() {
  const navigate = useNavigate()

  !localStorage.getItem(USER_LOGIN) && navigate('/signin')

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return <Outlet />
}

export default CheckoutTemplate
