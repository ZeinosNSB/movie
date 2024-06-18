import { useNavigate } from 'react-router-dom'

import { USER_LOGIN } from '@/utils/config'

function CheckoutTemplate() {
  const navigate = useNavigate()

  !localStorage.getItem(USER_LOGIN) && navigate('/signin')

  return <div></div>
}

export default CheckoutTemplate
