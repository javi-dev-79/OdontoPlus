// import { useEffect, useState } from 'react'
// import {
//   collection,
//   getDocs,
//   updateDoc,
//   doc,
//   deleteDoc
// } from 'firebase/firestore'
// import { db } from '../config/firebase-config'
// import sendEmail from '../utils/SendEmail'
// import {
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Trash2,
//   UserCheck,
//   UserX
// } from 'lucide-react'
// import { getAuth, deleteUser } from 'firebase/auth'

// interface User {
//   userId: string
//   email: string
//   status: 'pending' | 'approved' | 'rejected'
//   createdAt?: string
// }

// type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected'

// const AdminPanel = () => {
//   const [users, setUsers] = useState<User[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selectedFilter, setSelectedFilter] = useState<FilterStatus>('all')

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersCollection = collection(db, 'users')
//         const snapshot = await getDocs(usersCollection)
//         const usersList = snapshot.docs.map((doc) => ({
//           userId: doc.id,
//           ...doc.data()
//         })) as User[]
//         setUsers(
//           usersList.sort((a, b) =>
//             a.status === 'pending' ? -1 : b.status === 'pending' ? 1 : 0
//           )
//         )
//       } catch (error) {
//         console.error('Error fetching users:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchUsers()
//   }, [])

//   // const handleUserAction = async (
//   //   action: 'approve' | 'reject' | 'delete',
//   //   user: User
//   // ) => {
//   //   try {
//   //     const userRef = doc(db, 'users', user.userId)

//   //     if (action === 'delete') {
//   //       await deleteDoc(userRef)
//   //       setUsers(users.filter((u) => u.userId !== user.userId))
//   //     } else {
//   //       const newStatus = action === 'approve' ? 'approved' : 'rejected'
//   //       await updateDoc(userRef, { status: newStatus })

//   //       if (action === 'reject') {
//   //         const templateParams = { email: user.email }
//   //         sendEmail(templateParams, 'TU_TEMPLATE_ID_RECHAZO')
//   //       }

//   //       setUsers(
//   //         users.map((u) =>
//   //           u.userId === user.userId ? { ...u, status: newStatus } : u
//   //         )
//   //       )
//   //     }
//   //   } catch (error) {
//   //     console.error(`Error ${action}ing user:`, error)
//   //   }
//   // }

//   const handleUserAction = async (
//     action: 'approve' | 'reject' | 'delete',
//     user: User
//   ) => {
//     try {
//       const userRef = doc(db, 'users', user.userId)

//       if (action === 'delete') {
//         // Eliminar el usuario de Firebase Authentication
//         const auth = getAuth()
//         const firebaseUser = auth.currentUser

//         if (firebaseUser && firebaseUser.uid === user.userId) {
//           await deleteUser(firebaseUser)
//         }

//         // Eliminar el usuario de Firestore
//         await deleteDoc(userRef)
//         setUsers(users.filter((u) => u.userId !== user.userId))
//       } else {
//         const newStatus = action === 'approve' ? 'approved' : 'rejected'
//         await updateDoc(userRef, { status: newStatus })

//         if (action === 'reject') {
//           const templateParams = { email: user.email }
//           sendEmail(templateParams, 'TU_TEMPLATE_ID_RECHAZO')
//         }

//         setUsers(
//           users.map((u) =>
//             u.userId === user.userId ? { ...u, status: newStatus } : u
//           )
//         )
//       }
//     } catch (error) {
//       console.error(`Error ${action}ing user:`, error)
//     }
//   }

//   const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedFilter(event.target.value as FilterStatus)
//   }

//   const filteredUsers = users.filter((user) =>
//     selectedFilter === 'all' ? true : user.status === selectedFilter
//   )

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return <AlertCircle className='w-5 h-5 text-yellow-500' />
//       case 'approved':
//         return <CheckCircle className='w-5 h-5 text-green-500' />
//       case 'rejected':
//         return <XCircle className='w-5 h-5 text-red-500' />
//       default:
//         return null
//     }
//   }

//   if (loading) {
//     return (
//       <div className='flex justify-center items-center min-h-screen'>
//         <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
//       </div>
//     )
//   }

//   return (
//     <div className='max-w-6xl mx-auto p-6'>
//       <div className='flex justify-between items-center mb-6'>
//         <h1 className='text-2xl font-bold'>Panel de Administración</h1>
//         <div className='flex gap-2'>
//           <select
//             className='px-4 py-2 border rounded-lg'
//             value={selectedFilter}
//             onChange={handleFilterChange}
//           >
//             <option value='all'>Todos</option>
//             <option value='pending'>Pendientes</option>
//             <option value='approved'>Aprobados</option>
//             <option value='rejected'>Rechazados</option>
//           </select>
//         </div>
//       </div>

//       <div className='bg-white rounded-lg shadow'>
//         <div className='grid gap-4'>
//           {filteredUsers.map((user) => (
//             <div
//               key={user.userId}
//               className='p-4 border-b last:border-b-0 flex items-center justify-between hover:bg-gray-50'
//             >
//               <div className='flex items-center gap-3'>
//                 {getStatusIcon(user.status)}
//                 <div>
//                   <p className='font-medium'>{user.email}</p>
//                   <p className='text-sm text-gray-500 capitalize'>
//                     Estado: {user.status}
//                   </p>
//                 </div>
//               </div>

