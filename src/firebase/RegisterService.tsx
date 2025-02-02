// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { doc, setDoc, Timestamp } from 'firebase/firestore'
// import { auth, db } from '../config/firebase-config'
// import '../styles/login-register.css'

// const RegisterService = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       // Crea el usuario en Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       )
//       const user = userCredential.user

//       // Crea el documento del usuario en Firestore con los nuevos campos
//       const userRef = doc(db, 'app-users', user.uid)
//       await setDoc(userRef, {
//         email: email,
//         role: 'patient', // Rol por defecto
//         createdAt: Timestamp.now(), // Fecha y hora de creación
//         updatedAt: null, // Inicialmente nulo, se actualizará en el futuro
//         status: 'pending' // Estado inicial del usuario
//       })

//       console.log('Usuario registrado correctamente')
//       navigate('/') // Redirige a la página de inicio
//     } catch (error) {
//       console.error('Error durante el registro:', error)
//     }
//   }

//   return (
//     <div className='auth-container'>
//       <h2 className='auth-title'>REGISTRARSE</h2>
//       <form onSubmit={handleRegister} className='auth-form'>
//         <div className='input-group'>
//           <label htmlFor='email'>EMAIL:</label>
//           <input
//             id='email'
//             type='email'
//             placeholder='Ingrese su correo'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className='input-group'>
//           <label htmlFor='password'>CONTRASEÑA:</label>
//           <input
//             id='password'
//             type='password'
//             placeholder='Ingrese su contraseña'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type='submit'>REGISTRARSE</button>
//       </form>

//       <p className='call-to-action'>¿Ya tienes cuenta?</p>
//       <button onClick={() => navigate('/login')}>Iniciar sesión</button>
//     </div>
//   )
// }

// export default RegisterService

// ********************************************************************************

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'
import '../styles/login-register.css'

const RegisterService = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // ⚠️ Estado para errores
  const navigate = useNavigate()

  // 🔍 Validar email con expresión regular
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // 🔍 Validar contraseña (mínimo 6 caracteres)
  const isValidPassword = (password: string) => {
    return password.length >= 6
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null) // Limpiar errores previos

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
      // Crea el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      // Crea el documento del usuario en Firestore
      const userRef = doc(db, 'app-users', user.uid)
      await setDoc(userRef, {
        email: email,
        role: 'patient', // Rol por defecto
        createdAt: Timestamp.now(), // Fecha y hora de creación
        updatedAt: null, // Inicialmente nulo, se actualizará en el futuro
        status: 'pending' // Estado inicial del usuario
      })

      console.log('Usuario registrado correctamente')
      navigate('/') // Redirige a la página de inicio
    } catch (error: unknown) {
      console.error('Error durante el registro:', error)

      // ✅ Verificar si el error es de Firebase y tiene `code`
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
      {/* ⚠️ Mostrar errores */}
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
