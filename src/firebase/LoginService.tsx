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

      console.log(`✅ Login exitoso: ${user.email} | ${user.uid}`)

      const userRef = doc(db, 'app-users', user.uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()
        const role = userData.role 

        console.log(`ℹ️ Role obtenido de Firestore: ${role}`)

        if (role === 'admin') {
          console.log('🔹 Redirigiendo a /admin-panel')
          navigate('/admin-panel') 
        } else if (role === 'patient') {
          console.log('🔹 Redirigiendo a página de inicio /')
          navigate('/') 
        } else {
          console.error(`⚠️ Rol desconocido: ${role}`)
          navigate('/') 
        }
      } else {
        console.error('⚠️ No se encontraron datos del usuario en Firestore')
        navigate('/') 
      }
    } catch (error) {
      console.error('❌ Error durante el login:', error)
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
