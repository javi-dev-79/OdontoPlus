// import Carousel from '../components/Home/Carousel'
// import '../styles/Home.css'

// const Home = () => {
//   // TODO: quitar estilos
//   const homeStyle = {
//     backgroundColor: 'green' // El fondo rojo
//   }

//   return (
//     <div className='home' style={homeStyle}>
//       <Carousel />
//     </div>
//   )
// }

// export default Home

import Carousel from '../components/Home/Carousel'
import '../styles/Home.css'

const Home = () => {
  return (
    <main>
      <div className='full-width-section'>
        <Carousel />
      </div>
      <div className='main-content'>
        <div className='container'>{/* Resto del contenido de Home */}</div>
      </div>
    </main>
  )
}

export default Home