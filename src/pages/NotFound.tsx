import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link to='/' className='home-button'>
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound
