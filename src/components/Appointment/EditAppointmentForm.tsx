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


import { useEffect, useState } from 'react'
import { db } from '../../config/firebase-config'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc
} from 'firebase/firestore'
import { useAuth } from '../../contexts/UseAuth'
import { useNavigate } from 'react-router-dom'
import { Appointment } from '../types'
import '../../styles/OnlineDating.css'

const DatingOptions = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patientsMap, setPatientsMap] = useState<{ [key: string]: string }>({}) // 🔥 Mapa de pacientes
  const { currentUser, userData } = useAuth()
  const navigate = useNavigate()

  console.log('🔍 OnlineDating - Usuario autenticado:', currentUser?.email)
  console.log('🔍 OnlineDating - Rol del usuario:', userData?.role)

  useEffect(() => {
    const fetchAppointments = async () => {
      if (currentUser) {
        console.log('ℹ️ Buscando citas en Firestore...')

        let q
        if (userData?.role === 'admin') {
          q = query(collection(db, 'appointments')) // 🔥 ADMIN obtiene todas las citas
        } else if (userData?.role === 'patient') {
          q = query(
            collection(db, 'appointments'),
            where('patientId', '==', currentUser.uid)
          ) // 🔥 PATIENT obtiene solo sus citas
        }

        if (q) {
          const querySnapshot = await getDocs(q)
          const appointmentsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })) as Appointment[]

          setAppointments(appointmentsData)
          console.log('✅ Citas obtenidas:', appointmentsData)

          // 🔥 Obtener nombres de pacientes para citas de admin
          if (userData?.role === 'admin') {
            const uniquePatientIds = [
              ...new Set(appointmentsData.map((appt) => appt.patientId))
            ]
            const patientsData: { [key: string]: string } = {}

            for (const patientId of uniquePatientIds) {
              const patientQuerySnapshot = await getDocs(
                query(collection(db, 'patients'), where('id', '==', patientId))
              )
              if (!patientQuerySnapshot.empty) {
                patientsData[patientId] =
                  patientQuerySnapshot.docs[0].data().fullName
              } else {
                patientsData[patientId] = 'Desconocido'
              }
            }

            setPatientsMap(patientsData)
            console.log('✅ Mapa de pacientes cargado:', patientsData)
          }
        }
      }
    }

    fetchAppointments()
  }, [currentUser, userData])

  // 🔥 Función para actualizar el estado de la cita en Firestore
  const updateAppointmentStatus = async (
    appointmentId: string,
    newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  ) => {
    try {
      const appointmentRef = doc(db, 'appointments', appointmentId)
      await updateDoc(appointmentRef, { status: newStatus })
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === appointmentId ? { ...appt, status: newStatus } : appt
        )
      )
      console.log(`✅ Cita ${appointmentId} actualizada a estado: ${newStatus}`)
    } catch (error) {
      console.error('❌ Error actualizando la cita:', error)
    }
  }

  return (
    <div className='dating-options'>
      {userData?.role === 'admin' || userData?.role === 'patient' ? (
        <>
          {/* 🔥 TABLA DE CITAS (ADMIN y PATIENT) */}
          <div className='dating-options__table-container'>
            {appointments.length > 0 ? (
              <table className='dating-options__table'>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    {userData?.role === 'admin' && <th>Paciente</th>}{' '}
                    {/* 🔥 Solo admin ve este campo */}
                    <th>Dentista</th>
                    <th>Tratamiento</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.date.toDate().toLocaleDateString()}</td>
                      <td>{appointment.date.toDate().toLocaleTimeString()}</td>
                      {userData?.role === 'admin' && (
                        <td>
                          {patientsMap[appointment.patientId] || 'Cargando...'}
                        </td> // 🔥 Muestra nombre del paciente
                      )}
                      <td>{appointment.dentistId}</td>
                      <td>{appointment.treatment}</td>
                      <td>{appointment.status}</td>
                      <td>
                        <button
                          className='dating-options__action-button'
                          onClick={() =>
                            navigate(`/edit-appointment/${appointment.id}`)
                          }
                        >
                          Modificar
                        </button>
                        {userData?.role === 'admin' &&
                          appointment.status === 'pending' && (
                            <>
                              <button
                                className='dating-options__action-button confirm'
                                onClick={() =>
                                  updateAppointmentStatus(
                                    appointment.id,
                                    'confirmed'
                                  )
                                }
                              >
                                Aprobar
                              </button>
                              <button
                                className='dating-options__action-button cancel'
                                onClick={() =>
                                  updateAppointmentStatus(
                                    appointment.id,
                                    'cancelled'
                                  )
                                }
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='dating-options__no-users'>
                No existen citas registradas
              </div>
            )}
          </div>

          {/* 🔥 SOLO LOS PACIENTES PUEDEN PEDIR CITA */}
          {userData?.role === 'patient' && (
            <div className='dating-options__buttons'>
              <button
                className='dating-options__button'
                onClick={() => navigate('/create-appointment')}
              >
                PEDIR CITA
              </button>
            </div>
          )}
        </>
      ) : (
        <div className='dating-options__no-profile-message'>
          <p className='dating-options__warning'>
            Por favor, crea tu perfil primero para poder gestionar tus citas.
          </p>
          <button
            className='dating-options__button'
            onClick={() => navigate('/create-profile')}
          >
            CREAR PERFIL
          </button>
        </div>
      )}
    </div>
  )
}

export default DatingOptions
