import { Navigate } from "react-router-dom"

const SellerProtected = ({isSeller , children}) => {
  if(!isSeller){
    return <Navigate to={`/`} replace/>
  }
  
    return children
}

export default SellerProtected