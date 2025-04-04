import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import clinicImage from '../assets/images/Gemini_Generated_Image_3nnf333nnf333nnf.webp'
import clinicStaff from '../assets/images/Equipo médico OdontoPlus.webp'

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | OdontoPlus</title>
        <meta
          name='description'
          content='Conoce más sobre OdontoPlus y nuestro equipo de especialistas en odontología.'
        />
        <meta property='og:title' content='Sobre Nosotros | OdontoPlus' />
        <meta
          property='og:description'
          content='Descubre la historia de OdontoPlus y nuestro compromiso con la salud dental.'
        />
        <meta
          property='og:image'
          content='https://odontoplus.netlify.app/about-us.webp'
        />
        <meta
          property='og:url'
          content='https://odontoplus.netlify.app/about-us'
        />
        <meta property='og:type' content='website' />
      </Helmet>

      <Box
        maxW='1200px'
        m='0 auto'
        p={{ base: '1rem', sm: '3rem', lg: '5rem' }}
        textAlign='center'
      >
        <Heading as='h1' fontSize={{ base: '1.5rem', sm: '2.5rem' }} mb={5}>
          Sobre Nosotros
        </Heading>

        <Box
          bg='#e0e9e7'
          border='2px solid #004D40'
          borderRadius='10px'
          p={5}
          fontSize={{ base: '0.8rem', sm: '1.3rem' }}
          lineHeight='1.6'
          textAlign='justify'
          color='#333333'
          mb={10}
        >
          <Text>
            En <strong>OdontoPlus</strong>, nos dedicamos a brindar atención
            médica de calidad con un enfoque humano y profesional. Nuestra
            misión es mejorar la salud y el bienestar de nuestros pacientes a
            través de servicios médicos integrales y tecnología de vanguardia.
          </Text>
          <Text mt={5}>
            Contamos con un equipo de especialistas altamente capacitados y
            comprometidos con la excelencia en el cuidado de la salud. Nuestras
            instalaciones están diseñadas para ofrecer un ambiente cómodo y
            seguro para todos nuestros pacientes.
          </Text>
        </Box>

        <Flex justify='center' mb={12} pt={{ base: '2rem', sm: '3rem' }}>
          <Image
            src={clinicStaff}
            alt='Equipo médico de la clínica'
            boxSize={{ base: '250px', sm: '400px' }}
            borderRadius='10px'
            boxShadow='0 4px 8px rgba(0, 0, 0, 0.1)'
          />
        </Flex>

        <Box>
          <Heading as='h2' fontSize={{ base: '1rem', sm: '2rem' }} mb={4}>
            Nuestro Equipo Médico
          </Heading>
          <Text
            bg='#e0e9e7'
            border='2px solid #004D40'
            borderRadius='10px'
            p={5}
            fontSize={{ base: '0.8rem', sm: '1.3rem' }}
            color='#333333'
            lineHeight='1.6'
            textAlign='justify'
            mb={12}
          >
            Nuestro equipo está compuesto por profesionales de la salud con
            amplia experiencia en diversas especialidades. Trabajamos juntos
            para ofrecer un enfoque multidisciplinario que garantiza el mejor
            cuidado para nuestros pacientes.
          </Text>
        </Box>

        <Flex justify='center' mb={12} pt={{ base: '2rem', sm: '3rem' }}>
          <Image
            src={clinicImage}
            alt='Exterior de la clínica'
            boxSize={{ base: '250px', sm: '400px' }}
            borderRadius='10px'
            boxShadow='0 4px 8px rgba(0, 0, 0, 0.1)'
          />
        </Flex>

        <Box>
          <Heading as='h2' fontSize={{ base: '1rem', sm: '2rem' }} mb={4}>
            Nuestras Instalaciones
          </Heading>
          <Text
            bg='#e0e9e7'
            border='2px solid #004D40'
            borderRadius='10px'
            p={5}
            fontSize={{ base: '0.8rem', sm: '1.3rem' }}
            color='#333333'
            lineHeight='1.6'
            textAlign='justify'
            mb={12}
          >
            Contamos con instalaciones modernas y equipadas con tecnología de
            última generación para garantizar diagnósticos precisos y
            tratamientos efectivos. Nuestras áreas están diseñadas pensando en
            la comodidad y seguridad de nuestros pacientes.
          </Text>
        </Box>
      </Box>
    </>
  )
}

export default AboutUs

