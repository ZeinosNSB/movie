import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Dashboard from '@/page/Admin/Dashboard'
import Films from '@/page/Admin/Films'
import Showtime from '@/page/Admin/Showtime'
import User from '@/page/Admin/User'
import Checkout from '@/page/Checkout'
import Contact from '@/page/Contact'
import Detail from '@/page/Detail'
import Home from '@/page/Home'
import News from '@/page/News'
import Profile from '@/page/Profile'
import SignIn from '@/page/SignIn'
import SignUp from '@/page/SignUp'
import AccountTemplate from '@/template/Account'
import AdminTemplate from '@/template/Admin'
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
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route element={<CheckoutTemplate />}>
          <Route path='checkout/:id' element={<Checkout />} />
        </Route>
        <Route element={<AccountTemplate />}>
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
        <Route path='admin' element={<AdminTemplate />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='users' element={<User />} />
          <Route path='films' element={<Films />} />
          <Route path='showtime' element={<Showtime />} />
        </Route>
        <Route path='*' element={<h1>Ronaldo</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
