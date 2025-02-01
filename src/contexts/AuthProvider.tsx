import { useEffect, useState, ReactNode } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'
import { AuthContext } from './AuthContext' // Importa el contexto

// Define la interfaz para los datos del usuario
interface UserData {
  email: string
  role: string
  createdAt?: Date
  updatedAt?: Date
}

// Define las propiedades del proveedor
interface AuthProviderProps {
  children: ReactNode
}

// Proveedor del contexto
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Función para obtener los datos del usuario desde Firestore
  const fetchUserData = async (uid: string) => {
    const userRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      setUserData(userDoc.data() as UserData) // Asegura que los datos sean del tipo UserData
    } else {
      setUserData(null)
    }
  }

  // Listener para cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      if (user) {
        await fetchUserData(user.uid)
      } else {
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
