import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase-config'

const ApproveRejectUser = () => {
  const { userId, action } = useParams<{ userId: string; action: string }>()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const updateUserStatus = async () => {
      if (!userId || !action) {
        setError('Parámetros inválidos')
        return
      }

      if (action !== 'approve' && action !== 'reject') {
        setError('Acción no válida')
        return
      }

      try {
        const userRef = doc(db, 'users', userId)
        const newStatus = action === 'approve' ? 'approved' : 'rejected'
        await updateDoc(userRef, { status: newStatus })
        navigate('/admin-panel')
      } catch (err) {
        setError('Error al procesar la solicitud')
        console.error('Error updating user:', err)
      }
    }

    updateUserStatus()
  }, [userId, action, navigate])

  if (error) {
    return <div className='text-red-600 p-4 text-center'>{error}</div>
  }

  return (
    <div className='flex justify-center items-center p-4'>
      <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500' />
      <span className='ml-2'>Procesando solicitud...</span>
    </div>
  )
}

export default ApproveRejectUser
