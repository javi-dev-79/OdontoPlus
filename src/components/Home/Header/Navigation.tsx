import '../../../styles/Header.css'

const Navigation = () => {
  return (
    <nav className='nav-links'>
      <ul className='ButtonComponent'>
        <li>
          <a className='Home' href='#'>
            INICIO
          </a>
        </li>
        <li>
          <a className='Button' href='#'>
            SERVICIOS
          </a>
        </li>
        <li>
          <a className='Button' href='#'>
            SOBRE NOSOTROS
          </a>
        </li>
        <li>
          <a className='Button' href='#'>
            CONTACTO
          </a>
        </li>
        <li>
          <a className='Button' href='#'>
            CITAS EN LÍNEA
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
