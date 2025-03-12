import React from 'react' 
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import RegisterUser from '../pages/Register'
const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path='/login' element={<h1>Login</h1>} />
            <Route path='/register' element={<RegisterUser/>} />
            <Route path='/dashboard' element={<h1>Dashboard</h1>} />
        </Routes>    
    </BrowserRouter>
  )
}

export default AppRoutes