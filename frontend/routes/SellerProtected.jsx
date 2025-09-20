
// frontend/src/SellerProtected.jsx
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'


const SellerProtected = ({children }) => {
  // Show loading while checking seller authentication
    const { isLoading, isSeller } = useSelector((state) => state.seller)
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isSeller) {
    return <Navigate to="/shop-login" replace />
  }
  
  return children
}

export default SellerProtected