import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
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

const LoginService = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      console.log(`✅ Login exitoso: ${user.email} | ${user.uid}`)

      const userRef = doc(db, 'app-users', user.uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()
        const role = userData.role

        console.log(`ℹ️ Role obtenido de Firestore: ${role}`)

        // Redirigir según el rol del usuario
        if (role === 'admin') {
          console.log('🔹 Redirigiendo a /admin-panel')
          navigate('/admin-panel') // Redirigir al panel de administración si es admin
        } else if (role === 'patient') {
          console.log('🔹 Redirigiendo a página de citas /')
          navigate('/citas') // Redirigir a la página de citas si es paciente
        } else {
          console.error(`⚠️ Rol desconocido: ${role}`)
          navigate('/') // Redirigir al inicio si el rol no es admin ni paciente
        }
      } else {
        console.error('⚠️ No se encontraron datos del usuario en Firestore')
        navigate('/') // Redirigir al inicio si no se encuentran datos del usuario
      }
    } catch (error) {
      console.error('❌ Error durante el login:', error)
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
        INICIAR SESIÓN
      </Heading>
      <Box
        as='form'
        onSubmit={handleLogin}
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
            placeholder='Ingrese su contraseña'
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
          ENTRAR
        </Button>
      </Box>

      <Text mt={4} fontSize='16px'>
        ¿No tienes cuenta?
      </Text>
      <Button
        onClick={() => navigate('/register')}
        colorScheme='teal'
        variant='outline'
        borderColor='#004D40'
        borderRadius='8px'
        fontWeight='600'
        fontSize='16px'
      >
        Registrarse
      </Button>
    </Box>
  )
}

export default LoginService

