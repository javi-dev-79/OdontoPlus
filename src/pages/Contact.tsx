import ContactForm from '../components/Contact/ContactForm'
import ContactHead from '../components/Contact/ContactHead'
import ContactInfo from '../components/Contact/ContactInfo'
import ContactMap from '../components/Contact/ContactMap'
import ContactMapButton from '../components/Contact/ContactMapButton'

const location: [number, number] = [28.112257, -15.5101342]

const Contact = () => {
  return (
    <main>
      <div className='full-width-section'>
        <ContactHead />
        <ContactForm />
        <ContactInfo />
        <ContactMap />
        <ContactMapButton location={location} />
      </div>
    </main>
  )
}

export default Contact
