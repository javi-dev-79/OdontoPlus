import '../../styles/home.css'
import video from '../../assets/videos/Olivia-Noble.mp4'

const VideoSection = () => {
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
        {/* <source src='src\assets\videos\Olivia - Noble.mp4' type='video/mp4' /> */}
        <source src={video} type='video/mp4' />
        Tu navegador no soporta el elemento de video.
      </video>
      <p>Transcripción del video:</p>
      <p>
        [Bienvenidos a OdontoPlus, tu clínica dental de confianza. Aquí,
        combinamos experiencia, tecnología y un trato cercano para brindarte la
        mejor atención bucodental. Sabemos lo importante que es tu sonrisa. Por
        eso, nuestro equipo de especialistas está comprometido en ofrecerte
        tratamientos personalizados para cuidar tu salud dental. En OdontoPlus
        contamos con los últimos avances en odontología, desde implantes
        dentales, ortodoncia invisible, blanqueamiento y mucho más. Nuestras
        instalaciones están diseñadas para tu comodidad y bienestar, con
        tecnología de vanguardia que garantiza procedimientos seguros y
        efectivos. Porque tu sonrisa es nuestra prioridad, te acompañamos en
        cada paso para que tengas la mejor experiencia en el cuidado de tu salud
        oral. Visítanos en nuestra clínica OdontoPlus y descubre cómo podemos
        transformar tu sonrisa. Nos encontramos en Arucas, un lugar accesible y
        cercano para todos nuestros pacientes. ¡Agenda tu cita hoy mismo! Te
        esperamos.]
      </p>
    </section>
  )
}

export default VideoSection
