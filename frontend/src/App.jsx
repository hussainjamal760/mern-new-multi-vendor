import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Activation from './pages/Activation'

const App = () => {
  return (
    <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/activation/:activation_token' element={<Activation/>}/>
    </Routes>
  )
}

export default App