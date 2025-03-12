import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <Toaster/>
    <AppRoutes />
    </>
  )
}

export default App
