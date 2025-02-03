import Carousel from '../components/Home/Carousel'
import Newsletter from '../components/Home/Newsletter'
import VideoSection from '../components/Home/VideoSection'
import '../styles/Home.css'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Inicio | OdontoPlus</title>
        <meta
          name='description'
          content='Bienvenido a OdontoPlus, la mejor clínica dental para el cuidado de tu sonrisa.'
        />
        <meta property='og:title' content='Inicio | OdontoPlus' />
        <meta
          property='og:description'
          content='Descubre nuestros tratamientos dentales y agenda tu cita con nuestros especialistas.'
        />
        <meta
          property='og:image'
          content='https://odontoplus.netlify.app/home.webp'
        />
        <meta property='og:url' content='https://odontoplus.netlify.app/' />
        <meta property='og:type' content='website' />
      </Helmet>

      <main>
        <div className='full-width-section'>
          <Carousel />
          <VideoSection />
          <Newsletter />
        </div>
      </main>
    </>
  )
}

export default Home
