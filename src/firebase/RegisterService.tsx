// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { doc, setDoc } from 'firebase/firestore'
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

//       // Crea el documento del usuario en Firestore
//       const userRef = doc(db, 'users', user.uid)
//       await setDoc(userRef, {
//         email: email,
//         role: 'patient' // Rol por defecto para nuevos usuarios
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

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
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

      // Crea el documento del usuario en Firestore con los nuevos campos
      const userRef = doc(db, 'users', user.uid)
      await setDoc(userRef, {
        email: email,
        role: 'patient', // Rol por defecto
        createdAt: Timestamp.now(), // Fecha y hora de creación
        updatedAt: null, // Inicialmente nulo, se actualizará en el futuro
        status: 'pending' // Estado inicial del usuario
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
