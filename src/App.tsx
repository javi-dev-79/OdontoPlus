import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import OnlineDating from './pages/OnlineDating'
import './App.css'
import PrivateRoute from './components/PrivateRoute'
import AdminPanel from './components/AdminPanel'
import ApproveRejectUser from './pages/ApproveRejectUser'
import { AuthProvider } from './contexts/AuthProvider'
import RegisterService from './firebase/RegisterService'
import LoginService from './firebase/LoginService'
import CreateProfileForm from './components/Profile/CreateProfile'
import EditProfileForm from './components/Profile/EditProfileForm'
import CreateAppointmentForm from './components/Appointment/CreateAppointmentForm'
import EditAppointmentForm from './components/Appointment/EditAppointmentForm'
import CreateDentistForm from './components/Dentists/CreateDentistForm'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='app-container'>
          <Header />
          <Routes>
            <Route path='/login' element={<LoginService />} />
            <Route path='/register' element={<RegisterService />} />
            <Route path='/' element={<Home />} />
            <Route path='/services' element={<Services />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact' element={<Contact />} />
            <Route element={<PrivateRoute />}>
              <Route path='/online-dating' element={<OnlineDating />} />
              <Route path='/create-profile' element={<CreateProfileForm />} />
              <Route path='/edit-profile' element={<EditProfileForm />} />
              <Route
                path='/create-appointment'
                element={<CreateAppointmentForm />}
              />
              <Route
                path='/edit-appointment/:appointmentId'
                element={<EditAppointmentForm appointmentId={''} />}
              />
            </Route>
            <Route element={<PrivateRoute adminOnly={true} />}>
              <Route path='/admin-panel' element={<AdminPanel />} />
              <Route
                path='/approve-reject-user/:userId/:action'
                element={<ApproveRejectUser />}
              />
              <Route path='/add-dentist' element={<CreateDentistForm />} />{' '}
              {/* ✅ Nueva ruta agregada */}
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
