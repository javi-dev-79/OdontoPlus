import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  collection,
  getDocs
  // deleteDoc
  // doc,
  // updateDoc
} from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { Trash2, Edit, PlusCircle } from 'lucide-react'
import '../styles/AdminPanel.css'
import { AppUser, Dentist } from './types'
import { Timestamp } from 'firebase/firestore'

const AdminPanel = () => {
  const [appusers, setUsers] = useState<AppUser[]>([])
  const [dentists, setDentists] = useState<Dentist[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'pending' | 'approved' | 'rejected'
  >('all')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'app-users')
        const snapshot = await getDocs(usersCollection)
        const usersList = snapshot.docs.map((doc) => ({
          userId: doc.id,
          ...doc.data()
        })) as AppUser[]
        setUsers(usersList)
      } catch (error) {
        console.error('Error fetching app-users:', error)
      }
    }

    const fetchDentists = async () => {
      try {
        const dentistsCollection = collection(db, 'dentists')
        const snapshot = await getDocs(dentistsCollection)
        const dentistsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Dentist[]
        setDentists(dentistsList)
      } catch (error) {
        console.error('Error fetching dentists:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
    fetchDentists()
  }, [])

  const formatDate = (timestamp?: Timestamp) => {
    return timestamp ? new Date(timestamp.toDate()).toLocaleString() : 'N/A'
  }

  // ⚠️ Temporalmente desactivado hasta que suba el backend en Netlify Functions
  const handleDeleteUser = async (id: string) => {
    try {
      console.log(`(Temporal) Eliminar usuario con ID: ${id}`)
  
      /*
      const response = await fetch('https://YOUR_NETLIFY_FUNCTION_URL/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: id })
      });

      if (!response.ok) {
        throw new Error('Error al eliminar usuario de Authentication');
      }

      // Eliminar de Firestore
      await deleteDoc(doc(db, 'app-users', id));

      setUsers(app-users.filter((user) => user.userId !== id));
      console.log('Usuario eliminado correctamente');
      */
    } catch (error) {
      console.error('Error eliminando usuario:', error)
    }
  }

  // ⚠️ Temporalmente desactivado hasta que suba el backend en Netlify Functions
  const handleEditUser = async (
    id: string,
    newRole: string,
    newStatus: string
  ) => {
    try {
      console.log(
        `(Temporal) Editar usuario con ID: ${id}, Nuevo Rol: ${newRole}, Nuevo Estado: ${newStatus}`
      )

      /*
      const response = await fetch('https://YOUR_NETLIFY_FUNCTION_URL/edit-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: id, role: newRole, status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Error al editar usuario en Authentication');
      }

      // Si la edición es exitosa, actualizarlo en Firestore
      await updateDoc(doc(db, 'app-users', id), { role: newRole, status: newStatus });

      setUsers(app-users.map((user) =>
        user.userId === id ? { ...user, role: newRole, status: newStatus } : user
      ));

      console.log('Usuario actualizado correctamente');
      */
    } catch (error) {
      console.error('Error editando usuario:', error)
    }
  }

  const filteredUsers = appusers.filter((user) =>
    selectedFilter === 'all' ? true : user.status === selectedFilter
  )

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='loading-spinner'></div>
      </div>
    )
  }

  return (
    <div className='admin-panel'>
      <h1 className='admin-title'>PANEL DE ADMINISTRACIÓN</h1>

      <div className='admin-panel-header '>
        <h2>PANEL DE USUARIOS</h2>
        <select
          className='filter-select'
          value={selectedFilter}
          onChange={(e) =>
            setSelectedFilter(
              e.target.value as 'all' | 'pending' | 'approved' | 'rejected'
            )
          }
        >
          <option value='all'>Todos</option>
          <option value='pending'>Pendientes</option>
          <option value='approved'>Aprobados</option>
          <option value='rejected'>Rechazados</option>
        </select>
      </div>

      <div className='user-list'>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.userId} className='user-card'>
              <div className='user-info'>
                <p className='user-email'>{user.email}</p>
                <div className='user-details'>
                  <span>
                    <strong>Estado:</strong> {user.status}
                  </span>
                  <span>
                    <strong>Tipo:</strong> {user.role}
                  </span>
                </div>
                <div className='user-dates'>
                  <span>
                    <strong>Creado:</strong> {formatDate(user.createdAt)}
                  </span>
                  <span>
                    <strong>Actualizado:</strong> {formatDate(user.updatedAt)}
                  </span>
                </div>
              </div>

              <div className='user-actions'>
                <button
                  className='btn btn-edit'
                  onClick={() =>
                    handleEditUser(user.userId, 'admin', 'approved')
                  }
                >
                  <Edit className='icon-btn' />
                  EDITAR
                </button>

                <button
                  className='btn btn-delete'
                  onClick={() => handleDeleteUser(user.userId)}
                >
                  <Trash2 className='icon-btn' />
                  ELIMINAR
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='no-users'>No hay usuarios que mostrar</div>
        )}
      </div>

      <h2 className='admin-panel-header'>GESTIÓN DE DENTISTAS</h2>

      <div className='user-list'>
        {dentists.length > 0 ? (
          dentists.map((dentist) => (
            <div key={dentist.id} className='user-card'>
              <div className='user-info'>
                <p className='user-email'>{dentist.fullName}</p>
                <div className='user-details'>
                  <span>
                    <strong>Especialidad:</strong> {dentist.specialty}
                  </span>
                </div>
              </div>

              <div className='user-actions'>
                <button
                  className='btn btn-edit'
                  onClick={() => navigate(`/edit-dentist/${dentist.id}`)}
                >
                  <Edit className='icon-btn' />
                  EDITAR
                </button>

                <button
                  className='btn btn-delete'
                  onClick={() => handleDeleteUser(dentist.id)}
                >
                  <Trash2 className='icon-btn' />
                  ELIMINAR
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='no-users'>No hay dentistas que mostrar</div>
        )}
      </div>

      <button className='add-dentist' onClick={() => navigate('/add-dentist')}>
        <PlusCircle className='icon-btn' />
        AÑADIR DENTISTA
      </button>
    </div>
  )
}

export default AdminPanel
