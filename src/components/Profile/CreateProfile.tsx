import React, { useState } from 'react'
import { db } from '../../config/firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import { useAuth } from '../../contexts/UseAuth'
import { useNavigate } from 'react-router-dom'

const CreateProfileForm = () => {
  const [fullName, setFullName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [phone, setPhone] = useState('')
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      alert('Perfil creado exitosamente')
      navigate('/online-dating') // Redirigir a la página de citas en línea
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <button type='submit'>Crear Perfil</button>
    </form>
  )
}

export default CreateProfileForm
