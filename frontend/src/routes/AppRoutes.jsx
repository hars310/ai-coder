import React from 'react' 
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import RegisterUser from '../pages/Register'
import LoginUser from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<LoginUser/>} />
            <Route path='/register' element={<RegisterUser/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>    
    </BrowserRouter>
  )
}

export default AppRoutes