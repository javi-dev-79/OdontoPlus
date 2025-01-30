// import {
//   FaInstagramSquare,
//   FaLinkedin,
//   FaFacebook
// } from 'react-icons/fa'
// import { IoLogoYoutube } from 'react-icons/io'

// const FooterSocialMedia = () => {
//   return (
//     <div className='footer-social-media'>
//       <div className='social-icons'>
//         <a href='#' className='social-icon'>
//           <FaInstagramSquare className='social-media-icon' />
//         </a>
//         <a href='#' className='social-icon'>
//           <FaFacebook className='social-media-icon-inv' />
//         </a>
//         <a href='#' className='social-icon'>
//           <FaLinkedin className='social-media-icon-inv' />
//         </a>
//         <a href='#' className='social-icon'>
//           <IoLogoYoutube className='social-media-icon-inv' />
//         </a>
//       </div>
//       <button className='cita-button'>PIDE TU CITA YA</button>
//     </div>
//   )
// }

// export default FooterSocialMedia


import { Link } from 'react-router-dom'
import { FaInstagramSquare, FaLinkedin, FaFacebook } from 'react-icons/fa'
import { IoLogoYoutube } from 'react-icons/io'
import '../../styles/footer.css'

const FooterSocialMedia = () => {
  return (
    <div className='footer-social-media'>
      <div className='social-icons'>
        <a
          href='https://www.instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          className='social-icon'
        >
          <FaInstagramSquare className='social-media-icon' />
        </a>
        <a
          href='https://www.facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          className='social-icon'
        >
          <FaFacebook className='social-media-icon-inv' />
        </a>
        <a
          href='https://www.linkedin.com'
          target='_blank'
          rel='noopener noreferrer'
          className='social-icon'
        >
          <FaLinkedin className='social-media-icon-inv' />
        </a>
        <a
          href='https://www.youtube.com'
          target='_blank'
          rel='noopener noreferrer'
          className='social-icon'
        >
          <IoLogoYoutube className='social-media-icon-inv' />
        </a>
      </div>
      <Link to='/contact' className='cita-button'>
        PIDE TU CITA YA
      </Link>
    </div>
  )
}

export default FooterSocialMedia
