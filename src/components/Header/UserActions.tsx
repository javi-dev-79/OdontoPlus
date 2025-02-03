import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'
import '../../styles/Header.css'

const UserActions = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  const handleLogin = () => {
    navigate('/login')
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      console.log('Usuario cerró sesión correctamente')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <div className='user-actions'>
      {currentUser ? (
        <button
          className='sign-in-button'
          aria-label='Cerrar sesión'
          onClick={handleLogout}
        >
          SALIR
        </button>
      ) : (
        <button
          className='sign-in-button'
          aria-label='Iniciar sesión'
          onClick={handleLogin}
        >
          INGRESAR
        </button>
      )}
    </div>
  )
}

export default UserActions
