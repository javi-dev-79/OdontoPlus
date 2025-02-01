import express from 'express'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from './src/config/firebase-config'
import admin from './src/config/firebase-admin' // Importa Firebase Admin

const app = express()

// Middleware para parsear JSON
app.use(express.json())

// Endpoint para aprobar usuario
app.get('/approve-user/:userId', async (req, res) => {
  const { userId } = req.params
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, { status: 'approved' })
  res.send('Usuario aprobado')
})

// Endpoint para rechazar usuario
app.get('/reject-user/:userId', async (req, res) => {
  const { userId } = req.params
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, { status: 'rejected' })
  res.send('Usuario rechazado')
})

// Endpoint para eliminar usuario (Firestore y Authentication)
app.delete('/delete-user', async (req, res) => {
  const { userId } = req.body

  try {
    // Eliminar usuario de Firestore
    const userRef = doc(db, 'users', userId)
    await deleteDoc(userRef)

    // Eliminar usuario de Firebase Authentication
    await admin.auth().deleteUser(userId)

    res.status(200).json({ message: 'Usuario eliminado correctamente' })
  } catch (error) {
    console.error('Error eliminando usuario:', error)
    res.status(500).json({ error: 'Error eliminando usuario' })
  }
})

// Iniciar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
