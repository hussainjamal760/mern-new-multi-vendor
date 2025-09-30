// frontend/src/App.jsx - FIXED VERSION
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
import ProtectedRoute from '../routes/ProtectedRoute'
import { useSelector } from 'react-redux'
import CheckoutPage from './pages/CheckoutPage'
import ShopCreatePage from './pages/ShopCreatePage'
import SellerActivationPage from './pages/SellerActivationPage'
import ShopLoginPage from './pages/ShopLoginPage'
import SellerProtected from '../routes/SellerProtected'
import ShopHomePage from './pages/ShopHomePage'
import ShopDashboardPage from './pages/ShopDashboardPage'
import ShopCreateProduct from './pages/ShopCreateProduct'
import ShopAllProducts from './pages/ShopAllProducts'
import ShopCreateEvents from './pages/ShopCreateEvents'
import ShopAllEvents from './pages/ShopAllEvents'
import ShopAllCoupouns from './pages/ShopAllCoupouns'
import ShopPreviewPage from './pages/ShopPreviewPage'

const App = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user)
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller)
  
  useEffect(() => {
    console.log('🚀 App loading - dispatching loadUser and loadSeller');
    Store.dispatch(loadUser())
    Store.dispatch(loadSeller())
  }, [])

  // Show loading spinner while authentication is being checked
  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  console.log('🔍 App render - Auth states:', { 
    isAuthenticated, 
    isSeller, 
    user: user?.name, 
    seller: seller?.name 
  });

  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route path='/' element={<HomePage />} />
        
        {/* Auth Routes - Redirect if already logged in */}
        <Route 
          path='/login' 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
        />
        <Route 
          path='/sign-up' 
          element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />} 
        />
        <Route 
          path='/shop-login' 
          element={isSeller ? <Navigate to={`/shop/${seller._id}`} replace /> : <ShopLoginPage />} 
        />
        <Route 
          path='/shop-create' 
          element={isSeller ? <Navigate to={`/shop/${seller._id}`} replace /> : <ShopCreatePage />} 
        />
        
        {/* Public routes */}
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:name' element={<ProductDetailsPage />} />
        <Route path='/best-selling' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/faq' element={<FAQPage />} />
        <Route path='/activation/:activation_token' element={<Activation />} />
        <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />

        {/* Protected user routes */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path='/checkout'
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        {/* Protected seller routes */}
        <Route
          path='/shop/:id'
          element={
            <SellerProtected>
              <ShopHomePage />
            </SellerProtected>
          }
        />

               <Route
          path='/dashboard'
          element={
            <SellerProtected>
              <ShopDashboardPage />
            </SellerProtected>
          }
        />

               <Route
          path='/dashboard-create-product'
          element={
            <SellerProtected>
              <ShopCreateProduct />
            </SellerProtected>
          }
           />

                 <Route
          path='/dashboard-products'
          element={
            <SellerProtected>
              <ShopAllProducts />
            </SellerProtected>
          }
           />
        {/* Fallback route */}

             <Route
          path='/dashboard-events'
          element={
            <SellerProtected>
              <ShopAllEvents />
            </SellerProtected>
          }
           />

           
             <Route
          path='/dashboard-create-event'
          element={
            <SellerProtected>
              <ShopCreateEvents/>
            </SellerProtected>
          }
           />

              <Route
          path='/dashboard-coupouns'
          element={
            <SellerProtected>
              <ShopAllCoupouns/>
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