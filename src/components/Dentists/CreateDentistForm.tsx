import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../config/firebase-config'
import '../../styles/CreateDentistForm.css'

const CreateDentistForm = () => {
  const [fullName, setFullName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [biography, setBiography] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!fullName || !specialty || !biography) {
      alert('Todos los campos son obligatorios.')
      return
    }

    setLoading(true)

    try {
      await addDoc(collection(db, 'dentists'), {
        fullName,
        specialty,
        biography
      })
      navigate('/admin-panel') // Redirige a la vista de administración
    } catch (error) {
      console.error('Error al agregar dentista:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='create-dentist-container'>
      <h1 className='title'>AÑADIR NUEVO DENTISTA</h1>

      <form onSubmit={handleSubmit} className='form-container'>
        <div className='input-group'>
          <label>Nombre Completo</label>
          <input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder='Ingrese el nombre completo'
          />
        </div>

        <div className='input-group'>
          <label>Especialidad</label>
          <input
            type='text'
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            placeholder='Ingrese la especialidad'
          />
        </div>

        <div className='input-group'>
          <label>Biografía</label>
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            placeholder='Ingrese una breve biografía'
          />
        </div>

        <button type='submit' className='btn btn-submit' disabled={loading}>
          {loading ? 'Guardando...' : 'GUARDAR DENTISTA'}
        </button>
      </form>

      <button className='btn btn-cancel' onClick={() => navigate('/admin-panel')}>
        CANCELAR
      </button>
    </div>
  )
}

export default CreateDentistForm
