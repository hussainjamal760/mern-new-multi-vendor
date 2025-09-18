// frontend/src/App.jsx
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Activation from './pages/Activation'
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './toast-custom.css'
import Store from './redux/store'
import { loadSeller, loadUser } from './redux/actions/user'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import BestSellingPage from './pages/BestSellingPage'
import EventsPage from './pages/EventsPage'
import FAQPage from './pages/FAQPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './ProtectedRoute'
import { useSelector } from 'react-redux'
import CheckoutPage from './pages/CheckoutPage'
import ShopCreatePage from './pages/ShopCreatePage'
import SellerActivationPage from './pages/SellerActivationPage'
import ShopLoginPage from './pages/ShopLoginPage'
import SellerProtected from './SellerProtected'
import SellerHomePage from './pages/SellerHomePage'

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user)
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller)
  
  useEffect(() => {
    Store.dispatch(loadUser())
    Store.dispatch(loadSeller())
  }, [])

  // Show loading while checking authentication
  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        
        {/* Public routes - redirect if already authenticated */}
        <Route 
          path='/login' 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
        />
        <Route 
          path='/sign-up' 
          element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />} 
        />
        <Route 
          path='/login-shop' 
          element={isSeller ? <Navigate to={`/shop/${seller?._id}`} replace /> : <ShopLoginPage />} 
        />
        <Route 
          path='/shop-create' 
          element={isSeller ? <Navigate to={`/shop/${seller?._id}`} replace /> : <ShopCreatePage />} 
        />
        
        {/* Public routes */}
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:name' element={<ProductDetailsPage />} />
        <Route path='/best-selling' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/faq' element={<FAQPage />} />
        <Route path='/activation/:activation_token' element={<Activation />} />
        <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />

        {/* Protected user routes */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path='/checkout'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        {/* Protected seller routes */}
        <Route
          path='/shop/:id'
          element={
            <SellerProtected isSeller={isSeller} isLoading={isLoading}>
              <SellerHomePage />
            </SellerProtected>
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
        toastClassName="custom-toast"
      />
    </>
  )
}

export default App