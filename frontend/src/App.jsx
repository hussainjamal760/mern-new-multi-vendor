import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Activation from './pages/Activation'
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './toast-custom.css'   // custom css import ki
import Store from './redux/store'
import { loadUser } from './redux/actions/user'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import BestSellingPage from './pages/BestSellingPage'
import EventsPage from './pages/EventsPage'
import FAQPage from './pages/FAQPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './ProtectedRoute'
import { useSelector } from 'react-redux'

const App = () => {
  const {loading , isAuthenticated} = useSelector((state) => state.user)
  useEffect(() => {
   Store.dispatch(loadUser())
  }, [])
  

  return (
    <>
     <Routes>
  <Route path='/' element={<HomePage/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/sign-up' element={<SignUp/>}/>
  <Route path='/products' element={<ProductsPage/>}/>
  <Route path='/product/:name' element={<ProductDetailsPage/>}/>
  <Route path='/best-selling' element={<BestSellingPage/>}/>
  <Route path='/events' element={<EventsPage/>}/>
  <Route path='/faq' element={<FAQPage/>}/>
  <Route path='/activation/:activation_token' element={<Activation/>}/>

  <Route
    path='/profile'
    element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <ProfilePage/>
      </ProtectedRoute>
    }
  />
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