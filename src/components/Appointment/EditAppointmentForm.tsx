// // components/EditAppointmentForm.tsx
// import React, { useState, useEffect } from 'react'
// import { db } from '../../config/firebase-config'
// import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore'

// const EditAppointmentForm: React.FC<{ appointmentId: string }> = ({
//   appointmentId
// }) => {
//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [dentistId, setDentistId] = useState('')
//   const [treatment, setTreatment] = useState('')
//   const [status, setStatus] = useState('')

//   useEffect(() => {
//     const fetchAppointment = async () => {
//       const docRef = doc(db, 'appointments', appointmentId)
//       const docSnap = await getDoc(docRef)
//       if (docSnap.exists()) {
//         const data = docSnap.data()
//         const appointmentDate = data.date.toDate()
//         setDate(appointmentDate.toISOString().split('T')[0])
//         setTime(appointmentDate.toTimeString().split(' ')[0])
//         setDentistId(data.dentistId)
//         setTreatment(data.treatment)
//         setStatus(data.status)
//       }
//     }

//     fetchAppointment()
//   }, [appointmentId])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const appointmentDate = new Date(`${date}T${time}`)
//     await updateDoc(doc(db, 'appointments', appointmentId), {
//       date: Timestamp.fromDate(appointmentDate),
//       dentistId,
//       treatment,
//       status,
//       updatedAt: Timestamp.now()
//     })
//     alert('Cita actualizada exitosamente')
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
//       <label>
//         Estado:
//         <select value={status} onChange={(e) => setStatus(e.target.value)}>
//           <option value='pendiente'>Pendiente</option>
//           <option value='confirmada'>Confirmada</option>
//           <option value='cancelada'>Cancelada</option>
//         </select>
//       </label>
//       <button type='submit'>Actualizar Cita</button>
//     </form>
//   )
// }

// export default EditAppointmentForm

import React, { useState, useEffect } from 'react'
import { db } from '../../config/firebase-config'
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { Dentist } from '../OnlineDating/types'

const EditAppointmentForm: React.FC<{ appointmentId: string }> = ({
  appointmentId
}) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [dentistId, setDentistId] = useState('')
  const [treatment, setTreatment] = useState('')
  const [status, setStatus] = useState('')
  const [dentists, setDentists] = useState<Dentist[]>([]) // Aquí almacenaremos los dentistas

  // Obtener los dentistas de Firestore
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

  // Obtener la cita específica a editar
  useEffect(() => {
    const fetchAppointment = async () => {
      const docRef = doc(db, 'appointments', appointmentId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        const appointmentDate = data.date.toDate()
        setDate(appointmentDate.toISOString().split('T')[0])
        setTime(appointmentDate.toTimeString().split(' ')[0])
        setDentistId(data.dentistId)
        setTreatment(data.treatment)
        setStatus(data.status)
      }
    }

    fetchAppointment()
  }, [appointmentId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const appointmentDate = new Date(`${date}T${time}`)
    await updateDoc(doc(db, 'appointments', appointmentId), {
      date: appointmentDate,
      dentistId,
      treatment,
      status,
      updatedAt: new Date()
    })
    alert('Cita actualizada exitosamente')
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
      <label>
        Estado:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value='pendiente'>Pendiente</option>
          <option value='confirmada'>Confirmada</option>
          <option value='cancelada'>Cancelada</option>
        </select>
      </label>
      <button type='submit'>Actualizar Cita</button>
    </form>
  )
}

export default EditAppointmentForm
