import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import Loader from './admin/Loader'
const ProtectedRoutes = ({children, requiredRole}) => {
    
    const { userData, loading } = useAuth()
    if (loading) {
    return <Loader /> 
  }
    if(!userData){
      console.log(userData + "user data is not ready")
        return <Navigate to="/login" />;
    }

    if (requiredRole && userData?.role !== requiredRole) {
    return <Navigate to="/" />;
    }
  return children;
}
export default ProtectedRoutes;