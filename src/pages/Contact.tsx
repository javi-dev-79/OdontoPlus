import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/Contact/ContactForm'
import ContactHead from '../components/Contact/ContactHead'
import ContactInfo from '../components/Contact/ContactInfo'
import ContactMap from '../components/Contact/ContactMap'
import ContactMapButton from '../components/Contact/ContactMapButton'

const location: [number, number] = [28.112257, -15.5101342]

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contacto | OdontoPlus</title>
        <meta
          name='description'
          content='Ponte en contacto con OdontoPlus y agenda tu cita con nuestros especialistas.'
        />
        <meta property='og:title' content='Contacto | OdontoPlus' />
        <meta
          property='og:description'
          content='Comunícate con nosotros y reserva tu consulta en OdontoPlus.'
        />
        <meta
          property='og:image'
          content='https://odontoplus.netlify.app/contact.webp'
        />
        <meta
          property='og:url'
          content='https://odontoplus.netlify.app/contact'
        />
        <meta property='og:type' content='website' />
      </Helmet>
      <main>
        <div className='full-width-section'>
          <ContactHead />
          <ContactForm />
          <ContactInfo />
          <ContactMap />
          <ContactMapButton location={location} />
        </div>
      </main>
    </>
  )
}

export default Contact
