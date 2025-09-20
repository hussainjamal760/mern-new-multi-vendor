// frontend/src/ProtectedRoute.jsx
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children }) => {
   const { loading, isAuthenticated } = useSelector((state) => state.user)
  
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
