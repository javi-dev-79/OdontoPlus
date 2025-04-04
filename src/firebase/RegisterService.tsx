import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text
} from '@chakra-ui/react'

const RegisterService = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isValidPassword = (password: string) => {
    return password.length >= 6
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!isValidEmail(email)) {
      setErrorMessage(
        'El email ingresado no es válido. Introduce un email con formato correcto.'
      )
      return
    }

    if (!isValidPassword(password)) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      const userRef = doc(db, 'app-users', user.uid)
      await setDoc(userRef, {
        email: email,
        role: 'patient',
        createdAt: Timestamp.now(),
        updatedAt: null,
        status: 'pending'
      })

      console.log('Usuario registrado correctamente')
      navigate('/')
    } catch (error: unknown) {
      console.error('Error durante el registro:', error)

      if (error instanceof Error && 'code' in error) {
        const firebaseError = error as { code: string }

        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            setErrorMessage(
              'El correo electrónico ya está registrado. Intenta con otro.'
            )
            break
          case 'auth/weak-password':
            setErrorMessage(
              'La contraseña es demasiado débil. Usa al menos 6 caracteres.'
            )
            break
          case 'auth/invalid-email':
            setErrorMessage('El email ingresado no es válido.')
            break
          default:
            setErrorMessage(
              'Ocurrió un error al registrarse. Inténtalo de nuevo.'
            )
            break
        }
      } else {
        setErrorMessage('Ocurrió un error desconocido. Inténtalo de nuevo.')
      }
    }
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      bg='#f5f5f5'
      p={4}
    >
      <Heading color='#004D40' mb={4} fontSize='30px'>
        REGISTRARSE
      </Heading>
      {errorMessage && (
        <Text color='red' fontSize='16px' mb={4} textAlign='center'>
          {errorMessage}
        </Text>
      )}
      <Box
        as='form'
        onSubmit={handleRegister}
        width='100%'
        maxWidth='500px'
        border='3px solid #004D40'
        borderRadius='15px'
        padding='20px'
        transition='background-color 0.3s ease-in-out'
        _hover={{ backgroundColor: '#CCCCCC' }}
      >
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor='email' fontSize='16px' fontWeight='bold'>
            EMAIL:
          </FormLabel>
          <Input
            id='email'
            type='email'
            placeholder='Ingrese su correo'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            border='3px solid #004D40'
            borderRadius='8px'
            fontSize='16px'
            _focus={{ borderColor: '#002D27' }}
            _hover={{ borderColor: '#002D27' }}
          />
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel htmlFor='password' fontSize='16px' fontWeight='bold'>
            CONTRASEÑA:
          </FormLabel>
          <Input
            id='password'
            type='password'
            placeholder='Ingrese su contraseña (mín. 6 caracteres)'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            border='3px solid #004D40'
            borderRadius='8px'
            fontSize='16px'
            _focus={{ borderColor: '#002D27' }}
            _hover={{ borderColor: '#002D27' }}
          />
        </FormControl>

        <Button
          type='submit'
          width='full'
          colorScheme='teal'
          bg='#004D40'
          color='white'
          _hover={{
            bg: '#FFFFFF',
            color: '#333333',
            borderColor: '#004D40'
          }}
          mb={4}
          fontSize='16px'
          fontWeight='600'
          border='3px solid #CCCCCC'
          borderRadius='8px'
        >
          REGISTRARSE
        </Button>
      </Box>

      <Text mt={4} fontSize='16px'>
        ¿Ya tienes cuenta?
      </Text>
      <Button
        onClick={() => navigate('/login')}
        colorScheme='teal'
        variant='outline'
        borderColor='#004D40'
        borderRadius='8px'
        fontWeight='600'
        fontSize='16px'
      >
        Iniciar sesión
      </Button>
    </Box>
  )
}

export default RegisterService

