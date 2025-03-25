import { useState, useRef, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase-config'
import { useAuth } from '../contexts/UseAuth'
import { Box, Flex, HStack, IconButton } from '@chakra-ui/react'
import { FaBars, FaTimes, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import Logo from './Header/Logo'
import Navigation from './Header/Navigation'
import UserActions from './Header/UserActions'

const Header = () => {
  const { currentUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      console.log('Usuario cerró sesión correctamente')
      navigate('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Box as='header' bg='primary.500' w='100%' py={4} px={6} boxShadow='md'>
      <Flex
        maxW='1200px'
        mx='auto'
        justify='space-between'
        align='center'
        wrap='wrap'
      >
        {/* Logo */}
        <Logo />

        {/* Navigation (solo en pantallas mayores a 1024px) */}
        <Box display={{ base: 'none', lg: 'block' }}>
          <Navigation />
        </Box>

        {/* UserActions (solo en pantallas mayores a 1024px) */}
        <Box display={{ base: 'none', lg: 'block' }}>
          <UserActions />
        </Box>

        {/* Iconos de "Iniciar sesión" y "Abrir menú" en pantallas menores a 1024px */}
        <Box display={{ base: 'flex', lg: 'none' }} alignItems='center'>
          <HStack spacing={{ base: '4px', sm: '6px' }}>
            {/* Icono de Iniciar sesión */}
            <IconButton
              aria-label={currentUser ? 'Cerrar sesión' : 'Iniciar sesión'}
              icon={currentUser ? <FaSignOutAlt /> : <FaSignInAlt />}
              onClick={currentUser ? handleLogout : () => navigate('/login')}
              color='white'
              bg='transparent'
              fontSize='20px'
              _hover={{ bg: 'transparent', color: 'gray.300' }}
              mr={{ base: '8px', sm: '10px' }} // ✅ Espaciado entre iconos
            />

            {/* Icono de Abrir menú */}
            <IconButton
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              icon={isOpen ? <FaTimes /> : <FaBars />}
              onClick={toggleMenu}
              color='white'
              bg='transparent'
              fontSize='24px'
              _hover={{ bg: 'transparent', color: 'gray.300' }}
            />
          </HStack>
        </Box>
      </Flex>

      {/* Dropdown Menu visible solo cuando el menú hamburguesa está abierto */}
      {isOpen && (
        <Box
          ref={dropdownRef}
          position='absolute'
          top='70px'
          right='0'
          w='220px'
          bg='primary.100' // ✅ Fondo B0D4D0
          p={4}
          shadow='lg'
          borderRadius='md'
          zIndex='1000'
          display='flex'
          flexDirection='column'
          gap={3} // Espaciado entre enlaces
        >
          {/* ✅ Se agregan todos los enlaces del Navigation directamente aquí */}
          <RouterLink
            to='/'
            onClick={toggleMenu}
            style={{ textDecoration: 'none' }}
          >
            <Box
              color='tertiary.500'
              p={2}
              borderRadius='md'
              fontWeight='semibold'
              _hover={{ bg: 'gray.200' }} // ✅ Hover sombreado
            >
              Inicio
            </Box>
          </RouterLink>

          <RouterLink
            to='/services'
            onClick={toggleMenu}
            style={{ textDecoration: 'none' }}
          >
            <Box
              color='tertiary.500'
              p={2}
              borderRadius='md'
              fontWeight='semibold'
              _hover={{ bg: 'gray.200' }}
            >
              Servicios
            </Box>
          </RouterLink>

          <RouterLink
            to='/about-us'
            onClick={toggleMenu}
            style={{ textDecoration: 'none' }}
          >
            <Box
              color='tertiary.500'
              p={2}
              borderRadius='md'
              fontWeight='semibold'
              _hover={{ bg: 'gray.200' }}
            >
              Sobre Nosotros
            </Box>
          </RouterLink>

          <RouterLink
            to='/contact'
            onClick={toggleMenu}
            style={{ textDecoration: 'none' }}
          >
            <Box
              color='tertiary.500'
              p={2}
              borderRadius='md'
              fontWeight='semibold'
              _hover={{ bg: 'gray.200' }}
            >
              Contacto
            </Box>
          </RouterLink>

          <RouterLink
            to='/online-dating'
            onClick={toggleMenu}
            style={{ textDecoration: 'none' }}
          >
            <Box
              color='tertiary.500'
              p={2}
              borderRadius='md'
              fontWeight='semibold'
              _hover={{ bg: 'gray.200' }}
            >
              Citas en Línea
            </Box>
          </RouterLink>
        </Box>
      )}
    </Box>
  )
}

export default Header

