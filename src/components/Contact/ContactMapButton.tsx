import React from 'react'
import '../../styles/Contact.css' // Importa el archivo CSS

interface ContactMapButtonProps {
  location: [number, number]
}

const ContactMapButton: React.FC<ContactMapButtonProps> = ({ location }) => {
  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location[0]},${location[1]}`
    window.open(url, '_blank')
  }

  return (
    <div className='get-directions-container'>
      <button className='get-directions-btn' onClick={handleGetDirections}>
        Como llegar...
      </button>
    </div>
  )
}

export default ContactMapButton
