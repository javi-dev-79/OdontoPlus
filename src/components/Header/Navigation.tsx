import '../../styles/Header.css'
import { Link } from 'react-router-dom'

// const Navigation = () => {
//   return (
//     <nav className='nav-links'>
//       <ul className='ButtonComponent'>
//         <li>
//           <a className='Home' href='#'>
//             INICIO
//           </a>
//         </li>
//         <li>
//           <a className='Button' href='#'>
//             SERVICIOS
//           </a>
//         </li>
//         <li>
//           <a className='Button' href='#'>
//             SOBRE NOSOTROS
//           </a>
//         </li>
//         <li>
//           <a className='Button' href='#'>
//             CONTACTO
//           </a>
//         </li>
//         <li>
//           <a className='Button' href='#'>
//             CITAS EN LÍNEA
//           </a>
//         </li>
//       </ul>
//     </nav>
//   )
// }

const Navigation = () => {
  return (
    <nav className='nav-links'>
      <ul className='ButtonComponent'>
        <li>
          <Link className='Home' to='/'>
            INICIO
          </Link>
        </li>
        <li>
          <Link className='Button' to='/services'>
            SERVICIOS
          </Link>
        </li>
        <li>
          <Link className='Button' to='/about-us'>
            SOBRE NOSOTROS
          </Link>
        </li>
        <li>
          <Link className='Button' to='/contact'>
            CONTACTO
          </Link>
        </li>
        <li>
          <Link className='Button' to='/online-dating'>
            CITAS EN LÍNEA
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
