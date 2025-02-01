// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'
// import { useAuth } from '../contexts/UseAuth'

// interface PrivateRouteProps {
//   adminOnly?: boolean
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ adminOnly = false }) => {
//   const { currentUser, isAdmin, loading } = useAuth()

//   if (loading) {
//     return <div>Cargando...</div>
//   }

//   if (!currentUser) {
//     return <Navigate to='/login' />
//   }

//   if (adminOnly && !isAdmin) {
//     return <Navigate to='/' />
//   }

//   return <Outlet />
// }

// export default PrivateRoute

// ****************************************************************************************

// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'
// import { useAuth } from '../contexts/UseAuth'

// interface PrivateRouteProps {
//   adminOnly?: boolean // Propiedad para indicar si la ruta es solo para administradores
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ adminOnly = false }) => {
//   const { currentUser, userData, loading } = useAuth()

//   if (loading) {
//     return <p>Cargando...</p> // Muestra un mensaje de carga mientras se verifica el estado de autenticación
//   }

//   if (!currentUser) {
//     return <Navigate to='/login' /> // Redirige a la página de inicio de sesión si el usuario no está autenticado
//   }

//   if (adminOnly && userData?.role !== 'admin') {
//     return <Navigate to='/' /> // Redirige a la página de inicio si el usuario no es administrador
//   }

//   return <Outlet /> // Renderiza la ruta protegida
// }

// export default PrivateRoute

// ****************************************************************************************

import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/UseAuth'

interface PrivateRouteProps {
  adminOnly?: boolean // Propiedad para indicar si la ruta es solo para administradores
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ adminOnly = false }) => {
  const { currentUser, userData, loading } = useAuth()

  if (loading) {
    return <p>Cargando...</p> // Muestra un mensaje de carga mientras se verifica el estado de autenticación
  }

  if (!currentUser) {
    return <Navigate to='/login' /> // Redirige a la página de inicio de sesión si el usuario no está autenticado
  }

  if (adminOnly && userData?.role !== 'admin') {
    return <Navigate to='/' /> // Redirige a la página de inicio si el usuario no es administrador
  }

  return <Outlet /> // Renderiza la ruta protegida
}

export default PrivateRoute
