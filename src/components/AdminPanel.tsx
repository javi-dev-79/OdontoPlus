import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { Trash2, Edit } from 'lucide-react'
import { Box, Button, Select, Text, Heading, Flex } from '@chakra-ui/react'
import { AppUser, Dentist } from './types'

const AdminPanel = () => {
  const [appusers, setUsers] = useState<AppUser[]>([])
  const [dentists, setDentists] = useState<Dentist[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'pending' | 'approved' | 'rejected'
  >('all')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'app-users')
        const snapshot = await getDocs(usersCollection)
        const usersList = snapshot.docs.map((doc) => ({
          userId: doc.id,
          ...doc.data()
        })) as AppUser[]
        setUsers(usersList)
      } catch (error) {
        console.error('Error fetching app-users:', error)
      }
    }

    const fetchDentists = async () => {
      try {
        const dentistsCollection = collection(db, 'dentists')
        const snapshot = await getDocs(dentistsCollection)
        const dentistsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Dentist[]
        setDentists(dentistsList)
      } catch (error) {
        console.error('Error fetching dentists:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
    fetchDentists()
  }, [])

  const formatDate = (timestamp?: Timestamp) => {
    return timestamp ? new Date(timestamp.toDate()).toLocaleString() : 'N/A'
  }

  const handleDeleteUser = async (id: string) => {
    try {
      console.log(`Eliminar usuario con ID: ${id}`)
      // Aquí iría la lógica para eliminar el usuario
    } catch (error) {
      console.error('Error eliminando usuario:', error)
    }
  }

  const handleEditUser = async (
    id: string,
    newRole: string,
    newStatus: string
  ) => {
    try {
      console.log(
        `Editar usuario con ID: ${id}, Nuevo Rol: ${newRole}, Nuevo Estado: ${newStatus}`
      )
      // Aquí iría la lógica para editar el usuario
    } catch (error) {
      console.error('Error editando usuario:', error)
    }
  }

  const filteredUsers = appusers.filter((user) =>
    selectedFilter === 'all' ? true : user.status === selectedFilter
  )

  if (loading) {
    return (
      <Box textAlign='center' paddingTop='5rem'>
        <Text>Loading...</Text>
      </Box>
    )
  }

  return (
    <Box padding='24px' maxWidth='1200px' margin='auto'>
      <Heading
        fontSize='40px'
        fontFamily='Playfair Display'
        fontWeight='bold'
        lineHeight='55px'
        color='#004D40'
        textAlign='center'
        marginTop='5rem'
      >
        PANEL DE ADMINISTRACIÓN
      </Heading>

      <Flex
        justifyContent='space-between'
        alignItems='center'
        marginTop='5rem'
        marginBottom='2rem'
      >
        <Heading size='lg'>PANEL DE USUARIOS</Heading>
        <Select
          value={selectedFilter}
          onChange={(e) =>
            setSelectedFilter(
              e.target.value as 'all' | 'pending' | 'approved' | 'rejected'
            )
          }
          padding='12px 16px'
          border='2px solid #004D40'
          borderRadius='8px'
          fontSize='16px'
          fontWeight='bold'
          outline='none'
          width='200px'
          textAlign='center' // Centra el texto dentro del select
          icon={
            <Box
              as='span'
              fontSize='xl'
              display='inline-block'
              textAlign='center'
            />
          }
          sx={{
            option: {
              textAlign: 'left' // Alinea el texto dentro de las opciones a la izquierda
            }
          }}
        >
          <option value='all'>Todos</option>
          <option value='pending'>Pendientes</option>
          <option value='approved'>Aprobados</option>
          <option value='rejected'>Rechazados</option>
        </Select>
      </Flex>

      <Box
        border='3px solid #004D40'
        borderRadius='15px'
        padding='10px'
        minHeight='100px'
        marginBottom='5rem'
        background='white'
      >
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Box
              key={user.userId}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              padding='16px'
              borderBottom='1px solid #eee'
              transition='background 0.3s'
              gap='15px'
            >
              <Box flex='1'>
                <Text fontSize='28px' fontWeight='bold'>
                  {user.email}
                </Text>
                <Box
                  display='flex'
                  flexDirection='column'
                  gap='10px'
                  fontSize='14px'
                  marginTop='5px'
                  color='#555'
                >
                  <Text>
                    <strong>Estado:</strong> {user.status}
                  </Text>
                  <Text>
                    <strong>Tipo:</strong> {user.role}
                  </Text>
                </Box>
                <Box
                  display='flex'
                  gap='20px'
                  fontSize='14px'
                  marginTop='5px'
                  color='#555'
                >
                  <Text>
                    <strong>Creado:</strong> {formatDate(user.createdAt)}
                  </Text>
                  <Text>
                    <strong>Actualizado:</strong> {formatDate(user.updatedAt)}
                  </Text>
                </Box>
              </Box>

              <Box display='flex' gap='15px'>
                <Button
                  colorScheme='teal'
                  onClick={() =>
                    handleEditUser(user.userId, 'admin', 'approved')
                  }
                >
                  <Edit className='icon-btn' />
                  EDITAR
                </Button>
                <Button
                  colorScheme='red'
                  onClick={() => handleDeleteUser(user.userId)}
                >
                  <Trash2 className='icon-btn' />
                  ELIMINAR
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Text textAlign='center' fontSize='16px' color='#666' padding='20px'>
            No hay usuarios que mostrar
          </Text>
        )}
      </Box>

      <Heading size='lg' marginTop='2rem' marginBottom='2rem' color='#004D40'>
        GESTIÓN DE DENTISTAS
      </Heading>

      <Box
        border='3px solid #004D40'
        borderRadius='15px'
        padding='10px'
        minHeight='100px'
        marginBottom='5rem'
        background='white'
      >
        {dentists.length > 0 ? (
          dentists.map((dentist) => (
            <Box
              key={dentist.id}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              padding='16px'
              borderBottom='1px solid #eee'
              transition='background 0.3s'
              gap='15px'
            >
              <Box flex='1'>
                <Text fontSize='28px' fontWeight='bold'>
                  {dentist.fullName}
                </Text>
                <Box
                  display='flex'
                  gap='20px'
                  fontSize='14px'
                  marginTop='5px'
                  color='#555'
                >
                  <Text>
                    <strong>Especialidad:</strong> {dentist.specialty}
                  </Text>
                </Box>
              </Box>

              <Box display='flex' gap='15px'>
                <Button
                  colorScheme='teal'
                  onClick={() => navigate(`/edit-dentist/${dentist.id}`)}
                >
                  <Edit className='icon-btn' />
                  EDITAR
                </Button>
                <Button
                  colorScheme='red'
                  onClick={() => handleDeleteUser(dentist.id)}
                >
                  <Trash2 className='icon-btn' />
                  ELIMINAR
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Text textAlign='center' fontSize='16px' color='#666' padding='20px'>
            No hay dentistas que mostrar
          </Text>
        )}
      </Box>

      <Button
        onClick={() => navigate('/add-dentist')}
        margin='auto'
        display='flex'
        justifyContent='center'
        alignItems='center'
        padding='16px 24px' // Aumentamos el padding para darle más altura al botón
        fontSize='18px'
        backgroundColor='#004D40'
        color='white'
        borderRadius='8px'
        border='3px solid #CCCCCC'
        _hover={{
          background: 'white',
          color: '#004D40',
          borderColor: '#004D40'
        }}
        gap='10px' // Añadimos gap entre el icono y el texto
      >
        AÑADIR DENTISTA
      </Button>
    </Box>
  )
}

export default AdminPanel

