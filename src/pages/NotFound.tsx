import { useNavigate } from 'react-router-dom'
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import Logo from '@/assets/images/Logo-small.webp'

const NotFoundPage = () => {
  const navigate = useNavigate()

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
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height='100vh'
        bg='#f3f4f6'
        px={{ base: '1rem', sm: '2rem' }}
      >
        <Box
          bg='white'
          p={{ base: '0.75rem', sm: '1.5rem' }}
          borderRadius='12px'
          boxShadow='0 4px 10px rgba(0, 0, 0, 0.1)'
          textAlign='center'
          maxW='500px'
          w='100%'
          border='3px solid #004D40'
        >
          <Image src={Logo} alt='Logo' maxW='100%' />
          <Heading
            color='#004D40'
            fontSize={{ base: '1.3rem', sm: '1.6rem', md: '1.8rem' }}
            fontWeight='bold'
            mb='0.5rem'
          >
            PÁGINA NO ENCONTRADA
          </Heading>
          <Text
            color='#333333'
            fontSize={{ base: '1rem', sm: '1.3rem', md: '1.5rem' }}
            mb='1rem'
          >
            Lo sentimos, la página que buscas no existe.
          </Text>
          <Button
            onClick={() => navigate(-1)}
            bg='#004D40'
            border='3px solid #CCCCCC'
            color='#FFFFFF'
            px={{ base: '0.75rem', sm: '1.25rem' }}
            py={{ base: '0.4rem', sm: '0.6rem' }}
            borderRadius='8px'
            fontSize={{ base: '0.9rem', sm: '1.1rem' }}
            _hover={{
              bg: '#FFFFFF',
              color: '#004D40',
              borderColor: '#004D40'
            }}
          >
            Volver atrás
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default NotFoundPage

