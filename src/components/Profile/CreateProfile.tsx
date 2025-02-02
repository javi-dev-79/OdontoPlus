// import React, { useState } from 'react'
// import { db } from '../../config/firebase-config'
// import { collection, addDoc } from 'firebase/firestore'
// import { useAuth } from '../../contexts/UseAuth'
// import { useNavigate } from 'react-router-dom'

// const CreateProfileForm = () => {
//   const [fullName, setFullName] = useState('')
//   const [dateOfBirth, setDateOfBirth] = useState('')
//   const [phone, setPhone] = useState('')
//   const { currentUser } = useAuth()
//   const navigate = useNavigate()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (currentUser) {
//       await addDoc(collection(db, 'patients'), {
//         id: currentUser.uid,
//         fullName,
//         dateOfBirth: new Date(dateOfBirth),
//         phone,
//         email: currentUser.email,
//         appointments: []
//       })
//       console.log('Perfil creado correctamente')
//       alert('Perfil creado exitosamente')
//       navigate('/online-dating') // Redirigir a la página de citas en línea
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Nombre completo:
//         <input
//           type='text'
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Fecha de nacimiento:
//         <input
//           type='date'
//           value={dateOfBirth}
//           onChange={(e) => setDateOfBirth(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Teléfono:
//         <input
//           type='text'
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//       </label>
//       <button type='submit'>Crear Perfil</button>
//     </form>
//   )
// }

// export default CreateProfileForm

// **************************************************************************


import React, { useState } from 'react'
import { db } from '../../config/firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import { useAuth } from '../../contexts/UseAuth'
import { useNavigate } from 'react-router-dom'
import '../../styles/ProfileForms.css'

const CreateProfileForm = () => {
  const [fullName, setFullName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [phone, setPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^[0-9]{9,15}$/ // Solo números, entre 9 y 15 dígitos
    return phoneRegex.test(phone)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null) // Limpiar errores previos

    if (!isValidPhone(phone)) {
      setErrorMessage(
        'El número de teléfono debe contener entre 9 y 15 dígitos numéricos.'
      )
      return
    }

    if (currentUser) {
      await addDoc(collection(db, 'patients'), {
        id: currentUser.uid,
        fullName,
        dateOfBirth: new Date(dateOfBirth),
        phone,
        email: currentUser.email,
        appointments: []
      })

      console.log('Perfil creado correctamente')
      navigate('/online-dating') // Redirigir a la página de citas en línea
    }
  }

  return (
    <div className='profile-form-container'>
      <h2 className='profile-form-title'>CREAR PERFIL</h2>

      {errorMessage && (
        <p className='profile-form-message error'>{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className='profile-form'>
        <label>
          Nombre completo:
          <input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <label>
          Fecha de nacimiento:
          <input
            type='date'
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </label>
        <label>
          Teléfono:
          <input
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <button type='submit'>CREAR</button>
        <button
          type='button'
          className='btn-cancel'
          onClick={() => navigate('/')}
        >
          CANCELAR
        </button>
      </form>
    </div>
  )
}

export default CreateProfileForm
