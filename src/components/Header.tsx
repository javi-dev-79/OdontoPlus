// import { useState, useEffect, useRef } from 'react'
// import { Link } from 'react-router-dom'
// import Logo from './Header/Logo'
// import Navigation from './Header/Navigation'
// import UserActions from './Header/UserActions'
// import '../styles/Header.css'

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const dropdownRef = useRef<HTMLDivElement>(null) // Referencia al menú desplegable

//   const toggleMenu = () => {
//     setIsOpen(!isOpen)
//   }

//   // Cerrar el menú al hacer clic fuera de él
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false) // Cierra el menú si el clic fue fuera
//       }
//     }

//     // Agrega el listener al montar el componente
//     document.addEventListener('mousedown', handleClickOutside)

//     // Limpia el listener al desmontar el componente
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
//           <div className='sign-in-icon' aria-label='Iniciar sesión'>
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
//           ref={dropdownRef} // Asigna la referencia al menú desplegable
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
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Header

// ****************************************************************************************

import React, { useState, useRef, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase-config'
import { AuthContext } from '../contexts/AuthContext/Context'
import Logo from './Header/Logo'
import Navigation from './Header/Navigation'
import UserActions from './Header/UserActions'
import '../styles/Header.css'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Consume el contexto
  const { currentUser } = useContext(AuthContext)
  console.log('Header - currentUser:', currentUser) // Depuración

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
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
            onClick={currentUser ? handleLogout : undefined}
          >
            <i className='fas fa-sign-in-alt'></i>
          </div>
          <div
            className='hamburger-menu'
            onClick={toggleMenu}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? (
              <i className='far fa-rectangle-xmark' aria-hidden='true'></i>
            ) : (
              <span aria-hidden='true'>☰</span>
            )}
          </div>
        </div>
        <div
          className={`dropdown-menu ${isOpen ? 'show' : ''}`}
          ref={dropdownRef}
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
            onClick={currentUser ? handleLogout : undefined}
          >
            {currentUser ? 'SALIR' : 'INGRESAR'}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
