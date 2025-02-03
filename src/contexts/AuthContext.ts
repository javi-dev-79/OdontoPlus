import { createContext } from 'react'
import { User } from 'firebase/auth'

interface UserData {
  email: string
  role: string
  createdAt?: Date
  updatedAt?: Date
}

interface AuthContextProps {
  currentUser: User | null
  userData: UserData | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  userData: null,
  loading: true
})
