import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
  Icon,
  Flex,
  Image
} from '@chakra-ui/react'
import { MdEmail } from 'react-icons/md'
import React, { useState } from 'react'
import image from '../../assets/images/newsletter-image.webp'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError('Campo obligatorio')
      return
    }

    if (!validateEmail(email)) {
      setError('Email inválido')
      return
    }

    console.log('Email subscrito:', email)
    setError('')
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      align='center'
      justify='center'
      p={4}
    >
      <Box
        display='flex'
        borderWidth='2px'
        borderColor='primary.500'
        borderRadius='15px'
        overflow='hidden'
        width={{ base: '100%', sm: '66%', md: '50%', lg: '800px' }}
        height={{ base: 'auto', sm: 'auto', md: '500px' }}
      >
        <Box flex='1' display='flex' justifyContent='center' height='100%'>
          <Image
            src={image}
            alt='Imagen de la newsletter'
            boxSize='100%'
            objectFit='cover'
            height='100%'
          />
        </Box>

        <Box
          flex='1'
          p={{ base: 4, sm: 8 }}
          bg='white'
          borderRadius='15px'
          height='100%'
          display='flex'
          flexDirection='column'
          justifyContent='center'
        >
          <Text
            fontSize={{ base: '1.2rem', sm: '1.5rem', md: '1.8rem' }}
            fontWeight='bold'
            textAlign='center'
            mb={2}
          >
            Suscríbase a nuestra newsletter
          </Text>
          <Text
            fontSize={{ base: '0.9rem', sm: '1rem', md: '1.2rem' }}
            textAlign='center'
            mb={2}
          >
            Únete a nuestra comunidad y recibe información exclusiva sobre
            tratamientos, consejos de salud bucal y promociones especiales.
          </Text>

          <form onSubmit={handleSubscribe}>
            <FormControl isInvalid={!!error} mb={3}>
              <FormLabel htmlFor='email' className='visually-hidden'>
                Email
              </FormLabel>
              <Box position='relative'>
                <Icon
                  as={MdEmail}
                  position='absolute'
                  top='50%'
                  left={3}
                  transform='translateY(-50%)'
                  color='gray.400'
                />
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={handleEmailChange}
                  placeholder={error || 'Ingresa aquí tu email'}
                  pl={10}
                  borderColor={error ? 'red.500' : 'gray.300'}
                  fontSize={{ base: '12px', sm: '14px' }}
                />
              </Box>
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>

            <Button
              type='submit'
              colorScheme='teal'
              width='full'
              mt={5}
              fontSize={{ base: '12px', sm: '14px' }}
              borderRadius='25px'
            >
              SUBSCRÍBETE
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  )
}

export default Newsletter

