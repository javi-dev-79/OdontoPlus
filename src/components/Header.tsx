import { useState } from 'react'
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
          <div className='sign-in-icon'>
            <i className='fas fa-sign-in-alt'></i>
          </div>
          <div className='hamburger-menu' onClick={toggleMenu}>
            {isOpen ? (
              <i className='far fa-rectangle-xmark'></i>
            ) : (
              <span>☰</span>
            )}
          </div>
        </div>
        <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
          <a href='#'>Inicio</a>
          <a href='#'>Servicios</a>
          <a href='#'>Sobre Nosotros</a>
          <a href='#'>Contacto</a>
          <a href='#'>Citas en Línea</a>
        </div>
      </div>
    </header>
  )
}

export default Header
