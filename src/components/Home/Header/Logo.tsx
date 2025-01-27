import React from 'react'
import logo from '../../../assets/images/Logo.webp'
import '../../../styles/Header.css'

const Logo: React.FC = () => {
  return (
    <div className='logo'>
      <img src={logo} alt='OdontoPlus Logo' className='logo-image' />
    </div>
  )
}

export default Logo
