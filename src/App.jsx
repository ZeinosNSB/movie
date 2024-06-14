import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Contact from '@/page/Contact'
import Home from '@/page/Home'
import News from '@/page/News'
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
