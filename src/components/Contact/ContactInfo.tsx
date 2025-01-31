import React from 'react'
import { LuPhone } from 'react-icons/lu'
import { FaRegEnvelope } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import '../../styles/Contact.css'

const ContactInfo: React.FC = () => {
  return (
    <div className='contact-info' aria-label='Información de contacto'>
      <p className='contact-item'>
        <LuPhone className='contact-icon' aria-hidden='true' />
        <span>Teléfono: 928 928 928</span>
      </p>
      <p className='contact-item'>
        <FaRegEnvelope className='contact-icon' aria-hidden='true' />
        <span>Email: info@odontoplus.com</span>
      </p>
      <p className='contact-item'>
        <IoLocationOutline className='contact-icon' aria-hidden='true' />
        <span>
          Dirección: Lomo de Arucas, Av. Pedro Morales Déniz, 201, 35411, Las
          Palmas
        </span>
      </p>
    </div>
  )
}

export default ContactInfo
