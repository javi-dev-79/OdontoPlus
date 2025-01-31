// import React, { useState, useRef, useContext, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { signOut } from 'firebase/auth'
// import { auth } from '../config/firebase-config'
// import { AuthContext } from '../contexts/AuthContext/Context'
// import Logo from './Header/Logo'
// import Navigation from './Header/Navigation'
// import UserActions from './Header/UserActions'
// import '../styles/Header.css'

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const dropdownRef = useRef<HTMLDivElement>(null)

//   // Consume el contexto
//   const { currentUser } = useContext(AuthContext)
//   console.log('Header - currentUser:', currentUser) // Depuración

//   const handleLogout = async () => {
//     try {
//       await signOut(auth)
//     } catch (error) {
//       console.error('Error al cerrar sesión:', error)
//     }
//   }

//   const toggleMenu = () => {
//     setIsOpen(!isOpen)
//   }

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   return (
//     <header className='navbar'>
//       <div className='navbar-content'>
//         <Logo />
//         <Navigation />
//         <div className='desktop-actions'>
//           <UserActions />
//         </div>
//         <div className='mobile-actions'>
//           <div
//             className='sign-in-icon'
//             aria-label={currentUser ? 'Cerrar sesión' : 'Iniciar sesión'}
//             onClick={currentUser ? handleLogout : undefined}
//           >
//             <i className='fas fa-sign-in-alt'></i>
//           </div>
//           <div
//             className='hamburger-menu'
//             onClick={toggleMenu}
//             aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
//           >
//             {isOpen ? (
//               <i className='far fa-rectangle-xmark' aria-hidden='true'></i>
//             ) : (
//               <span aria-hidden='true'>☰</span>
//             )}
//           </div>
//         </div>
//         <div
//           className={`dropdown-menu ${isOpen ? 'show' : ''}`}
//           ref={dropdownRef}
//         >
//           <Link to='/' onClick={toggleMenu}>
//             Inicio
//           </Link>
//           <Link to='/services' onClick={toggleMenu}>
//             Servicios
//           </Link>
//           <Link to='/about-us' onClick={toggleMenu}>
//             Sobre Nosotros
//           </Link>
//           <Link to='/contact' onClick={toggleMenu}>
//             Contacto
//           </Link>
//           <Link to='/online-dating' onClick={toggleMenu}>
//             Citas en Línea
//           </Link>
//           <Link
//             to={currentUser ? '/' : '/login'}
//             onClick={currentUser ? handleLogout : undefined}
//           >
//             {currentUser ? 'SALIR' : 'INGRESAR'}
//           </Link>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Header

// ****************************************************************************************

import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Importa useNavigate
import { AuthContext } from '../contexts/AuthContext/Context' // Asegúrate de que la ruta sea correcta
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase-config' // Asegúrate de que la ruta sea correcta
import Logo from './Header/Logo'
import Navigation from './Header/Navigation'
import UserActions from './Header/UserActions'
import '../styles/Header.css'

const Header: React.FC = () => {
  const { currentUser } = useContext(AuthContext) // Consume el contexto de autenticación
  const [isOpen, setIsOpen] = useState(false) // Estado para controlar el menú desplegable
  const navigate = useNavigate() // Hook para redireccionar

  // Función para alternar el menú desplegable
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Función para manejar el clic en el icono de inicio/cierre de sesión
  const handleMobileLoginLogout = async () => {
    if (currentUser) {
      // Cerrar sesión si el usuario está autenticado
      try {
        await signOut(auth)
        console.log('Usuario cerró sesión correctamente')
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
      }
    } else {
      // Redirigir a la página de inicio de sesión si el usuario no está autenticado
      navigate('/login')
    }
  }

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false) // Cierra el menú si el clic fue fuera
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className='navbar'>
      <div className='navbar-content'>
        <Logo />
        <Navigation />
        <div className='desktop-actions'>
          <UserActions />
        </div>
        <div className='mobile-actions'>
          <div
            className='sign-in-icon'
            aria-label={currentUser ? 'Cerrar sesión' : 'Iniciar sesión'}
            onClick={handleMobileLoginLogout}
          >
            {/* Cambia el icono según el estado de autenticación */}
            {currentUser ? (
              <i className='fas fa-sign-out-alt'></i>
            ) : (
              <i className='fas fa-sign-in-alt'></i>
            )}
          </div>
          <div
            className='hamburger-menu'
            onClick={toggleMenu} // Alterna el menú desplegable
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? (
              <i className='far fa-rectangle-xmark' aria-hidden='true'></i>
            ) : (
              <span aria-hidden='true'>☰</span>
            )}
          </div>
        </div>
        {/* Menú desplegable */}
        <div
          className={`dropdown-menu ${isOpen ? 'show' : ''}`}
          ref={dropdownRef} // Asegúrate de que dropdownRef esté definido
        >
          <Link to='/' onClick={toggleMenu}>
            Inicio
          </Link>
          <Link to='/services' onClick={toggleMenu}>
            Servicios
          </Link>
          <Link to='/about-us' onClick={toggleMenu}>
            Sobre Nosotros
          </Link>
          <Link to='/contact' onClick={toggleMenu}>
            Contacto
          </Link>
          <Link to='/online-dating' onClick={toggleMenu}>
            Citas en Línea
          </Link>
          <Link
            to={currentUser ? '/' : '/login'}
            onClick={currentUser ? handleMobileLoginLogout : undefined}
          >
            {currentUser ? 'SALIR' : 'INGRESAR'}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
