// import React, { useState } from 'react'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '../config/firebase-config'
// import registerUser from '../utils/RegisterUser'
// import { useNavigate } from 'react-router-dom'

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
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       )
//       await registerUser(userCredential.user.uid, email)
//       navigate('/login')
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Error durante el registro')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow'>
//       <h2 className='text-2xl font-bold mb-6'>Registro</h2>
//       {error && (
//         <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
//           {error}
//         </div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div className='mb-4'>
//           <label className='block text-gray-700 text-sm font-bold mb-2'>
//             Email
//           </label>
//           <input
//             type='email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className='w-full px-3 py-2 border rounded-lg'
//             required
//           />
//         </div>
//         <div className='mb-6'>
//           <label className='block text-gray-700 text-sm font-bold mb-2'>
//             Contraseña
//           </label>
//           <input
//             type='password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className='w-full px-3 py-2 border rounded-lg'
//             required
//           />
//         </div>
//         <button
//           type='submit'
//           disabled={loading}
//           className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300'
//         >
//           {loading ? 'Registrando...' : 'Registrarse'}
//         </button>
//       </form>
//     </div>
//   )
// }

// export default RegisterService




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
//       navigate('/login') // Redirigir al Login después de registrarse
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Error durante el registro')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className='auth-container'>
//       <h2>REGISTRO</h2>
//       {error && <div className='error-message'>{error}</div>}
//       <form onSubmit={handleSubmit} className='auth-form'>
//         <input
//           type='email'
//           placeholder='Email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type='password'
//           placeholder='Contraseña'
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type='submit' disabled={loading}>
//           {loading ? 'Registrando...' : 'Registrarse'}
//         </button>
//       </form>

//       <p>¿Ya tienes cuenta?</p>
//       <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
//     </div>
//   )
// }

// export default RegisterService



import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase-config'
import { useNavigate } from 'react-router-dom'
import '../styles/login-register.css'

const RegisterService = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error durante el registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-container'>
      <h2 className='auth-title'>REGISTRO</h2>
      {error && <div className='error-message'>{error}</div>}
      <form onSubmit={handleSubmit} className='auth-form'>
        <div className='input-group'>
          <label htmlFor='register-email'>EMAIL:</label>
          <input
            id='register-email'
            type='email'
            placeholder='Ingrese su correo'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='register-password'>CONTRASEÑA:</label>
          <input
            id='register-password'
            type='password'
            placeholder='Ingrese su contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'REGISTRANDO...' : 'REGISTRARSE'}
        </button>
      </form>

      <p className='call-to-action'>¿Ya tienes cuenta?</p>
      <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
    </div>
  )
}

export default RegisterService
