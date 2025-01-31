// import { createContext } from 'react'
// import { User } from 'firebase/auth'

// interface AuthContextProps {
//   currentUser: User | null
//   isAdmin: boolean
//   loading: boolean
// }

// export const AuthContext = createContext<AuthContextProps>({
//   currentUser: null,
//   isAdmin: false,
//   loading: true
// })

import { createContext } from 'react'
import { User } from 'firebase/auth'

// Define la interfaz para el contexto
interface AuthContextProps {
  currentUser: User | null
  isAdmin: boolean
  loading: boolean
}

// Crea el contexto con valores por defecto
export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  isAdmin: false,
  loading: true
})