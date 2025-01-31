// import React, { useState, useEffect, ReactNode } from 'react'
// import { onAuthStateChanged, User } from 'firebase/auth'
// import { doc, getDoc } from 'firebase/firestore'
// import { auth, db } from '../../config/firebase-config'
// import { AuthContext } from './Context'

// interface AuthProviderProps {
//   children: ReactNode
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null)
//   const [isAdmin, setIsAdmin] = useState<boolean>(false)
//   const [loading, setLoading] = useState<boolean>(true)

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setCurrentUser(user)
//       if (user) {
//         try {
//           const userRef = doc(db, 'users', user.uid)
//           const userDoc = await getDoc(userRef)
//           if (userDoc.exists()) {
//             const userData = userDoc.data()
//             setIsAdmin(userData.role === 'admin')
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error)
//           setIsAdmin(false)
//         }
//       } else {
//         setIsAdmin(false)
//       }
//       setLoading(false)
//     })

//     return () => {
//       unsubscribe()
//       setCurrentUser(null)
//       setIsAdmin(false)
//       setLoading(true)
//     }
//   }, [])

//   return (
//     <AuthContext.Provider value={{ currentUser, isAdmin, loading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }


import React, { useState, useEffect, ReactNode } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../config/firebase-config'
import { AuthContext } from './Context'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('onAuthStateChanged - user:', user) // Depuración
      setCurrentUser(user)
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid)
          const userDoc = await getDoc(userRef)
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setIsAdmin(userData.role === 'admin')
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  )
}