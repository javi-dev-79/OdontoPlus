import '../../styles/Header.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/UseAuth'
import { db } from '../../config/firebase-config'
import { doc, getDoc } from 'firebase/firestore'

const Navigation = () => {
  const { currentUser } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminRole = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, 'app-users', currentUser.uid)
          const userSnap = await getDoc(userRef)

          if (userSnap.exists()) {
            const userData = userSnap.data()
            setIsAdmin(userData.role === 'admin')
          }
        } catch (error) {
          console.error('Error obteniendo rol del usuario:', error)
        }
      }
    }

    checkAdminRole()
  }, [currentUser])

  return (
    <nav className='nav-links' role='navigation' aria-label='Menú principal'>
      <ul className='ButtonComponent'>
        <li>
          <Link className='Home' to='/'>
            INICIO
          </Link>
        </li>
        <li>
          <Link
            className='Button'
            to='/services'
            aria-label='Ir a la página de servicios'
          >
            SERVICIOS
          </Link>
        </li>
        <li>
          <Link
            className='Button'
            to='/about-us'
            aria-label='Ir a la página de sobre nosotros'
          >
            SOBRE NOSOTROS
          </Link>
        </li>
        <li>
          <Link
            className='Button'
            to='/contact'
            aria-label='Ir a la página de contacto'
          >
            CONTACTO
          </Link>
        </li>
        <li>
          <Link
            className='Button'
            to='/online-dating'
            aria-label='Ir a la página de citas en línea'
          >
            CITAS EN LÍNEA
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link
              className='Button admin'
              to='/admin-panel'
              aria-label='Ir al panel de administración'
            >
              ADMIN
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
