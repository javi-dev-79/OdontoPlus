import '../../styles/Contact.css' // Importamos los estilos

const ContactForm = () => {
  return (
    <form className='contact-form'>
      <div className='form-group'>
        <label htmlFor='nombre'>Nombre</label>
        <input type='text' id='nombre' name='nombre' />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' />
      </div>
      <div className='form-group'>
        <label htmlFor='asunto'>Asunto</label>
        <input type='text' id='asunto' name='asunto' />
      </div>
      <div className='form-group'>
        <label htmlFor='mensaje'>Mensaje</label>
        <textarea id='mensaje' name='mensaje' rows={6} />
      </div>
      <button type='submit' className='send-btn'>
        Enviar
      </button>
    </form>
  )
}

export default ContactForm
