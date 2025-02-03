import { useState } from 'react'
import '../../styles/Home.css'
import video from '../../assets/videos/Olivia-Noble.mp4'

const VideoSection = () => {
  const [showTranscript, setShowTranscript] = useState(false)

  const toggleTranscript = () => {
    setShowTranscript(!showTranscript)
  }

  return (
    <section className='video-section'>
      <h2 className='video-title'>
        Descubre OdontoPlus: Tu Clínica Dental en Arucas
      </h2>
      <video
        controls
        className='video-player'
        aria-label='Video sobre la clínica OdontoPlus'
      >
        <source src={video} type='video/mp4' />
        Tu navegador no soporta el elemento de video.
      </video>
      <button
        onClick={toggleTranscript}
        className='transcript-toggle-button'
        aria-label={
          showTranscript ? 'Ocultar Transcripción' : 'Mostrar Transcripción'
        }
      >
        {showTranscript ? 'Ocultar Transcripción' : 'Mostrar Transcripción'}
      </button>
      {showTranscript && (
        <div className='transcript'>
          <p>
            [Bienvenidos a OdontoPlus, tu clínica dental de confianza. Aquí,
            combinamos experiencia, tecnología y un trato cercano para brindarte
            la mejor atención bucodental.
            <br /> Sabemos lo importante que es tu sonrisa. Por eso, nuestro
            equipo de especialistas está comprometido en ofrecerte tratamientos
            personalizados para cuidar tu salud dental. <br />
            En OdontoPlus contamos con los últimos avances en odontología, desde
            implantes dentales, ortodoncia invisible, blanqueamiento y mucho
            más. <br />
            Nuestras instalaciones están diseñadas para tu comodidad y
            bienestar, con tecnología de vanguardia que garantiza procedimientos
            seguros y efectivos. Porque tu sonrisa es nuestra prioridad, te
            acompañamos en cada paso para que tengas la mejor experiencia en el
            cuidado de tu salud oral. <br />
            Visítanos en nuestra clínica OdontoPlus y descubre cómo podemos
            transformar tu sonrisa. Nos encontramos en Arucas, un lugar
            accesible y cercano para todos nuestros pacientes. <br />
            ¡Agenda tu cita hoy mismo! Te esperamos.]
          </p>
        </div>
      )}
    </section>
  )
}

export default VideoSection
