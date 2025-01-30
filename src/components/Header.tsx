import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Header/Logo'
import Navigation from './Header/Navigation'
import UserActions from './Header/UserActions'
import '../styles/Header.css'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className='navbar'>
      <div className='navbar-content'>
        <Logo />
        <Navigation />
        <div className='desktop-actions'>
          <UserActions />
        </div>
        <div className='mobile-actions'>
          <div className='sign-in-icon' aria-label='Iniciar sesión'>
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
        <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
          <Link to='/'>Inicio</Link>
          <Link to='/services'>Servicios</Link>
          <Link to='/about-us'>Sobre Nosotros</Link>
          <Link to='/contact'>Contacto</Link>
          <Link to='/online-dating'>Citas en Línea</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
