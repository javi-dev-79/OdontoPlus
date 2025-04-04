// import '../../styles/Contact.css'

// const ContactHead = () => {
//   return (
//     <div className='contact-head-container'>
//       <h1 className='contact-head-title'>CONTÁCTANOS</h1>
//       <h2 className='contact-head-subtitle'>
//         RESERVA UNA CITA O SOLICITA INFORMACIÓN
//       </h2>
//       <p className='contact-head-description'>
//         Nuestro Centro de Atención te atenderá de lunes a jueves de 10h a 18h y
//         los viernes de 8h a 16h. Tu petición es muy importante para nosotros, te
//         responderemos lo antes posible.
//       </p>
//     </div>
//   )
// }

// export default ContactHead

import { Box, Heading, Text } from '@chakra-ui/react'

const ContactHead = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      p={5}
    >
      <Heading
        as='h1'
        fontSize={{ base: '1.8rem', sm: '2.5rem' }}
        color='#333333'
        mb={4}
      >
        CONTÁCTANOS
      </Heading>

      <Heading
        as='h2'
        fontSize={{ base: '1.3rem', sm: '1.8rem' }}
        fontWeight='600'
        color='#004D40'
        mb={5}
      >
        RESERVA UNA CITA O SOLICITA INFORMACIÓN
      </Heading>

      <Text
        fontSize={{ base: '1rem', sm: '1.2rem' }}
        color='#000000'
        maxWidth='800px'
        mx='auto'
        mb={6}
        lineHeight='1.6'
      >
        Nuestro Centro de Atención te atenderá de lunes a jueves de 10h a 18h y
        los viernes de 8h a 16h. Tu petición es muy importante para nosotros, te
        responderemos lo antes posible.
      </Text>
    </Box>
  )
}

export default ContactHead

