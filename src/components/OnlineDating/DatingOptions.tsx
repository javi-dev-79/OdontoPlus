import { useEffect, useState } from 'react'
import { db } from '../../config/firebase-config'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { useAuth } from '../../contexts/UseAuth'
import { useNavigate } from 'react-router-dom'
import { Appointment, Dentist } from '../types'
import '../../styles/online-dating.css'

const DatingOptions = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patientsMap, setPatientsMap] = useState<{ [key: string]: string }>({})
  const [dentistsMap, setDentistsMap] = useState<{ [key: string]: string }>({})
  const [dentists, setDentists] = useState<Dentist[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [dentistToDelete, setDentistToDelete] = useState<string | null>(null)
  const { currentUser, userData } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAppointments = async () => {
      if (currentUser) {
        const q =
          userData?.role === 'admin'
            ? query(collection(db, 'appointments'))
            : query(
                collection(db, 'appointments'),
                where('patientId', '==', currentUser.uid)
              )

        const querySnapshot = await getDocs(q)
        const appointmentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Appointment[]

        setAppointments(appointmentsData)

        const uniquePatientIds = [
          ...new Set(appointmentsData.map((appt) => appt.patientId))
        ]
        const uniqueDentistIds = [
          ...new Set(appointmentsData.map((appt) => appt.dentistId))
        ]

        const patientsData: { [key: string]: string } = {}
        const dentistsData: { [key: string]: string } = {}

        for (const patientId of uniquePatientIds) {
          const patientSnapshot = await getDocs(
            query(collection(db, 'patients'), where('id', '==', patientId))
          )
          patientsData[patientId] = patientSnapshot.empty
            ? 'Desconocido'
            : patientSnapshot.docs[0].data().fullName
        }

        for (const dentistId of uniqueDentistIds) {
          const dentistSnapshot = await getDocs(
            query(collection(db, 'dentists'), where('id', '==', dentistId))
          )
          dentistsData[dentistId] = dentistSnapshot.empty
            ? 'Desconocido'
            : dentistSnapshot.docs[0].data().fullName
        }

        setPatientsMap(patientsData)
        setDentistsMap(dentistsData)
      }
    }

    fetchAppointments()
  }, [currentUser, userData])

  useEffect(() => {
    const fetchDentists = async () => {
      const querySnapshot = await getDocs(collection(db, 'dentists'))
      setDentists(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Dentist[]
      )
    }

    fetchDentists()
  }, [])

  const updateAppointmentStatus = async (
    appointmentId: string,
    newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  ) => {
    const appointmentRef = doc(db, 'appointments', appointmentId)
    await updateDoc(appointmentRef, { status: newStatus })
    setAppointments((prevAppointments) =>
      prevAppointments.map((appt) =>
        appt.id === appointmentId ? { ...appt, status: newStatus } : appt
      )
    )
  }

  const deleteDentist = async () => {
    if (dentistToDelete) {
      await deleteDoc(doc(db, 'dentists', dentistToDelete))
      setDentists(dentists.filter((dentist) => dentist.id !== dentistToDelete))
      setShowDeleteModal(false)
    }
  }

  return (
    <div className='dating-options'>
      <h2 className='dating-options__title'>
        {userData?.role === 'admin' ? 'GESTIÓN DE CITAS' : 'MIS CITAS'}
      </h2>

      {/* TABLA DE CITAS */}
      <div className='dating-options__table-container'>
        {appointments.length > 0 ? (
          <table className='dating-options__table'>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Paciente</th>
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
                  <td>{patientsMap[appointment.patientId] || 'Cargando...'}</td>
                  <td>{dentistsMap[appointment.dentistId] || 'Cargando...'}</td>
                  <td>{appointment.treatment}</td>
                  <td>{appointment.status}</td>
                  <td>
                    {userData?.role === 'admin' &&
                      appointment.status === 'pending' && (
                        <>
                          <button
                            className='btn btn--confirm'
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
                            className='btn btn--cancel'
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
          <p>No existen citas registradas.</p>
        )}
      </div>

      {/* TABLA DE DENTISTAS (SOLO PARA PATIENT) */}
      {userData?.role === 'patient' && dentists.length > 0 && (
        <div className='dating-options__table-container'>
          <h2 className='dating-options__title'>
            Lista de Dentistas Disponibles
          </h2>
          <table className='dating-options__table'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Especialidad</th>
                <th>Biografía</th>
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

      {/* GESTIÓN DE DENTISTAS (SOLO PARA ADMIN) */}
      {userData?.role === 'admin' && (
        <div>
          <h2 className='dating-options__admin-title'>GESTIÓN DE DENTISTAS</h2>
          <button className='' onClick={() => navigate('/add-dentist')}>
            AGREGAR DENTISTA
          </button>
          <div className='dating-options__table-container'>
            <table className='dating-options__table'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Especialidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {dentists.map((dentist) => (
                  <tr key={dentist.id}>
                    <td>{dentist.fullName}</td>
                    <td>{dentist.specialty}</td>
                    <td>
                      <button
                        className='btn btn--edit'
                        onClick={() => navigate(`/edit-dentist/${dentist.id}`)}
                      >
                        EDITAR
                      </button>
                      <button
                        className='btn btn--delete'
                        onClick={() => {
                          setShowDeleteModal(true)
                          setDentistToDelete(dentist.id)
                        }}
                      >
                        ELIMINAR
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN */}
      {showDeleteModal && (
        <div className='dating-options__modal-overlay'>
          <div className='dating-options__modal-content'>
            <h2>¿Estás seguro?</h2>
            <p>Esta acción no se puede deshacer.</p>
            <div className='dating-options__modal-buttons'>
              <button
                className='btn btn--modal-cancel'
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button
                className='btn btn--modal-confirm'
                onClick={deleteDentist}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DatingOptions
