import React from 'react'

const FooterNavigationLinks: React.FC = () => {
  return (
    <div className='footer-navigation-links'>
      <a href='/servicios' className='footer-link'>
        SERVICIOS
      </a>
      <a href='/sobre-nosotros' className='footer-link'>
        SOBRE NOSOTROS
      </a>
      <a href='/contacto' className='footer-link'>
        CONTACTO
      </a>
    </div>
  )
}

export default FooterNavigationLinks
