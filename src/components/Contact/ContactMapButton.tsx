// import React from 'react'
// import '../../styles/Contact.css'

// interface ContactMapButtonProps {
//   location: [number, number]
// }

// const ContactMapButton: React.FC<ContactMapButtonProps> = ({ location }) => {
//   const handleGetDirections = () => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${location[0]},${location[1]}`
//     window.open(url, '_blank')
//   }

//   return (
//     <div className='get-directions-container'>
//       <button className='get-directions-btn' onClick={handleGetDirections}>
//         Como llegar...
//       </button>
//     </div>
//   )
// }

// export default ContactMapButton

import { Button, Box } from '@chakra-ui/react'

interface ContactMapButtonProps {
  location: [number, number]
}

const ContactMapButton = ({ location }: ContactMapButtonProps) => {
  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location[0]},${location[1]}`
    window.open(url, '_blank')
  }

  return (
    <Box textAlign='center'>
      <Button
        onClick={handleGetDirections}
        bg={'#004D40'}
        color={"white"}
        variant='solid'
        size='md'
        borderRadius='md'
        width='auto'
        mb={6}
        _hover={{
          bg: '#FFFFFF',
          color: '#333333'
        }}
      >
        Cómo llegar...
      </Button>
    </Box>
  )
}

export default ContactMapButton


