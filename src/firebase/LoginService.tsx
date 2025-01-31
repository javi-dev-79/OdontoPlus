import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase-config'
import '../styles/login-register.css'

const LoginService = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault() // Evita que el formulario se recargue
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Login exitoso')

      // Redirige inmediatamente después del inicio de sesión
      navigate('/')
    } catch (error) {
      console.error('Error durante el login:', error)
    }
  }

  return (
    <div className='auth-container'>
      <h2 className='auth-title'>INICIAR SESIÓN</h2>
      <form onSubmit={(e) => handleLogin(e)} className='auth-form'>
        <div className='input-group'>
          <label htmlFor='email'>EMAIL:</label>
          <input
            id='email'
            type='email'
            placeholder='Ingrese su correo'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>CONTRASEÑA:</label>
          <input
            id='password'
            type='password'
            placeholder='Ingrese su contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>ACEPTAR</button>
      </form>

      <p className='call-to-action'>¿No tienes cuenta?</p>
      <button onClick={() => navigate('/register')}>Registrarse</button>
    </div>
  )
}

export default LoginService
