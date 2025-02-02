// import { useEffect, useState } from 'react'
// import { db } from '../../config/firebase-config'
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   updateDoc,
//   deleteDoc
// } from 'firebase/firestore'
// import { useAuth } from '../../contexts/UseAuth'
// import { useNavigate } from 'react-router-dom'
// import { Appointment, Dentist } from '../types'
// import '../../styles/online-dating.css'

// const DatingOptions = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [patientsMap, setPatientsMap] = useState<{ [key: string]: string }>({})
//   const [dentistsMap, setDentistsMap] = useState<{ [key: string]: string }>({})
//   const [dentists, setDentists] = useState<Dentist[]>([])
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [dentistToDelete, setDentistToDelete] = useState<string | null>(null)
//   const { currentUser, userData } = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       if (currentUser) {
//         const q =
//           userData?.role === 'admin'
//             ? query(collection(db, 'appointments'))
//             : query(
//                 collection(db, 'appointments'),
//                 where('patientId', '==', currentUser.uid)
//               )

//         const querySnapshot = await getDocs(q)
//         const appointmentsData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data()
//         })) as Appointment[]

//         setAppointments(appointmentsData)

//         const uniquePatientIds = [
//           ...new Set(appointmentsData.map((appt) => appt.patientId))
//         ]
//         const uniqueDentistIds = [
//           ...new Set(appointmentsData.map((appt) => appt.dentistId))
//         ]

//         const patientsData: { [key: string]: string } = {}
//         const dentistsData: { [key: string]: string } = {}

//         for (const patientId of uniquePatientIds) {
//           const patientSnapshot = await getDocs(
//             query(collection(db, 'patients'), where('id', '==', patientId))
//           )
//           patientsData[patientId] = patientSnapshot.empty
//             ? 'Desconocido'
//             : patientSnapshot.docs[0].data().fullName
//         }

//         for (const dentistId of uniqueDentistIds) {
//           const dentistSnapshot = await getDocs(
//             query(collection(db, 'dentists'), where('id', '==', dentistId))
//           )
//           dentistsData[dentistId] = dentistSnapshot.empty
//             ? 'Desconocido'
//             : dentistSnapshot.docs[0].data().fullName
//         }

//         setPatientsMap(patientsData)
//         setDentistsMap(dentistsData)
//       }
//     }

//     fetchAppointments()
//   }, [currentUser, userData])

//   useEffect(() => {
//     const fetchDentists = async () => {
//       const querySnapshot = await getDocs(collection(db, 'dentists'))
//       setDentists(
//         querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data()
//         })) as Dentist[]
//       )
//     }

//     fetchDentists()
//   }, [])

//   const updateAppointmentStatus = async (
//     appointmentId: string,
//     newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed'
//   ) => {
//     const appointmentRef = doc(db, 'appointments', appointmentId)
//     await updateDoc(appointmentRef, { status: newStatus })
//     setAppointments((prevAppointments) =>
//       prevAppointments.map((appt) =>
//         appt.id === appointmentId ? { ...appt, status: newStatus } : appt
//       )
//     )
//   }

//   const deleteDentist = async () => {
//     if (dentistToDelete) {
//       await deleteDoc(doc(db, 'dentists', dentistToDelete))
//       setDentists(dentists.filter((dentist) => dentist.id !== dentistToDelete))
//       setShowDeleteModal(false)
//     }
//   }

//   return (
//     <div className='dating-options'>
//       <h2 className='dating-options__title'>
//         {userData?.role === 'admin' ? 'GESTIÓN DE CITAS' : 'MIS CITAS'}
//       </h2>

