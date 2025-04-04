import { useState, ChangeEvent, FormEvent } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage
} from '@chakra-ui/react'

interface FormData {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

interface FormErrors {
  nombre: string
  email: string
  asunto: string
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })

  const [errors, setErrors] = useState<FormErrors>({
    nombre: '',
    email: '',
    asunto: ''
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const newErrors: FormErrors = { nombre: '', email: '', asunto: '' }

    if (!formData.nombre) {
      newErrors.nombre = 'Campo obligatorio'
    }

    if (!formData.email) {
      newErrors.email = 'Campo obligatorio'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email no válido'
    }

    if (!formData.asunto) {
      newErrors.asunto = 'Campo obligatorio'
    }

    setErrors(newErrors)

    if (Object.values(newErrors).every((error) => !error)) {
      console.log('Formulario enviado correctamente')
    }
  }

  return (
    <Box
      as='form'
      onSubmit={handleSubmit}
      width={{ base: '90%', sm: '80%', lg: '800px' }}
      mx='auto'
      p={5}
      border='3px solid #004D40'
      borderRadius='15px'
      backgroundColor='white'
      mb={10}
      boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
    >
      <FormControl isInvalid={!!errors.nombre} mb={4}>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input
          id='nombre'
          name='nombre'
          value={formData.nombre}
          onChange={handleChange}
          placeholder={errors.nombre || 'Ingresa tu nombre'}
          borderColor={errors.nombre ? 'red.500' : 'gray.300'}
        />
        <FormErrorMessage>{errors.nombre}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email} mb={4}>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder={errors.email || 'Ingresa tu correo electrónico'}
          borderColor={errors.email ? 'red.500' : 'gray.300'}
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.asunto} mb={4}>
        <FormLabel htmlFor='asunto'>Asunto</FormLabel>
        <Input
          id='asunto'
          name='asunto'
          value={formData.asunto}
          onChange={handleChange}
          placeholder={errors.asunto || 'Ingresa el asunto'}
          borderColor={errors.asunto ? 'red.500' : 'gray.300'}
        />
        <FormErrorMessage>{errors.asunto}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor='mensaje'>Mensaje</FormLabel>
        <Textarea
          id='mensaje'
          name='mensaje'
          rows={6}
          value={formData.mensaje}
          onChange={handleChange}
          placeholder='Escribe tu mensaje (opcional)'
          borderColor='gray.300'
        />
      </FormControl>

      <Button
        type='submit'
        bg={'#004D40'}
        color={'white'}
        variant='solid'
        width='full'
        size='lg'
        borderRadius='10px'
        _hover={{
          bg: '#FFFFFF',
          color: '#333333'
        }}
      >
        Enviar
      </Button>
    </Box>
  )
}

export default ContactForm

