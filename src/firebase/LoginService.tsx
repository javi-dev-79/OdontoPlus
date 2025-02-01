// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '../config/firebase-config'
// import '../styles/login-register.css'

// const LoginService = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault() // Evita que el formulario se recargue
//     try {
//       await signInWithEmailAndPassword(auth, email, password)
//       console.log('Login exitoso')

//       // Redirige inmediatamente después del inicio de sesión
//       navigate('/')
//     } catch (error) {
//       console.error('Error durante el login:', error)
//     }
//   }

//   return (
//     <div className='auth-container'>
//       <h2 className='auth-title'>INICIAR SESIÓN</h2>
//       <form onSubmit={(e) => handleLogin(e)} className='auth-form'>
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
//         <button type='submit'>ACEPTAR</button>
//       </form>

//       <p className='call-to-action'>¿No tienes cuenta?</p>
//       <button onClick={() => navigate('/register')}>Registrarse</button>
//     </div>
//   )
// }

// export default LoginService

// **************************************************************************************

// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '../config/firebase-config'
// import { doc, getDoc } from 'firebase/firestore' // Importa Firestore
// import { db } from '../config/firebase-config' // Importa la instancia de Firestore
// import '../styles/login-register.css'

// const LoginService = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault() // Evita que el formulario se recargue
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       )
//       const user = userCredential.user

//       // Verifica si el usuario es administrador
//       const userRef = doc(db, 'users', user.uid) // Referencia al documento del usuario
//       const userDoc = await getDoc(userRef)

//       if (userDoc.exists()) {
//         const userData = userDoc.data()
//         const isAdmin = userData.role === 'admin' // Verifica el rol del usuario

//         // Redirige según el rol del usuario
//         if (isAdmin) {
//           navigate('/admin-panel') // Redirige al panel de administración
//         } else {
//           navigate('/') // Redirige a la página de inicio
//         }
//       } else {
//         console.error('No se encontraron datos del usuario')
//         navigate('/') // Redirige a la página de inicio por defecto
//       }
//     } catch (error) {
//       console.error('Error durante el login:', error)
//     }
//   }

//   return (
//     <div className='auth-container'>
//       <h2 className='auth-title'>INICIAR SESIÓN</h2>
//       <form onSubmit={(e) => handleLogin(e)} className='auth-form'>
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
//         <button type='submit'>ACEPTAR</button>
//       </form>

//       <p className='call-to-action'>¿No tienes cuenta?</p>
//       <button onClick={() => navigate('/register')}>Registrarse</button>
//     </div>
//   )
// }

// export default LoginService

// **************************************************************************************

// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { doc, getDoc } from 'firebase/firestore'
// import { auth, db } from '../config/firebase-config'
// import '../styles/login-register.css'

// const LoginService = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   const fetchUserData = async (uid: string) => {
//     const userRef = doc(db, 'users', uid)
//     const userDoc = await getDoc(userRef)

//     if (userDoc.exists()) {
//       console.log('Datos del usuario:', userDoc.data())
//       return userDoc.data() // Retorna los datos del usuario
//     } else {
//       console.error('No se encontraron datos del usuario')
//       return null
//     }
//   }

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       )
//       const user = userCredential.user

//       // Obtén los datos del usuario desde Firestore
//       const userData = await fetchUserData(user.uid)

//       if (userData) {
//         // Redirige según el rol del usuario
//         if (userData.role === 'admin') {
//           navigate('/admin-panel')
//         } else {
//           navigate('/')
//         }
//       } else {
//         console.error('No se encontraron datos del usuario')
//         navigate('/') // Redirige a la página de inicio por defecto
//       }
//     } catch (error) {
//       console.error('Error durante el login:', error)
//     }
//   }

//   return (
//     <div className='auth-container'>
//       <h2 className='auth-title'>INICIAR SESIÓN</h2>
//       <form onSubmit={handleLogin} className='auth-form'>
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
//         <button type='submit'>ACEPTAR</button>
//       </form>

//       <p className='call-to-action'>¿No tienes cuenta?</p>
//       <button onClick={() => navigate('/register')}>Registrarse</button>
//     </div>
//   )
// }

// export default LoginService

// ****************************************************************************************

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'
import '../styles/login-register.css'

const LoginService = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      // Obtén el documento del usuario en Firestore
      const userRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()
        const role = userData.role // Obtén el rol del usuario

        // Redirige según el rol del usuario
        if (role === 'admin') {
          navigate('/admin-panel') // Redirige al panel de administración
        } else {
          navigate('/') // Redirige a la página de inicio para pacientes
        }
      } else {
        console.error('No se encontraron datos del usuario')
        navigate('/') // Redirige a la página de inicio por defecto
      }
    } catch (error) {
      console.error('Error durante el login:', error)
    }
  }

  return (
    <div className='auth-container'>
      <h2 className='auth-title'>INICIAR SESIÓN</h2>
      <form onSubmit={handleLogin} className='auth-form'>
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
