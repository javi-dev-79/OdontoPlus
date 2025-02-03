import { Helmet } from 'react-helmet-async'
import DatingOptions from '../components/OnlineDating/DatingOptions'
import '../styles/online-dating.css'

const OnlineDating = () => {
  return (
    <>
      <Helmet>
        <title>Citas en Línea | OdontoPlus</title>
        <meta
          name='description'
          content='Reserva tu cita en línea con nuestros especialistas en OdontoPlus de forma rápida y sencilla.'
        />
        <meta property='og:title' content='Citas en Línea | OdontoPlus' />
        <meta
          property='og:description'
          content='Agenda tu consulta dental en línea con los mejores especialistas.'
        />
        <meta
          property='og:image'
          content='https://odontoplus.netlify.app/online-dating.webp'
        />
        <meta
          property='og:url'
          content='https://odontoplus.netlify.app/online-dating'
        />
        <meta property='og:type' content='website' />
      </Helmet>

      <main>
        <div className='full-width-section'>
          <DatingOptions />
        </div>
      </main>
    </>
  )
}

export default OnlineDating
