import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Activation from './pages/Activation'
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './toast-custom.css'   // custom css import ki
import axios from 'axios'
import { server } from './server'

const App = () => {
  useEffect(() => {
    axios
      .get(`${server}/user/getuser`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  }, []);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/activation/:activation_token' element={<Activation/>}/>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        toastClassName="custom-toast"  // custom class add ki
      />
    </>
  )
}

export default App
