import React, { useState, useEffect } from 'react'
import { db } from '../../config/firebase-config'
import { addDoc, collection, getDocs, Timestamp } from 'firebase/firestore'
import { useAuth } from '../../contexts/UseAuth'
import { useNavigate } from 'react-router-dom'
import { Dentist } from '../types'
import '../../styles/AppointmentsForms.css'

const CreateAppointmentForm = () => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [dentistId, setDentistId] = useState('')
  const [treatment, setTreatment] = useState('')
  const [dentists, setDentists] = useState<Dentist[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'dentists'))
        const dentistsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Dentist[]
        setDentists(dentistsData)
      } catch (error) {
        console.error('Error al obtener la lista de dentistas:', error)
      }
    }
    fetchDentists()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!currentUser) {
      setErrorMessage('Debes iniciar sesión para agendar una cita.')
      return
    }

    if (!date || !time || !dentistId || !treatment) {
      setErrorMessage('Todos los campos son obligatorios.')
      return
    }

    try {
      const appointmentDate = new Date(`${date}T${time}`)

      await addDoc(collection(db, 'appointments'), {
        patientId: currentUser.uid,
        dentistId,
        date: Timestamp.fromDate(appointmentDate),
        treatment,
        status: 'pending',
        notes: '',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })

      navigate('/online-dating')
    } catch (error) {
      console.error('Error al agendar la cita:', error)
      setErrorMessage('Ocurrió un error al agendar la cita.')
    }
  }

  return (
    <div className='create-appointment-container'>
      <div className='create-appointment'>
        <h2 className='create-appointment__title'>PEDIR CITA</h2>

        {errorMessage && (
          <p className='create-appointment__message error'>{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className='create-appointment__form'>
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
    </div>
  )
}

export default CreateAppointmentForm
