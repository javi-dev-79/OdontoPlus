import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase-config'
import { useAuth } from '../contexts/UseAuth'
import Logo from './Header/Logo'
import Navigation from './Header/Navigation'
import UserActions from './Header/UserActions'
import '../styles/Header.css'

const Header: React.FC = () => {
  const { currentUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null) 
  const navigate = useNavigate()


  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      console.log('Usuario cerró sesión correctamente')
      navigate('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
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
        <Logo className='logo-image' />
        <Navigation />
        <div className='desktop-actions'>
          <UserActions />
        </div>
        <div className='mobile-actions'>
          <div
            className='sign-in-icon'
            aria-label={currentUser ? 'Cerrar sesión' : 'Iniciar sesión'}
            onClick={currentUser ? handleLogout : () => navigate('/login')}
          >
            {/* Changes the icon depending on the authentication status */}
            {currentUser ? (
              <i className='fas fa-sign-out-alt'></i>
            ) : (
              <i className='fas fa-sign-in-alt'></i>
            )}
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
        {/* Dropdown menu */}
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