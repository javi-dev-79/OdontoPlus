import '../styles/AboutUs.css'

import clinicImage from '../assets/images/Gemini_Generated_Image_3nnf333nnf333nnf.webp'
import clinicStaff from '../assets/images/Equipo médico OdontoPlus.webp'

const AboutUs = () => {
  return (
    <div className='about-us-container'>
      <h1 className='about-us-title'>Sobre Nosotros</h1>

      <div className='about-us-description'>
        <p>
          En <strong>OdontoPlus</strong>, nos dedicamos a brindar atención
          médica de calidad con un enfoque humano y profesional. Nuestra misión
          es mejorar la salud y el bienestar de nuestros pacientes a través de
          servicios médicos integrales y tecnología de vanguardia.
        </p>
        <p>
          Contamos con un equipo de especialistas altamente capacitados y
          comprometidos con la excelencia en el cuidado de la salud. Nuestras
          instalaciones están diseñadas para ofrecer un ambiente cómodo y seguro
          para todos nuestros pacientes.
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
          Nuestro equipo está compuesto por profesionales de la salud con amplia
          experiencia en diversas especialidades. Trabajamos juntos para ofrecer
          un enfoque multidisciplinario que garantiza el mejor cuidado para
          nuestros pacientes.
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
          última generación para garantizar diagnósticos precisos y tratamientos
          efectivos. Nuestras áreas están diseñadas pensando en la comodidad y
          seguridad de nuestros pacientes.
        </p>
      </div>
    </div>
  )
}

export default AboutUs
