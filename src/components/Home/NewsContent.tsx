import React, { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import '../../styles/Home.css'

const NewsContent = () => {
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
    <div className='news-content'>
      <h3>Suscríbase a nuestra newsletter</h3>
      <p>
        Únete a nuestra comunidad y recibe información exclusiva sobre
        tratamientos, consejos de salud bucal y promociones especiales.
      </p>
      <form
        onSubmit={handleSubscribe}
        className='subscribe-form'
        aria-label='Formulario de suscripción a la newsletter'
      >
        <div className='input-wrapper'>
          <label htmlFor='email'>
            <span className='visually-hidden'>Email</span>
            <MdEmail className='email-icon' size={20} />
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={handleEmailChange}
            placeholder={error || 'Ingresa aquí tu email'}
            className={error ? 'input-error' : ''}
            aria-describedby='email-error'
          />
        </div>
        <button type='submit'>SUBSCRÍBETE</button>
      </form>
    </div>
  )
}

export default NewsContent