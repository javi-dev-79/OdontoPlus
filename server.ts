import express from 'express'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from './src/config/firebase-config'

const app = express()

app.get('/approve-user/:userId', async (req, res) => {
  const { userId } = req.params
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, { status: 'approved' })
  res.send('Usuario aprobado')
})

app.get('/reject-user/:userId', async (req, res) => {
  const { userId } = req.params
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, { status: 'rejected' })
  res.send('Usuario rechazado')
})

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000')
})
