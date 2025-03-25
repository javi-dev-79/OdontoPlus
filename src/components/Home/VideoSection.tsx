import { useState } from 'react'
import {
  Box,
  Heading,
  Button,
  Text,
} from '@chakra-ui/react'
import video from '../../assets/videos/Olivia-Noble.mp4'

const VideoSection = () => {
  const [showTranscript, setShowTranscript] = useState(false)

  const toggleTranscript = () => {
    setShowTranscript(!showTranscript)
  }

  return (
    <Box
      py={8}
      px={{ base: 4, sm: 8 }}
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <Heading as='h2' size='lg' mb={4} textAlign='center'>
        Descubre OdontoPlus: Tu Clínica Dental en Arucas
      </Heading>

      <Box maxWidth='100%' width='100%' mb={6}>
        <video
          controls
          width='100%'
          aria-label='Video sobre la clínica OdontoPlus'
        >
          <source src={video} type='video/mp4' />
          Tu navegador no soporta el elemento de video.
        </video>
      </Box>

      <Button
        onClick={toggleTranscript}
        colorScheme='teal'
        variant='outline'
        mb={4}
        aria-label={
          showTranscript ? 'Ocultar Transcripción' : 'Mostrar Transcripción'
        }
      >
        {showTranscript ? 'Ocultar Transcripción' : 'Mostrar Transcripción'}
      </Button>

      {showTranscript && (
        <Box
          border='1px solid #ddd'
          borderRadius='8px'
          p={4}
          bg='gray.50'
          width='100%'
          maxWidth='800px'
          mx='auto'
        >
          <Text fontSize='md' whiteSpace='pre-line'>
            [Bienvenidos a OdontoPlus, tu clínica dental de confianza. Aquí,
            combinamos experiencia, tecnología y un trato cercano para brindarte
            la mejor atención bucodental.
            {'\n'}
            Sabemos lo importante que es tu sonrisa. Por eso, nuestro equipo de
            especialistas está comprometido en ofrecerte tratamientos
            personalizados para cuidar tu salud dental. {'\n'}
            En OdontoPlus contamos con los últimos avances en odontología, desde
            implantes dentales, ortodoncia invisible, blanqueamiento y mucho
            más. {'\n'}
            Nuestras instalaciones están diseñadas para tu comodidad y
            bienestar, con tecnología de vanguardia que garantiza procedimientos
            seguros y efectivos. Porque tu sonrisa es nuestra prioridad, te
            acompañamos en cada paso para que tengas la mejor experiencia en el
            cuidado de tu salud oral. {'\n'}
            Visítanos en nuestra clínica OdontoPlus y descubre cómo podemos
            transformar tu sonrisa. Nos encontramos en Arucas, un lugar
            accesible y cercano para todos nuestros pacientes. {'\n'}
            ¡Agenda tu cita hoy mismo! Te esperamos.]
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default VideoSection

