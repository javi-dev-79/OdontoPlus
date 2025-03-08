import '../styles/AboutUs.css'

import clinicImage from '../assets/images/Gemini_Generated_Image_3nnf333nnf333nnf.webp'
import clinicStaff from '../assets/images/Equipo médico OdontoPlus.webp'
import { Helmet } from 'react-helmet-async'

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | OdontoPlus</title>
        <meta
          name='description'
          content='Conoce más sobre OdontoPlus y nuestro equipo de especialistas en odontología.'
        />
        <meta property='og:title' content='Sobre Nosotros | OdontoPlus' />
        <meta
          property='og:description'
          content='Descubre la historia de OdontoPlus y nuestro compromiso con la salud dental.'
        />
        <meta
          property='og:image'
          content='https://odontoplus.netlify.app/about-us.webp'
        />
        <meta
          property='og:url'
          content='https://odontoplus.netlify.app/about-us'
        />
        <meta property='og:type' content='website' />
      </Helmet>

      <div className='about-us-container'>
        <h1 className='about-us-title'>Sobre Nosotros</h1>

        <div className='about-us-description'>
          <p>
            En <strong>OdontoPlus</strong>, nos dedicamos a brindar atención
            médica de calidad con un enfoque humano y profesional. Nuestra
            misión es mejorar la salud y el bienestar de nuestros pacientes a
            través de servicios médicos integrales y tecnología de vanguardia.
          </p>
          <p>
            Contamos con un equipo de especialistas altamente capacitados y
            comprometidos con la excelencia en el cuidado de la salud. Nuestras
            instalaciones están diseñadas para ofrecer un ambiente cómodo y
            seguro para todos nuestros pacientes.
          </p>
        </div>

        <div className='about-us-images'>
          <img
            src={clinicStaff}
            alt='Equipo médico de la clínica'
            className='about-us-image'
          />
        </div>

        <div className='about-us-team'>
          <h2>Nuestro Equipo Médico</h2>
          <p>
            Nuestro equipo está compuesto por profesionales de la salud con
            amplia experiencia en diversas especialidades. Trabajamos juntos
            para ofrecer un enfoque multidisciplinario que garantiza el mejor
            cuidado para nuestros pacientes.
          </p>
        </div>

        <div className='about-us-images'>
          <img
            src={clinicImage}
            alt='Exterior de la clínica'
            className='about-us-image'
          />
        </div>

        <div className='about-us-facilities'>
          <h2>Nuestras Instalaciones</h2>
          <p>
            Contamos con instalaciones modernas y equipadas con tecnología de
            última generación para garantizar diagnósticos precisos y
            tratamientos efectivos. Nuestras áreas están diseñadas pensando en
            la comodidad y seguridad de nuestros pacientes.
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutUs
