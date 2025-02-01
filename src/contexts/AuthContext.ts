import { createContext } from 'react'
import { User } from 'firebase/auth'

// Define la interfaz para los datos del usuario
interface UserData {
  email: string
  role: string
  createdAt?: Date
  updatedAt?: Date
}

// Define la interfaz para el contexto
interface AuthContextProps {
  currentUser: User | null
  userData: UserData | null
  loading: boolean
}

// Crea el contexto con valores por defecto
export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  userData: null,
  loading: true
})
