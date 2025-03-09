// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { HelmetProvider } from 'react-helmet-async'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import Home from './pages/Home'
// import Services from './pages/Services'
// import AboutUs from './pages/AboutUs'
// import Contact from './pages/Contact'
// import OnlineDating from './pages/OnlineDating'
// import PrivateRoute from './components/PrivateRoute'
// import AdminPanel from './components/AdminPanel'
// import ApproveRejectUser from './pages/ApproveRejectUser'
// import { AuthProvider } from './contexts/AuthProvider'
// import RegisterService from './firebase/RegisterService'
// import LoginService from './firebase/LoginService'
// import CreateProfileForm from './components/Profile/CreateProfile'
// import EditProfileForm from './components/Profile/EditProfileForm'
// import CreateAppointmentForm from './components/Appointment/CreateAppointmentForm'
// import CreateDentistForm from './components/Dentists/CreateDentistForm'
// import NotFound from './pages/NotFound'
// import EditDentistForm from './components/Dentists/EditDentistForm'
// import './App.css'

// function App() {
//   return (
//     <AuthProvider>
//       <HelmetProvider>
//         <Router>
//           <div className='app-container'>
//             <Header />
//             <Routes>
//               <Route path='/login' element={<LoginService />} />
//               <Route path='/register' element={<RegisterService />} />
//               <Route path='/' element={<Home />} />
//               <Route path='/services' element={<Services />} />
//               <Route path='/about-us' element={<AboutUs />} />
//               <Route path='/contact' element={<Contact />} />
//               <Route element={<PrivateRoute />}>
//                 <Route path='/online-dating' element={<OnlineDating />} />
//                 <Route path='/create-profile' element={<CreateProfileForm />} />
//                 <Route
//                   path='/edit-profile/:userId'
//                   element={<EditProfileForm />}
//                 />
//                 <Route
//                   path='/create-appointment'
//                   element={<CreateAppointmentForm />}
//                 />
//               </Route>
//               <Route element={<PrivateRoute adminOnly={true} />}>
//                 <Route path='/admin-panel' element={<AdminPanel />} />
//                 <Route
//                   path='/approve-reject-user/:userId/:action'
//                   element={<ApproveRejectUser />}
//                 />
//                 <Route path='/add-dentist' element={<CreateDentistForm />} />
//                 <Route path='/edit-dentist/:id' element={<EditDentistForm />} />
//               </Route>
//               <Route path='*' element={<NotFound />} />
//             </Routes>
//             <Footer />
//           </div>
//         </Router>
//       </HelmetProvider>
//     </AuthProvider>
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import OnlineDating from "./pages/OnlineDating";
import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./components/AdminPanel";
import ApproveRejectUser from "./pages/ApproveRejectUser";
import { AuthProvider } from "./contexts/AuthProvider";
import RegisterService from "./firebase/RegisterService";
import LoginService from "./firebase/LoginService";
import CreateProfileForm from "./components/Profile/CreateProfile";
import EditProfileForm from "./components/Profile/EditProfileForm";
import CreateAppointmentForm from "./components/Appointment/CreateAppointmentForm";
import CreateDentistForm from "./components/Dentists/CreateDentistForm";
import NotFound from "./pages/NotFound";
import EditDentistForm from "./components/Dentists/EditDentistForm";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <HelmetProvider>
          <Router>
            <Box className="app-container" minH="100vh" display="flex" flexDirection="column">
              <Header />
              <Box as="main" flex="1">
                <Routes>
                  <Route path="/login" element={<LoginService />} />
                  <Route path="/register" element={<RegisterService />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route element={<PrivateRoute />}>
                    <Route path="/online-dating" element={<OnlineDating />} />
                    <Route path="/create-profile" element={<CreateProfileForm />} />
                    <Route path="/edit-profile/:userId" element={<EditProfileForm />} />
                    <Route path="/create-appointment" element={<CreateAppointmentForm />} />
                  </Route>
                  <Route element={<PrivateRoute adminOnly={true} />}>
                    <Route path="/admin-panel" element={<AdminPanel />} />
                    <Route path="/approve-reject-user/:userId/:action" element={<ApproveRejectUser />} />
                    <Route path="/add-dentist" element={<CreateDentistForm />} />
                    <Route path="/edit-dentist/:id" element={<EditDentistForm />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Router>
        </HelmetProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
