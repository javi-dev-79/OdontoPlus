// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import Home from './pages/Home'
// import Services from './pages/Services'
// import AboutUs from './pages/AboutUs'
// import Contact from './pages/Contact'
// import OnlineDating from './pages/OnlineDating'
// import './App.css'

// function App() {
//   // TODO: quitar estilos
//   const appStyle = {
//     backgroundColor: 'blue' // El fondo rojo
//   }

//   return (
//     <Router>
//       <div className='app-container' style={appStyle}>
//         <Header />
//         <main className='main-content'>
//           <div className='container'>
//             <Routes>
//               <Route path='/' element={<Home />} />
//               <Route path='/services' element={<Services />} />
//               <Route path='/about-us' element={<AboutUs />} />
//               <Route path='/contact' element={<Contact />} />
//               <Route path='/online-dating' element={<OnlineDating />} />
//             </Routes>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   )
// }

// export default App

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import Home from './pages/Home'
// import Services from './pages/Services'
// import AboutUs from './pages/AboutUs'
// import Contact from './pages/Contact'
// import OnlineDating from './pages/OnlineDating'
// import './App.css'

// function App() {
//   return (
//     <Router>
//       <div className='app-container'>
//         <Header />
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route
//             path='/services'
//             element={
//               <main className='main-content'>
//                 <div className='container'>
//                   <Services />
//                 </div>
//               </main>
//             }
//           />
//           <Route
//             path='/about-us'
//             element={
//               <main className='main-content'>
//                 <div className='container'>
//                   <AboutUs />
//                 </div>
//               </main>
//             }
//           />
//           <Route
//             path='/contact'
//             element={
//               <main className='main-content'>
//                 <div className='container'>
//                   <Contact />
//                 </div>
//               </main>
//             }
//           />
//           <Route
//             path='/online-dating'
//             element={
//               <main className='main-content'>
//                 <div className='container'>
//                   <OnlineDating />
//                 </div>
//               </main>
//             }
//           />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   )
// }

// export default App



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import OnlineDating from './pages/OnlineDating'
import './App.css'

function App() {
  return (
    <Router>
      <div className='app-container'>
        <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/services' element={<Services />} />
              <Route path='/about-us' element={<AboutUs />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/online-dating' element={<OnlineDating />} />
            </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App