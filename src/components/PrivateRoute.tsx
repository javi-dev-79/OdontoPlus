import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/UseAuth'

interface PrivateRouteProps {
  adminOnly?: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ adminOnly = false }) => {
  const { currentUser, isAdmin, loading } = useAuth()

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!currentUser) {
    return <Navigate to='/login' />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to='/' />
  }

  return <Outlet />
}

export default PrivateRoute
