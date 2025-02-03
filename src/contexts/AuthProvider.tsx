import { useEffect, useState, ReactNode } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'
import { AuthContext } from './AuthContext'

interface UserData {
  email: string
  role: string
  createdAt?: Date
  updatedAt?: Date
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchUserData = async (uid: string) => {
    console.log(`ℹ️ Buscando datos del usuario en Firestore para UID: ${uid}`)
    try {
      const userRef = doc(db, 'app-users', uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        console.log('✅ Datos del usuario encontrados:', userDoc.data())
        setUserData(userDoc.data() as UserData)
      } else {
        console.log('⚠️ No se encontraron datos del usuario en Firestore.')
        setUserData(null)
      }
    } catch (error) {
      console.error('❌ Error obteniendo datos del usuario:', error)
      setUserData(null)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔍 Cambio en autenticación detectado:', user)
      if (user) {
        setCurrentUser(user)
        await fetchUserData(user.uid)
      } else {
        setCurrentUser(null)
        setUserData(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, userData, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
