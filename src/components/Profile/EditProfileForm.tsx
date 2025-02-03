import React, { useState, useEffect } from 'react'
import { db } from '../../config/firebase-config'
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Timestamp } from 'firebase/firestore'
import { useAuth } from '../../contexts/UseAuth'
import '../../styles/ProfileForms.css'

interface Patient {
  fullName: string
  dateOfBirth: Timestamp
  phone: string
  email: string
  appointments: string[]
}

const EditProfileForm: React.FC = () => {
  const { currentUser } = useAuth()
  const [patientId, setPatientId] = useState<string | null>(null)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [fullName, setFullName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [phone, setPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) {
        setErrorMessage('No hay un usuario autenticado.')
        return
      }

      try {
        console.log(`Buscando perfil donde id == ${currentUser.uid}`)

        const q = query(
          collection(db, 'patients'),
          where('id', '==', currentUser.uid)
        )
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0]
          const data = docSnapshot.data() as Patient

          setPatientId(docSnapshot.id)
          setPatient(data)

          setFullName(data.fullName || '')
          setPhone(data.phone || '')
          setDateOfBirth(
            data.dateOfBirth
              ? data.dateOfBirth.toDate().toISOString().split('T')[0]
              : ''
          )

          console.log('Perfil encontrado:', data)
        } else {
          console.warn(
            `No se encontró un perfil en Firestore para el usuario ${currentUser.uid}`
          )
          setErrorMessage('No se encontró un perfil en la base de datos.')
        }
      } catch (error) {
        console.error('Error al obtener el perfil:', error)
        setErrorMessage('Hubo un error al obtener los datos del perfil.')
      }
    }

    fetchProfile()
  }, [currentUser])

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^[0-9]{9,15}$/
    return phoneRegex.test(phone)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)

    if (!isValidPhone(phone)) {
      setErrorMessage(
        'El número de teléfono debe contener entre 9 y 15 dígitos numéricos.'
      )
      return
    }

    if (patientId) {
      const docRef = doc(db, 'patients', patientId)

      try {
        await updateDoc(docRef, {
          fullName,
          phone,
          dateOfBirth: Timestamp.fromDate(new Date(dateOfBirth))
        })

        console.log('Perfil actualizado correctamente')
        setSuccessMessage('Perfil actualizado exitosamente')
      } catch (error) {
        console.error('Error al actualizar el perfil:', error)
        setErrorMessage('Ocurrió un error al actualizar el perfil.')
      }
    }
  }


  return (
    <div className='profile-form-container'>
      <h2 className='profile-form-title'>EDITAR PERFIL</h2>

      {errorMessage && (
        <p className='profile-form-message error'>{errorMessage}</p>
      )}
      {successMessage && (
        <p className='profile-form-message success'>{successMessage}</p>
      )}

      {patient ? (
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
          <button type='submit'>ACTUALIZAR PERFIL</button>
          <button
            type='button'
            className='btn-cancel'
            onClick={() => navigate('/online-dating')}
          >
            CANCELAR
          </button>
        </form>
      ) : (
        <p className='profile-form-message error'>
          {errorMessage || 'Cargando datos...'}
        </p>
      )}
    </div>
  )
}

export default EditProfileForm
