// import React, { useState } from 'react'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '../config/firebase-config'
// import { useNavigate } from 'react-router-dom'
// import '../styles/login-register.css'

// const RegisterService = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

//     try {
//       await createUserWithEmailAndPassword(auth, email, password)
//       navigate('/login')
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Error durante el registro')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className='auth-container'>
//       <h2 className='auth-title'>REGISTRO</h2>
//       {error && <div className='error-message'>{error}</div>}
//       <form onSubmit={handleSubmit} className='auth-form'>
//         <div className='input-group'>
//           <label htmlFor='register-email'>EMAIL:</label>
//           <input
//             id='register-email'
//             type='email'
//             placeholder='Ingrese su correo'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className='input-group'>
//           <label htmlFor='register-password'>CONTRASEÑA:</label>
//           <input
//             id='register-password'
//             type='password'
//             placeholder='Ingrese su contraseña'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type='submit' disabled={loading}>
//           {loading ? 'REGISTRANDO...' : 'REGISTRARSE'}
//         </button>
//       </form>

//       <p className='call-to-action'>¿Ya tienes cuenta?</p>
//       <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
//     </div>
//   )
// }

// export default RegisterService



// ****************************************************************************************



import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'
import '../styles/login-register.css'

const RegisterService = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Crea el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      // Crea el documento del usuario en Firestore
      const userRef = doc(db, 'users', user.uid)
      await setDoc(userRef, {
        email: email,
        role: 'patient' // Rol por defecto para nuevos usuarios
      })

      console.log('Usuario registrado correctamente')
      navigate('/') // Redirige a la página de inicio
    } catch (error) {
      console.error('Error durante el registro:', error)
    }
  }

  return (
    <div className='auth-container'>
      <h2 className='auth-title'>REGISTRARSE</h2>
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
            placeholder='Ingrese su contraseña'
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
