import { useNavigate } from 'react-router-dom'
import { Box, Button, Heading, Text, Flex, IconButton } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useState, useEffect } from 'react'

import Slide1 from '../../assets/images/Slide 1.webp'
import Slide2 from '../../assets/images/Slide 2.webp'
import Slide3 from '../../assets/images/Slide 3.webp'

const slidesInfo = [
  {
    image: Slide1,
    title: 'ESTÉTICA DENTAL',
    description: 'Hacemos realidad la sonrisa de tus sueños',
    alt: 'Imagen de estética dental'
  },
  {
    image: Slide2,
    title: 'PERIODONCIA',
    description: 'Recupera la salud de tus encías',
    alt: 'Imagen de muela con tratamiento de periodoncia'
  },
  {
    image: Slide3,
    title: 'IMPLANTOLOGÍA',
    description: 'Tus implantes y dientes fijos en 24 horas',
    alt: 'Imagen de instrumental para implantes dentales'
  }
]

const images = slidesInfo.map((slide) => ({
  original: slide.image,
  thumbnail: slide.image,
  alt: slide.alt
}))

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const changeSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const interval = setInterval(changeSlide, 5000) // Cambia el slide cada 5 segundos
    return () => clearInterval(interval) // Limpia el intervalo cuando el componente se desmonte
  }, [])

  return (
    <>
      <Helmet>
        <title>Página No Encontrada | OdontoPlus</title>
        <meta
          name='description'
          content='Lo sentimos, la página que buscas no existe o ha sido movida.'
        />
        <meta property='og:title' content='Página No Encontrada | OdontoPlus' />
        <meta
          property='og:description'
          content='La página que buscas no está disponible. Vuelve al inicio para más información.'
        />
        <meta
          property='og:image'
          content='https://odontoplus.netlify.app/404.webp'
        />
        <meta property='og:url' content='https://odontoplus.netlify.app/404' />
        <meta property='og:type' content='website' />
      </Helmet>

      <Box
        position='relative'
        width='100%'
        height={{ base: '180px', sm: '280px', md: '350px', lg: '400px' }}
        overflow='hidden'
        zIndex={10}
        display='flex'
        justifyContent='center'
        alignItems='center'
        bg='#f3f4f6'
      >
        <Box
          position='absolute'
          top={0}
          left={0}
          width='100%'
          height='100%'
          objectFit='cover'
          opacity={0.6}
          backgroundImage={`url(${images[currentSlide].original})`}
          backgroundPosition='center'
          backgroundRepeat='no-repeat'
          backgroundSize='cover'
        />

        <Flex
          direction='column'
          align='center'
          justify='center'
          zIndex={20}
          textAlign='center'
          color='rgb(250, 253, 251)'
        >
          <Heading
            fontSize={{
              base: '1.3rem',
              sm: '1.6rem',
              md: '1.8rem',
              lg: '2rem'
            }}
            color='#004D40'
            mb='0.5rem'
            fontWeight='bold'
          >
            {slidesInfo[currentSlide].title}
          </Heading>
          <Text
            fontSize={{
              base: '1rem',
              sm: '1.3rem',
              md: '1.5rem',
              lg: '1.8rem'
            }}
            color='#333333'
            mb='1rem'
          >
            {slidesInfo[currentSlide].description}
          </Text>
          <Button
            onClick={() => navigate('/contact')}
            bg='#004D40'
            color='#FFFFFF'
            borderRadius='25px'
            padding={{ base: '10px 20px', sm: '12px 25px', md: '15px 30px' }}
            fontSize={{ base: '14px', sm: '16px', md: '18px' }}
            fontWeight={600}
            _hover={{
              bg: '#FFFFFF',
              color: '#333333',
              borderColor: '#004D40'
            }}
          >
            PIDE CITA
          </Button>
        </Flex>

        <Box position='absolute' bottom={{ base: '10px', sm: '20px' }}>
          <Flex justify='center' gap={{ base: '5px', sm: '10px' }}>
            {slidesInfo.map((_, index) => (
              <Box
                key={index}
                width={{ base: '8px', sm: '15px' }}
                height={{ base: '8px', sm: '15px' }}
                borderRadius='50%'
                backgroundColor={index === currentSlide ? '#004D40' : '#CCCCCC'}
                transition='background-color 0.3s ease'
                aria-label={`Slide ${index + 1} de ${slidesInfo.length}`}
              />
            ))}
          </Flex>
        </Box>

        <IconButton
          position='absolute'
          left={0}
          top='50%'
          transform='translateY(-50%)'
          variant='ghost'
          colorScheme='teal'
          aria-label='Previous slide'
          icon={<FaChevronLeft />}
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
          zIndex={20}
          width={{ base: '30px', sm: '40px' }} // Ajustar el tamaño en pantallas pequeñas
          height={{ base: '30px', sm: '40px' }}
        />

        <IconButton
          position='absolute'
          right={0}
          top='50%'
          transform='translateY(-50%)'
          variant='ghost'
          colorScheme='teal'
          aria-label='Next slide'
          icon={<FaChevronRight />}
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === images.length - 1 ? 0 : prev + 1
            )
          }
          zIndex={20}
          width={{ base: '30px', sm: '40px' }} // Ajustar el tamaño en pantallas pequeñas
          height={{ base: '30px', sm: '40px' }}
        />
      </Box>
    </>
  )
}

export default Carousel

