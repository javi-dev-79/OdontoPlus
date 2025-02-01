// import { Timestamp } from 'firebase/firestore'

// export interface Dentist {
//   id: string
//   fullName: string
//   specialty: string
//   biography: string
// }

// export interface Patient {
//   id: string
//   fullName: string
//   dateOfBirth: Timestamp
//   email: string
//   phone: string[]
//   appointments: string[]
// }

// export interface Appointment {
//   id: string
//   patientId: string
//   dentistId: string
//   date: Timestamp
//   treatment: string
//   status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
//   notes: string
//   createdAt: Timestamp
//   updatedAt: Timestamp
// }

import { Timestamp } from 'firebase/firestore'

export interface User {
  userId: string
  email: string
  userType: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt?: Timestamp
  updatedAt?: Timestamp
  role: string
}

export interface Dentist {
  id: string
  fullName: string
  specialty: string
  biography: string
}

export interface Patient {
  id: string
  fullName: string
  dateOfBirth: Timestamp
  email: string
  phone: string[]
  appointments: string[]
}

export interface Appointment {
  id: string
  patientId: string
  dentistId: string
  date: Timestamp
  treatment: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