//       {/* TABLA DE CITAS */}
//       <div className='dating-options__table-container'>
//         {appointments.length > 0 ? (
//           <table className='dating-options__table'>
//             <thead>
//               <tr>
//                 <th>Fecha</th>
//                 <th>Hora</th>
//                 <th>Paciente</th>
//                 <th>Dentista</th>
//                 <th>Tratamiento</th>
//                 <th>Estado</th>
//                 <th>Acciones</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.map((appointment) => (
//                 <tr key={appointment.id}>
//                   <td>{appointment.date.toDate().toLocaleDateString()}</td>
//                   <td>{appointment.date.toDate().toLocaleTimeString()}</td>
//                   <td>{patientsMap[appointment.patientId] || 'Cargando...'}</td>
//                   <td>{dentistsMap[appointment.dentistId] || 'Cargando...'}</td>
//                   <td>{appointment.treatment}</td>
//                   <td>{appointment.status}</td>
//                   <td>
//                     {userData?.role === 'admin' &&
//                       appointment.status === 'pending' && (
//                         <>
//                           <button
//                             className='btn btn--confirm'
//                             onClick={() =>
//                               updateAppointmentStatus(
//                                 appointment.id,
//                                 'confirmed'
//                               )
//                             }
//                           >
//                             Aprobar
//                           </button>
//                           <button
//                             className='btn btn--cancel'
//                             onClick={() =>
//                               updateAppointmentStatus(
//                                 appointment.id,
//                                 'cancelled'
//                               )
//                             }
//                           >
//                             Cancelar
//                           </button>
//                         </>
//                       )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No existen citas registradas.</p>
//         )}
//       </div>

//       {/* 🔹 Nuevo botón "PEDIR CITA" */}
//       {userData?.role === 'patient' && (
//         <div className='dating-options__appointment-button-container'>
//           <button
//             className='dating-options__appointment-button'
//             onClick={() => navigate('/create-appointment')}
//           >
//             PEDIR CITA
//           </button>
//         </div>
//       )}

//       {/* TABLA DE DENTISTAS (SOLO PARA PATIENT) */}
//       {userData?.role === 'patient' && dentists.length > 0 && (
//         <div className='dating-options__table-container'>
//           <h2 className='dating-options__table-title'>
//             Lista de Dentistas Disponibles
//           </h2>
//           <table className='dating-options__table'>
//             <thead>
//               <tr>
//                 <th>Nombre</th>
//                 <th>Especialidad</th>
//                 <th>Biografía</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dentists.map((dentist) => (
//                 <tr key={dentist.id}>
//                   <td>{dentist.fullName}</td>
//                   <td>{dentist.specialty}</td>
//                   <td>{dentist.biography}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* GESTIÓN DE DENTISTAS (SOLO PARA ADMIN) */}
//       {userData?.role === 'admin' && (
//         <div>
//           <h2 className='dating-options__admin-title'>GESTIÓN DE DENTISTAS</h2>
//           <button className='' onClick={() => navigate('/add-dentist')}>
//             AGREGAR DENTISTA
//           </button>
//           <div className='dating-options__table-container'>
//             <table className='dating-options__table'>
//               <thead>
//                 <tr>
//                   <th>Nombre</th>
//                   <th>Especialidad</th>
//                   <th>Acciones</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {dentists.map((dentist) => (
//                   <tr key={dentist.id}>
//                     <td>{dentist.fullName}</td>
//                     <td>{dentist.specialty}</td>
//                     <td>
//                       <button
//                         className='btn btn--edit'
//                         onClick={() => navigate(`/edit-dentist/${dentist.id}`)}
//                       >
//                         EDITAR
//                       </button>
//                       <button
//                         className='btn btn--delete'
//                         onClick={() => {
//                           setShowDeleteModal(true)
//                           setDentistToDelete(dentist.id)
//                         }}
//                       >
//                         ELIMINAR
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* MODAL DE CONFIRMACIÓN */}
//       {showDeleteModal && (
//         <div className='dating-options__modal-overlay'>
//           <div className='dating-options__modal-content'>
//             <h2>¿Estás seguro?</h2>
//             <p>Esta acción no se puede deshacer.</p>
//             <div className='dating-options__modal-buttons'>
//               <button
//                 className='btn btn--modal-cancel'
//                 onClick={() => setShowDeleteModal(false)}
//               >
//                 Cancelar
//               </button>
//               <button
//                 className='btn btn--modal-confirm'
//                 onClick={deleteDentist}
//               >
//                 Confirmar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DatingOptions

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

  // Obtener la lista de dentistas desde Firestore
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

      navigate('/online-dating') // 🔹 Redirigir después de agendar la cita
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
