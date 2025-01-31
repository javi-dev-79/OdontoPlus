import ContactForm from '../components/Contact/ContactForm'
import ContactHead from '../components/Contact/ContactHead'
import ContactInfo from '../components/Contact/ContactInfo'

const Contact = () => {
  return (
    <main>
      <div className='full-width-section'>
        <ContactHead />
        <ContactForm />
        <ContactInfo />
      </div>
    </main>
  )
}

export default Contact
