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
import { useNavigate } from 'react-router-dom'
import { Appointment, Dentist, Patient } from '../types'
import '../../styles/online-dating.css'

const DatingOptions = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patient, setPatient] = useState<Patient | null>(null)
  const [dentists, setDentists] = useState<Dentist[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
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
          const patientData = querySnapshot.docs[0].data() as Patient
          setPatient(patientData)
          console.log('Datos del paciente:', patientData)
        } else {
          setPatient(null)
          console.log(
            `El paciente ${currentUser.email} aún no ha creado un perfil`
          )
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
        console.log('Datos de las citas:', appointmentsData)
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
      })) as Dentist[]
      setDentists(dentistsData)
    }

    fetchDentists()
  }, [])

  const handleCreateProfile = () => {
    navigate('/create-profile')
  }

  const handleEditProfile = () => {
    if (currentUser) {
      navigate(`/edit-profile/${currentUser.uid}`)
    }
  }

  const handleDeleteProfile = async () => {
    if (currentUser) {
      try {
        await deleteDoc(doc(db, 'patients', currentUser.uid))
        setPatient(null)
        setShowDeleteModal(false)
      } catch (error) {
        console.error('Error al eliminar el perfil:', error)
      }
    }
  }

  return (
    <div className='dating-options'>
      {patient ? (
        <>
          <div className='dating-options__buttons'>
            <button
              className='dating-options__button'
              onClick={handleEditProfile}
            >
              EDITAR PERFIL
            </button>
            <button
              className='dating-options__button'
              onClick={() => setShowDeleteModal(true)}
            >
              BORRAR PERFIL
            </button>
          </div>

          <div className='dating-options__table-container'>
            {appointments.length > 0 ? (
              <table className='dating-options__table'>
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
                          className='dating-options__action-button'
                          onClick={() =>
                            navigate(`/edit-appointment/${appointment.id}`)
                          }
                        >
                          Modificar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='dating-options__no-users'>
                No existe ningún usuario
              </div>
            )}
          </div>

          <div className='dating-options__buttons'>
            <button
              className='dating-options__button'
              onClick={() => navigate('/create-appointment')}
            >
              PEDIR CITA
            </button>
          </div>

          {dentists.length > 0 && (
            <div>
              <h3>DENTISTAS DISPONIBLES</h3>
              <div className='dating-options__table-container'>
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
            onClick={handleCreateProfile}
          >
            CREAR PERFIL
          </button>
        </div>
      )}

      {showDeleteModal && (
        <div className='dating-options__modal-overlay'>
          <div className='dating-options__modal-content'>
            <h2>¿Estás seguro?</h2>
            <p>
              Esta acción no se puede deshacer. Se eliminarán todos los datos de
              tu perfil.
            </p>
            <div className='dating-options__modal-buttons'>
              <button
                className='dating-options__modal-cancel'
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button
                className='dating-options__modal-confirm'
                onClick={handleDeleteProfile}
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
