// const FooterNavigationLinks= () => {
//   return (
//     <div className='footer-navigation-links'>
//       <a href='/servicios' className='footer-link'>
//         SERVICIOS
//       </a>
//       <a href='/sobre-nosotros' className='footer-link'>
//         SOBRE NOSOTROS
//       </a>
//       <a href='/contacto' className='footer-link'>
//         CONTACTO
//       </a>
//     </div>
//   )
// }

// export default FooterNavigationLinks


import { Link } from 'react-router-dom'

const FooterNavigationLinks = () => {
  return (
    <div className='footer-navigation-links'>
      <Link to='/services' className='footer-link'>
        SERVICIOS
      </Link>
      <Link to='/about-us' className='footer-link'>
        SOBRE NOSOTROS
      </Link>
      <Link to='/contact' className='footer-link'>
        CONTACTO
      </Link>
    </div>
  )
}

export default FooterNavigationLinks
