import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/UseAuth'
import '../styles/modal-auth.css'


interface PrivateRouteProps {
  adminOnly?: boolean
}

const PrivateRoute = ({ adminOnly = false }: PrivateRouteProps) => {
  const { currentUser, userData, loading } = useAuth()
  const navigate = useNavigate()

  console.log('🔍 PrivateRoute - Estado de autenticación:')
  console.log(
    '   🔹 Usuario autenticado:',
    currentUser ? currentUser.email : 'No autenticado'
  )
  console.log('   🔹 Datos del usuario en Firestore:', userData)
  console.log('   🔹 Cargando:', loading)

  // if (loading || !userData) {
  //   return <p>Cargando...</p>
  // }

  if (!currentUser) {
    return (
      <div className='restricted-access-modal__overlay'>
        <div className='restricted-access-modal'>
          <h2 className='restricted-access-modal__title'>Acceso Restringido</h2>
          <p className='restricted-access-modal__text'>
            Debes estar registrado e iniciar sesión para acceder a esta sección.
          </p>
          <button
            className='restricted-access-modal__button'
            onClick={() => navigate('/login')}
          >
            Ir a Login
          </button>
        </div>
      </div>
    )
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
  return <Outlet />
}

export default PrivateRoute
