// import { useEffect, useState } from 'react'
// import { db } from '../../config/firebase-config'
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   deleteDoc,
//   doc
// } from 'firebase/firestore'
// import { useAuth } from '../../contexts/UseAuth'
// import '../../styles/online-dating.css'
// import { Appointment, Patient } from './types'
// import { useNavigate } from 'react-router-dom'

// const DatingOptions = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [patient, setPatient] = useState<Patient | null>(null) // Ahora tiene el tipo correcto
//   const { currentUser } = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchPatientProfile = async () => {
//       if (currentUser) {
//         const q = query(
//           collection(db, 'patients'),
//           where('id', '==', currentUser.uid)
//         )
//         const querySnapshot = await getDocs(q)
//         if (!querySnapshot.empty) {
//           const patientData = querySnapshot.docs[0].data() as Patient // Se castea a Patient
//           setPatient(patientData)
//         } else {
//           setPatient(null)
//         }
//       }
//     }

//     const fetchAppointments = async () => {
//       if (currentUser && patient) {
//         const q = query(
//           collection(db, 'appointments'),
//           where('patientId', '==', currentUser.uid)
//         )
//         const querySnapshot = await getDocs(q)
//         const appointmentsData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data()
//         })) as Appointment[]
//         setAppointments(appointmentsData)
//       }
//     }

//     fetchPatientProfile()
//     fetchAppointments()
//   }, [currentUser, patient])

//   const handleCreateProfile = () => {
//     navigate('/create-profile')
//   }

//   const handleEditProfile = () => {
//     navigate('/edit-profile')
//   }

//   const handleDeleteProfile = async () => {
//     if (currentUser) {
//       try {
//         await deleteDoc(doc(db, 'patients', currentUser.uid)) // Se eliminan los datos del paciente
//         alert('Perfil eliminado exitosamente')
//         setPatient(null) // Se actualiza el estado
//       } catch (error) {
//         console.error('Error al eliminar el perfil:', error)
//       }
//     }
//   }

//   const handleCreateAppointment = () => {
//     navigate('/create-appointment')
//   }

//   const handleEditAppointment = (appointmentId: string) => {
//     navigate(`/edit-appointment/${appointmentId}`)
//   }

//   const handleDeleteAppointment = async (appointmentId: string) => {
//     try {
//       await deleteDoc(doc(db, 'appointments', appointmentId))
//       alert('Cita eliminada exitosamente')
//       setAppointments(appointments.filter((app) => app.id !== appointmentId))
//     } catch (error) {
//       console.error('Error al eliminar la cita:', error)
//     }
//   }

//   return (
//     <div className='dating-options'>
//       {patient ? (
//         <>
//           <div className='buttons'>
//             <button onClick={handleEditProfile}>EDITAR PERFIL</button>
//             <button onClick={handleDeleteProfile}>BORRAR PERFIL</button>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>Fecha</th>
//                 <th>Hora</th>
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
//                   <td>{appointment.dentistId}</td>
//                   <td>{appointment.treatment}</td>
//                   <td>{appointment.status}</td>
//                   <td>
//                     <button
//                       onClick={() => handleEditAppointment(appointment.id)}
//                     >
//                       Modificar
//                     </button>
//                     <button
//                       onClick={() => handleDeleteAppointment(appointment.id)}
//                     >
//                       Cancelar
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className='buttons'>
//             <button onClick={handleCreateAppointment}>PEDIR CITA</button>
//           </div>
//         </>
//       ) : (
//         <div className='no-profile-message'>
//           <p>
//             Por favor, crea tu perfil primero para poder gestionar tus citas.
//           </p>
//           <button onClick={handleCreateProfile}>CREAR PERFIL</button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DatingOptions

// *************************************************************************

import { useEffect, useState } from 'react'
import { db } from '../../config/firebase-config'
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { useAuth } from '../../contexts/UseAuth'
import '../../styles/online-dating.css'
import { Appointment, Dentist, Patient } from '../types'
import { useNavigate } from 'react-router-dom'

const DatingOptions = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patient, setPatient] = useState<Patient | null>(null)
  const [dentists, setDentists] = useState<Dentist[]>([])
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPatientProfile = async () => {
      if (currentUser) {
        const q = query(
          collection(db, 'patients'),
          where('id', '==', currentUser.uid)
        )
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          const patientData = querySnapshot.docs[0].data() as Patient // Se castea a Patient
          setPatient(patientData)
          console.log('Datos del paciente:', patientData) // Mostrar datos del paciente en la consola
        } else {
          setPatient(null)
          console.log(
            `El paciente ${currentUser.email} aún no ha creado un perfil`
          ) // Mostrar mensaje si no hay perfil
        }
      }
    }

    fetchPatientProfile()
  }, [currentUser])

  useEffect(() => {
    const fetchAppointments = async () => {
      if (currentUser && patient) {
        const q = query(
          collection(db, 'appointments'),
          where('patientId', '==', currentUser.uid)
        )
        const querySnapshot = await getDocs(q)
        const appointmentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Appointment[]
        setAppointments(appointmentsData)
        console.log('Datos de las citas:', appointmentsData) // Mostrar datos de las citas en la consola
      }
    }

    fetchAppointments()
  }, [currentUser, patient])

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

  const handleCreateProfile = () => {
    navigate('/create-profile')
  }

  const handleEditProfile = () => {
    navigate('/edit-profile')
  }

  const handleDeleteProfile = async () => {
    if (currentUser) {
      try {
        await deleteDoc(doc(db, 'patients', currentUser.uid)) // Se eliminan los datos del paciente
        alert('Perfil eliminado exitosamente')
        setPatient(null) // Se actualiza el estado
      } catch (error) {
        console.error('Error al eliminar el perfil:', error)
      }
    }
  }

  const handleCreateAppointment = () => {
    navigate('/create-appointment')
  }

  const handleEditAppointment = (appointmentId: string) => {
    navigate(`/edit-appointment/${appointmentId}`)
  }

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      await deleteDoc(doc(db, 'appointments', appointmentId))
      alert('Cita eliminada exitosamente')
      setAppointments(appointments.filter((app) => app.id !== appointmentId))
    } catch (error) {
      console.error('Error al eliminar la cita:', error)
    }
  }

  return (
    <div className='dating-options'>
      {patient ? (
        <>
          <div className='buttons'>
            <button onClick={handleEditProfile}>EDITAR PERFIL</button>
            <button onClick={handleDeleteProfile}>BORRAR PERFIL</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
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
                  <td>{appointment.dentistId}</td>
                  <td>{appointment.treatment}</td>
                  <td>{appointment.status}</td>
                  <td>
                    <button
                      onClick={() => handleEditAppointment(appointment.id)}
                    >
                      Modificar
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='buttons'>
            <button onClick={handleCreateAppointment}>PEDIR CITA</button>
          </div>
          Existen {dentists.length} dentistas disponibles
          {dentists.length > 0 && (
            <div>
              <h3>Lista de Dentistas Disponibles</h3>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Especialidad</th>
                    <th>Correo</th>
                  </tr>
                </thead>
                <tbody>
                  {dentists.map((dentist) => (
                    <tr key={dentist.id}>
                      <td>{dentist.fullName}</td>
                      <td>{dentist.specialty}</td>
                      <td>{dentist.biography}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div className='no-profile-message'>
          <p>
            Por favor, crea tu perfil primero para poder gestionar tus citas.
          </p>
          <button onClick={handleCreateProfile}>CREAR PERFIL</button>
        </div>
      )}
    </div>
  )
}

export default DatingOptions
