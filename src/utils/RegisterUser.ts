import { setDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase-config'

interface User {
  email: string
  role: string
  status: string
}

const registerUser = async (userId: string, email: string) => {
  try {
    const newUser: User = {
      email,
      role: 'user',
      status: 'pending'
    }

    await setDoc(doc(db, 'users', userId), newUser)
    console.log('Usuario registrado en Firestore')
  } catch (error) {
    console.error('Error al registrar usuario:', error)
  }
}

export default registerUser
