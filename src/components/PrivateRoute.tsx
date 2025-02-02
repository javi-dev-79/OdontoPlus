import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/UseAuth'

interface PrivateRouteProps {
  adminOnly?: boolean // Propiedad para indicar si la ruta es solo para administradores
}

const PrivateRoute = ({ adminOnly = false }: PrivateRouteProps) => {
  const { currentUser, userData, loading } = useAuth()

  console.log('🔍 PrivateRoute - Estado de autenticación:')
  console.log(
    '   🔹 Usuario autenticado:',
    currentUser ? currentUser.email : 'No autenticado'
  )
  console.log('   🔹 Datos del usuario en Firestore:', userData)
  console.log('   🔹 Cargando:', loading)

  if (loading || !userData) {
    return <p>Cargando...</p> // Esperamos hasta que userData esté disponible
  }

  if (!currentUser) {
    console.log('⚠️ Usuario no autenticado, redirigiendo a /login')
    return <Navigate to='/login' />
  }

  if (adminOnly && userData?.role !== 'admin') {
    console.log(
      '⛔ Acceso denegado, usuario sin permisos de admin. Redirigiendo a /'
    )
    return <Navigate to='/' />
  }

  console.log('✅ Acceso permitido, mostrando componente')
  return <Outlet /> // Renderiza la ruta protegida
}

export default PrivateRoute
