import React, { useState, useEffect } from 'react'
import { db } from '../../config/firebase-config'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { useAuth } from '../../contexts/UseAuth'
import { Dentist } from '../types'
import { useNavigate } from 'react-router-dom'

const CreateAppointmentForm: React.FC = () => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [dentistId, setDentistId] = useState('')
  const [treatment, setTreatment] = useState('')
  const [dentists, setDentists] = useState<Dentist[]>([])
  const { currentUser } = useAuth()
  const navigate = useNavigate() // ✅ Agregamos el hook useNavigate

  useEffect(() => {
    const fetchDentists = async () => {
      const querySnapshot = await getDocs(collection(db, 'dentists'))
      const dentistsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Dentist[]
      setDentists(dentistsData)
    }

    fetchDentists()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentUser) {
      const appointmentDate = new Date(`${date}T${time}`)
      await addDoc(collection(db, 'appointments'), {
        patientId: currentUser.uid,
        dentistId,
        date: appointmentDate,
        treatment,
        status: 'pending',
        notes: '',
        createdAt: new Date(),
        updatedAt: new Date()
      })

      console.log('Cita creada exitosamente') // ✅ Reemplazo alert por console.log

      navigate('/online-dating') // ✅ Redirige después de crear la cita
    }
  }

  return (
    <div className='create-appointment-container'>
      <form onSubmit={handleSubmit} className='create-appointment'>
        <h2 className='create-appointment__title'>Pedir Cita</h2>

        <label className='create-appointment__label'>
          Fecha:
          <input
            type='date'
            className='create-appointment__input'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label className='create-appointment__label'>
          Hora:
          <input
            type='time'
            className='create-appointment__input'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>

        <label className='create-appointment__label'>
          Dentista:
          <select
            className='create-appointment__select'
            value={dentistId}
            onChange={(e) => setDentistId(e.target.value)}
            required
          >
            <option value=''>Seleccionar Dentista</option>
            {dentists.map((dentist) => (
              <option key={dentist.id} value={dentist.id}>
                {dentist.fullName} - {dentist.specialty}
              </option>
            ))}
          </select>
        </label>

        <label className='create-appointment__label'>
          Tratamiento:
          <input
            type='text'
            className='create-appointment__input'
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            required
          />
        </label>

        <button type='submit' className='create-appointment__button'>
          PEDIR CITA
        </button>
      </form>
    </div>
  )
}

export default CreateAppointmentForm
