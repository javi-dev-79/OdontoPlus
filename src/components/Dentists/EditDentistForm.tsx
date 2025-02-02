import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase-config'
import '../../styles/DentistForms.css'

const EditDentistForm = () => {
  const { dentistId } = useParams()
  const [fullName, setFullName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [biography, setBiography] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDentist = async () => {
      if (dentistId) {
        const dentistRef = doc(db, 'dentists', dentistId)
        const dentistSnap = await getDoc(dentistRef)
        if (dentistSnap.exists()) {
          const dentistData = dentistSnap.data()
          setFullName(dentistData.fullName)
          setSpecialty(dentistData.specialty)
          setBiography(dentistData.biography)
        }
      }
    }
    fetchDentist()
  }, [dentistId])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!fullName || !specialty || !biography) {
      alert('Todos los campos son obligatorios.')
      return
    }
    setLoading(true)
    try {
      const dentistRef = doc(db, 'dentists', dentistId!)
      await updateDoc(dentistRef, {
        fullName,
        specialty,
        biography
      })
      navigate('/admin-panel')
    } catch (error) {
      console.error('Error al actualizar dentista:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='edit-dentist-container'>
      <h1 className='edit-dentist__title'>EDITAR DENTISTA</h1>
      <form onSubmit={handleSubmit} className='edit-dentist__form'>
        <div className='edit-dentist__input-group'>
          <label>Nombre Completo</label>
          <input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className='edit-dentist__input-group'>
          <label>Especialidad</label>
          <input
            type='text'
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
        </div>
        <div className='edit-dentist__input-group'>
          <label>Biografía</label>
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
        </div>
        <button type='submit' className='edit-dentist__btn' disabled={loading}>
          {loading ? 'Guardando...' : 'GUARDAR CAMBIOS'}
        </button>
        <button
          className='edit-dentist__btn edit-dentist__btn--cancel'
          onClick={() => navigate('/admin-panel')}
        >
          CANCELAR
        </button>
      </form>
    </div>
  )
}

export default EditDentistForm
