import { Link } from 'react-router-dom'

const FooterNavigationLinks = () => {
  return (
    <div className='footer-navigation-links'>
      <Link
        to='/services'
        className='footer-link'
        aria-label='Ir a la página de servicios'
      >
        SERVICIOS
      </Link>
      <Link
        to='/about-us'
        className='footer-link'
        aria-label='Ir a la página sobre nosotros'
      >
        SOBRE NOSOTROS
      </Link>
      <Link
        to='/contact'
        className='footer-link'
        aria-label='Ir a la página de contacto'
      >
        CONTACTO
      </Link>
    </div>
  )
}

export default FooterNavigationLinks
