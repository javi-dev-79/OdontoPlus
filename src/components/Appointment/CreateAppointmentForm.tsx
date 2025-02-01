// // components/CreateAppointmentForm.tsx
// import React, { useState } from 'react'
// import { db } from '../../config/firebase-config'
// import { collection, addDoc, Timestamp } from 'firebase/firestore'
// import { useAuth } from '../../contexts/UseAuth'

// const CreateAppointmentForm: React.FC = () => {
//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [dentistId, setDentistId] = useState('')
//   const [treatment, setTreatment] = useState('')
//   const { currentUser } = useAuth()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (currentUser) {
//       const appointmentDate = new Date(`${date}T${time}`)
//       await addDoc(collection(db, 'appointments'), {
//         patientId: currentUser.uid,
//         dentistId,
//         date: Timestamp.fromDate(appointmentDate),
//         treatment,
//         status: 'pendiente',
//         notes: '',
//         createdAt: Timestamp.now(),
//         updatedAt: Timestamp.now()
//       })
//       alert('Cita creada exitosamente')
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Fecha:
//         <input
//           type='date'
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Hora:
//         <input
//           type='time'
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Dentista:
//         <input
//           type='text'
//           value={dentistId}
//           onChange={(e) => setDentistId(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Tratamiento:
//         <input
//           type='text'
//           value={treatment}
//           onChange={(e) => setTreatment(e.target.value)}
//           required
//         />
//       </label>
//       <button type='submit'>Pedir Cita</button>
//     </form>
//   )
// }

// export default CreateAppointmentForm

import React, { useState, useEffect } from 'react'
import { db } from '../../config/firebase-config'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { useAuth } from '../../contexts/UseAuth'
import { Dentist } from '../types'

const CreateAppointmentForm: React.FC = () => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [dentistId, setDentistId] = useState('')
  const [treatment, setTreatment] = useState('')
  const [dentists, setDentists] = useState<Dentist[]>([]) // Aquí almacenaremos los dentistas
  const { currentUser } = useAuth()

  // Obtener la lista de dentistas desde Firestore
  useEffect(() => {
    const fetchDentists = async () => {
      const querySnapshot = await getDocs(collection(db, 'dentists'))
      const dentistsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Dentist[] // Aseguramos que los datos sean del tipo Dentist
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
        status: 'pendiente',
        notes: '',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      alert('Cita creada exitosamente')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Fecha:
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Hora:
        <input
          type='time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </label>
      <label>
        Dentista:
        <select
          value={dentistId}
          onChange={(e) => setDentistId(e.target.value)}
          required
        >
          <option value=''>Seleccionar Dentista</option>
          {dentists.map((dentist) => (
            <option key={dentist.id} value={dentist.id}>
              {dentist.fullName} - {dentist.specialty}{' '}
              {/* Muestra nombre y especialidad */}
            </option>
          ))}
        </select>
      </label>
      <label>
        Tratamiento:
        <input
          type='text'
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          required
        />
      </label>
      <button type='submit'>Pedir Cita</button>
    </form>
  )
}

export default CreateAppointmentForm
