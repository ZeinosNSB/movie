import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Checkout from '@/page/Checkout'
import Contact from '@/page/Contact'
import Detail from '@/page/Detail'
import Home from '@/page/Home'
import News from '@/page/News'
import SignIn from '@/page/SignIn'
import SignUp from '@/page/SignUp'
import AccountTemplate from '@/template/Account'
import CheckoutTemplate from '@/template/Checkout'
import HomeTemplate from '@/template/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeTemplate />}>
          <Route path='/' element={<Navigate to='home' />} />
          <Route path='home' element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='news' element={<News />} />
          <Route path='/detail/:id' element={<Detail />} />
        </Route>
        <Route element={<CheckoutTemplate />}>
          <Route path='checkout/:id' element={<Checkout />} />
        </Route>
        <Route element={<AccountTemplate />}>
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
