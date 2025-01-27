import '../../../styles/Header.css'

const Navigation = () => {
  return (
    <nav className='nav-links'>
      <ul className='ButtonComponent'>
        <li>
          <a className='Home' href='#'>
            Inicio
          </a>
        </li>
        <li>
          <a className='Button' href='#'>
            Servicios
          </a>
        </li>
        <li>
          <a className='Button' href='#'>
            Sobre Nosotros
          </a>
        </li>
        <li>
          <a className='Button' href='#'>
            Contacto
          </a>
        </li>
        <li>
          <a className='Button' href='#'>
            Citas en Línea
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
