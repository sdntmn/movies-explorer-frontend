import { React } from "react"
import { useLocation, Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
