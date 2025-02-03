import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'
import '../styles/login-register.css'

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
    <div className='auth-container'>
      <h2 className='auth-title'>REGISTRARSE</h2>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}{' '}
      {/* ⚠️ Show errors */}
      <form onSubmit={handleRegister} className='auth-form'>
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
            placeholder='Ingrese su contraseña (mín. 6 caracteres)'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>REGISTRARSE</button>
      </form>
      <p className='call-to-action'>¿Ya tienes cuenta?</p>
      <button onClick={() => navigate('/login')}>Iniciar sesión</button>
    </div>
  )
}

export default RegisterService
