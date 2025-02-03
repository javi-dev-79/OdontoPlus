import { useState, ChangeEvent, FormEvent } from 'react'
import '../../styles/Contact.css'

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
    <form className='contact-form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='nombre'>Nombre</label>
        <input
          type='text'
          id='nombre'
          name='nombre'
          value={formData.nombre}
          onChange={handleChange}
          placeholder={errors.nombre || 'Ingresa tu nombre'}
          className={errors.nombre ? 'error' : ''}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder={errors.email || 'Ingresa tu correo electrónico'}
          className={errors.email ? 'error' : ''}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='asunto'>Asunto</label>
        <input
          type='text'
          id='asunto'
          name='asunto'
          value={formData.asunto}
          onChange={handleChange}
          placeholder={errors.asunto || 'Ingresa el asunto'}
          className={errors.asunto ? 'error' : ''}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='mensaje'>Mensaje</label>
        <textarea
          id='mensaje'
          name='mensaje'
          rows={6}
          value={formData.mensaje}
          onChange={handleChange}
          placeholder='Escribe tu mensaje (opcional)'
        />
      </div>

      <button type='submit' className='send-btn'>
        Enviar
      </button>
    </form>
  )
}

export default ContactForm
