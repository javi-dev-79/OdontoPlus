import '../../styles/Header.css'
import { Link } from 'react-router-dom'

const Navigation = () => {
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
            aria-label='Ir a la página de inicio'
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
      </ul>
    </nav>
  )
}

export default Navigation
