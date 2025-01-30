// import logo from '../../assets/images/Logo.webp'

// const FooterContactInfo = () => {
//   return (
//     <div className='footer-contact-info'>
//       <img src={logo} alt='OdontoPlus Logo' className='footer-logo-image' />
//       <p className='footer-info'>Arucas | 928 928 928</p>
//       <p className='footer-info'>info@odontoplus.com</p>
//     </div>
//   )
// }

// export default FooterContactInfo


import { Link } from 'react-router-dom'
import logo from '../../assets/images/Logo.webp'

const FooterContactInfo = () => {
  return (
    <div className='footer-contact-info'>
      <Link to='/'>
        <img src={logo} alt='OdontoPlus Logo' className='footer-logo-image' />
      </Link>
      <p className='footer-info'>Arucas | 928 928 928</p>
      <p className='footer-info'>info@odontoplus.com</p>
    </div>
  )
}

export default FooterContactInfo