//               <div className='flex gap-2'>
//                 {user.status === 'pending' && (
//                   <>
//                     <button
//                       onClick={() => handleUserAction('approve', user)}
//                       className='flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200'
//                     >
//                       <UserCheck className='w-4 h-4' />
//                       Aprobar
//                     </button>
//                     <button
//                       onClick={() => handleUserAction('reject', user)}
//                       className='flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200'
//                     >
//                       <UserX className='w-4 h-4' />
//                       Rechazar
//                     </button>
//                   </>
//                 )}
//                 <button
//                   onClick={() => handleUserAction('delete', user)}
//                   className='flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200'
//                 >
//                   <Trash2 className='w-4 h-4' />
//                   Eliminar
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredUsers.length === 0 && (
//           <div className='text-center py-8 text-gray-500'>
//             No hay usuarios que mostrar
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AdminPanel

// ****************************************************************************************

import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../config/firebase-config'
import sendEmail from '../utils/SendEmail'
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Trash2,
  UserCheck,
  UserX
} from 'lucide-react'

interface User {
  userId: string
  email: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt?: string
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected'

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>('all')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users')
        const snapshot = await getDocs(usersCollection)
        const usersList = snapshot.docs.map((doc) => ({
          userId: doc.id,
          ...doc.data()
        })) as User[]
        setUsers(
          usersList.sort((a, b) =>
            a.status === 'pending' ? -1 : b.status === 'pending' ? 1 : 0
          )
        )
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // const handleUserAction = async (
  //   action: 'approve' | 'reject' | 'delete',
  //   user: User
  // ) => {
  //   try {
  //     const userRef = doc(db, 'users', user.userId)

  //     if (action === 'delete') {
  //       // Eliminar el usuario de Firebase Authentication
  //       const auth = getAuth()
  //       const firebaseUser = auth.currentUser

  //       if (firebaseUser && firebaseUser.uid === user.userId) {
  //         await deleteUser(firebaseUser)
  //       }

  //       // Eliminar el usuario de Firestore
  //       await deleteDoc(userRef)
  //       setUsers(users.filter((u) => u.userId !== user.userId))
  //     } else {
  //       const newStatus = action === 'approve' ? 'approved' : 'rejected'
  //       await updateDoc(userRef, { status: newStatus })

  //       if (action === 'reject') {
  //         const templateParams = { email: user.email }
  //         sendEmail(templateParams, 'TU_TEMPLATE_ID_RECHAZO')
  //       }

  //       setUsers(
  //         users.map((u) =>
  //           u.userId === user.userId ? { ...u, status: newStatus } : u
  //         )
  //       )
  //     }
  //   } catch (error) {
  //     console.error(`Error ${action}ing user:`, error)
  //   }
  // }

  const handleUserAction = async (
    action: 'approve' | 'reject' | 'delete',
    user: User
  ) => {
    try {
      const userRef = doc(db, 'users', user.userId)

      if (action === 'delete') {
        // Eliminar el usuario de Firestore
        await deleteDoc(userRef)

        // Eliminar el usuario de Firebase Authentication (llamada al backend)
        const response = await fetch('http://localhost:3000/delete-user', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: user.userId })
        })

        if (!response.ok) {
          throw new Error('Error eliminando usuario de Authentication')
        }

        // Actualizar el estado local
        setUsers(users.filter((u) => u.userId !== user.userId))
      } else {
        const newStatus = action === 'approve' ? 'approved' : 'rejected'
        await updateDoc(userRef, { status: newStatus })

        if (action === 'reject') {
          const templateParams = { email: user.email }
          sendEmail(templateParams, 'TU_TEMPLATE_ID_RECHAZO')
        }

        setUsers(
          users.map((u) =>
            u.userId === user.userId ? { ...u, status: newStatus } : u
          )
        )
      }
    } catch (error) {
      console.error(`Error ${action}ing user:`, error)
    }
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as FilterStatus)
  }

  const filteredUsers = users.filter((user) =>
    selectedFilter === 'all' ? true : user.status === selectedFilter
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className='w-5 h-5 text-yellow-500' />
      case 'approved':
        return <CheckCircle className='w-5 h-5 text-green-500' />
      case 'rejected':
        return <XCircle className='w-5 h-5 text-red-500' />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Panel de Administración</h1>
        <div className='flex gap-2'>
          <select
            className='px-4 py-2 border rounded-lg'
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option value='all'>Todos</option>
            <option value='pending'>Pendientes</option>
            <option value='approved'>Aprobados</option>
            <option value='rejected'>Rechazados</option>
          </select>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow'>
        <div className='grid gap-4'>
          {filteredUsers.map((user) => (
            <div
              key={user.userId}
              className='p-4 border-b last:border-b-0 flex items-center justify-between hover:bg-gray-50'
            >
              <div className='flex items-center gap-3'>
                {getStatusIcon(user.status)}
                <div>
                  <p className='font-medium'>{user.email}</p>
                  <p className='text-sm text-gray-500 capitalize'>
                    Estado: {user.status}
                  </p>
                </div>
              </div>

              <div className='flex gap-2'>
                {user.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleUserAction('approve', user)}
                      className='flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200'
                    >
                      <UserCheck className='w-4 h-4' />
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleUserAction('reject', user)}
                      className='flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200'
                    >
                      <UserX className='w-4 h-4' />
                      Rechazar
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleUserAction('delete', user)}
                  className='flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200'
                >
                  <Trash2 className='w-4 h-4' />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className='text-center py-8 text-gray-500'>
            No hay usuarios que mostrar
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
