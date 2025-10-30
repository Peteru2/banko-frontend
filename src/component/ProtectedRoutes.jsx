import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
const ProtectedRoutes = ({children, requiredRole}) => {
    
    const { userData } = useAuth()
    if(!userData){
        return <Navigate to="/login" />;
    }

    if (requiredRole && userData?.role !== requiredRole) {
    return <Navigate to="/" />;
    }
  return children;
}
export default ProtectedRoutes;