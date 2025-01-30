// import { useState } from 'react'
// import '../../styles/home.css'

// const NewsContent = () => {
//   const [email, setEmail] = useState('')

//   const handleSubscribe = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Aquí iría la lógica para manejar la suscripción
//     console.log('Email subscrito:', email)
//   }

//   return (
//     <div className='news-content'>
//       <h3>Suscríbase a nuestra newsletter</h3>

//       <p>
//         Únete a nuestra comunidad y recibe información exclusiva sobre
//         tratamientos, consejos de salud bucal y promociones especiales.
//       </p>

//       <form onSubmit={handleSubscribe} className='subscribe-form'>
//         <input
//           type='email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder='Ingresa aquí tu email'
//           required
//         />

//         <button type='submit'>SUBSCRÍBETE</button>
//       </form>
//     </div>
//   )
// }

// export default NewsContent

import { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import '../../styles/home.css'

const NewsContent = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para manejar la suscripción
    console.log('Email subscrito:', email)
  }

  return (
    <div className='news-content'>
      <h3>Suscríbase a nuestra newsletter</h3>
      <p>
        Únete a nuestra comunidad y recibe información exclusiva sobre
        tratamientos, consejos de salud bucal y promociones especiales.
      </p>
      <form
        onSubmit={handleSubscribe}
        className='subscribe-form'
        aria-label='Formulario de suscripción a la newsletter'
      >
        <div className='input-wrapper'>
          <label htmlFor='email'>
            <span className='visually-hidden'>Email</span>
            <MdEmail className='email-icon' size={20} />
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Ingresa aquí tu email'
            required
            aria-describedby='email-error'
          />
          <span id='email-error' className='error-message'></span>
        </div>
        <button type='submit'>SUBSCRÍBETE</button>
      </form>
    </div>
  )
}

export default NewsContent
