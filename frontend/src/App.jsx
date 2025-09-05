import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Activation from './pages/Activation'
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './toast-custom.css'   // custom css import ki
import axios from 'axios'
import { server2 } from './server'

const App = () => {
  useEffect(() => {
    // First, let's test if the server is running
    console.log("🔍 Testing server connection...");
    console.log("🌐 Server URL:", server2);
    
    // Test basic server connection first
    axios.get(`${server2}/`)
      .then((res) => {
        console.log("✅ Server is running:", res.data);
        
        // Test routes step by step
        console.log("🔍 Testing user test endpoint...");
        return axios.get(`${server2}/api/v2/user/test`);
      })
      .then((res) => {
        console.log("✅ Test endpoint success:", res.data);
        
        console.log("🔍 Testing simple getuser endpoint...");
        return axios.get(`${server2}/api/v2/user/getuser-simple`);
      })
      .then((res) => {
        console.log("✅ Simple getuser success:", res.data);
        
        console.log("🔍 Testing protected getuser endpoint...");
        return axios.get(`${server2}/api/v2/user/getuser`, { withCredentials: true });
      })
      .then((res) => {
        console.log("✅ User endpoint success:", res.data);
        toast.success("Welcome back!");
      })
      .catch((err) => {
        console.log("❌ Error details:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          url: err.config?.url
        });
        
        // Don't show error toast for unauthenticated users on initial load
        if (err.response?.status !== 401) {
          toast.error(err.response?.data?.message || "Something went wrong");
        }
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