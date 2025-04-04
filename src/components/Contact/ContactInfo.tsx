// import React from 'react'
// import { LuPhone } from 'react-icons/lu'
// import { FaRegEnvelope } from 'react-icons/fa'
// import { IoLocationOutline } from 'react-icons/io5'
// import '../../styles/Contact.css'

// const ContactInfo: React.FC = () => {
//   return (
//     <div className='contact-info' aria-label='Información de contacto'>
//       <p className='contact-item'>
//         <LuPhone className='contact-icon' aria-hidden='true' />
//         <span>Teléfono: 928 928 928</span>
//       </p>
//       <p className='contact-item'>
//         <FaRegEnvelope className='contact-icon' aria-hidden='true' />
//         <span>Email: info@odontoplus.com</span>
//       </p>
//       <p className='contact-item'>
//         <IoLocationOutline className='contact-icon' aria-hidden='true' />
//         <span>
//           Dirección: Lomo de Arucas, Av. Pedro Morales Déniz, 201, 35411, Las
//           Palmas
//         </span>
//       </p>
//     </div>
//   )
// }

// export default ContactInfo

import { Box, Text, Flex, Icon } from '@chakra-ui/react'
import { LuPhone } from 'react-icons/lu'
import { FaRegEnvelope } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'

const ContactInfo = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      p={5}
      bg='white'
      border='2px solid #004D40'
      borderRadius='10px'
      maxWidth='800px'
      mx='auto'
      mb={10}
    >
      <Text fontSize='1.2rem' fontWeight='bold' color='#004D40' mb={3}>
        Información de contacto
      </Text>

      <Flex direction='column' alignItems='center' gap={5}>
        <Flex alignItems='center' gap={2}>
          <Icon as={LuPhone} boxSize={6} color='gray.600' />
          <Text fontSize='1rem' color='#333333'>
            Teléfono: 928 928 928
          </Text>
        </Flex>

        <Flex alignItems='center' gap={2}>
          <Icon as={FaRegEnvelope} boxSize={6} color='gray.600' />
          <Text fontSize='1rem' color='#333333'>
            Email: info@odontoplus.com
          </Text>
        </Flex>

        <Flex alignItems='center' gap={2}>
          <Icon as={IoLocationOutline} boxSize={6} color='gray.600' />
          <Text fontSize='1rem' color='#333333' textAlign='center'>
            Dirección: Lomo de Arucas, Av. Pedro Morales Déniz, 201, 35411, Las
            Palmas
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ContactInfo

