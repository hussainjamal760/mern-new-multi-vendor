
// frontend/src/SellerProtected.jsx
import { Navigate } from "react-router-dom"

const SellerProtected = ({ isSeller, isLoading, children }) => {
  // Show loading while checking seller authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isSeller) {
    return <Navigate to="/" replace />
  }
  
  return children
}

export default SellerProtected