import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/UseAuth'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Text,
  Heading
} from '@chakra-ui/react'

interface PrivateRouteProps {
  adminOnly?: boolean
}

const PrivateRoute = ({ adminOnly = false }: PrivateRouteProps) => {
  const { currentUser, userData, loading } = useAuth()
  const navigate = useNavigate()

  console.log('🔍 PrivateRoute - Estado de autenticación:')
  console.log(
    '   🔹 Usuario autenticado:',
    currentUser ? currentUser.email : 'No autenticado'
  )
  console.log('   🔹 Datos del usuario en Firestore:', userData)
  console.log('   🔹 Cargando:', loading)

  if (!currentUser) {
    return (
      <Modal
        isOpen={true}
        onClose={() => navigate('/login')}
        isCentered // Añadimos esta prop para centrar el modal
      >
        <ModalOverlay />
        <ModalContent
          maxWidth='400px'
          width='90%' // Añadimos width para asegurar responsividad
          mx='auto'
          borderRadius='12px'
          border='3px solid #004D40'
          boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
          backgroundColor='white'
          p={6}
          position='relative' // Aseguramos posicionamiento relativo
          top='50%' // Ya no es necesario pero lo mantenemos por compatibilidad
          transform='translateY(-50%)' // Ya no es necesario pero lo mantenemos por compatibilidad
        >
          <ModalHeader>
            <Heading size='lg' color='#004D40' textAlign='center'>
              Acceso Restringido
            </Heading>
          </ModalHeader>
          <ModalBody textAlign='center' mb={4}>
            <Text fontSize='16px' color='#333333' mb={4}>
              Debes estar registrado e iniciar sesión para acceder a esta
              sección.
            </Text>
            <Button
              onClick={() => navigate('/login')}
              bg='#004D40'
              color='white'
              fontSize='16px'
              fontWeight='600'
              borderRadius='8px'
              border='3px solid #CCCCCC'
              _hover={{
                bg: 'white',
                color: '#333333',
                borderColor: '#004D40'
              }}
            >
              Ir a Login
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  if (!currentUser) {
    console.log('⚠️ Usuario no autenticado, redirigiendo a /login')
    return <Navigate to='/login' />
  }

  if (adminOnly && userData?.role !== 'admin') {
    console.log(
      '⛔ Acceso denegado, usuario sin permisos de admin. Redirigiendo a /'
    )
    return <Navigate to='/' />
  }

  console.log('✅ Acceso permitido, mostrando componente')
  return <Outlet />
}

export default PrivateRoute

