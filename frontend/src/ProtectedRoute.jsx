// frontend/src/ProtectedRoute.jsx
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ isAuthenticated, loading, children }) => {
  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default ProtectedRoute
