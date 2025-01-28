import React from 'react'

const FooterSocialMedia: React.FC = () => {
  return (
    <div className='footer-social-media'>
      <div className='social-icons'>
        <a href='#' className='social-icon'>
          <i className='fab fa-instagram'></i>
        </a>
        <a href='#' className='social-icon'>
          <i className='fa-brands fa-square-facebook'></i>
        </a>
        <a href='#' className='social-icon'>
          <i className='fab fa-linkedin'></i>
        </a>
        <a href='#' className='social-icon'>
          <i className='fab fa-youtube'></i>
        </a>
      </div>
      <button className='cita-button'>PIDE TU CITA YA</button>
    </div>
  )
}

export default FooterSocialMedia
