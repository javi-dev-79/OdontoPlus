// components/EditProfileForm.tsx
import React, { useState, useEffect } from 'react'
import { db } from '../../config/firebase-config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from '../../contexts/UseAuth'

const EditProfileForm: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [phone, setPhone] = useState('')
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        const docRef = doc(db, 'patients', currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setFullName(data.fullName)
          setDateOfBirth(data.dateOfBirth.toDate().toISOString().split('T')[0])
          setPhone(data.phone)
        }
      }
    }

    fetchProfile()
  }, [currentUser])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentUser) {
      const docRef = doc(db, 'patients', currentUser.uid)
      await updateDoc(docRef, {
        fullName,
        dateOfBirth: new Date(dateOfBirth),
        phone
      })
      alert('Perfil actualizado exitosamente')
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
      <button type='submit'>Actualizar Perfil</button>
    </form>
  )
}

export default EditProfileForm
