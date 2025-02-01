import { useNavigate } from 'react-router-dom'
import './../styles/NotFoundPage.css'
import Logo from '../components/Header/Logo'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className='not-found-container'>
      <div className='not-found-card'>
        <Logo className='not-found-logo' />
        <h1 className='not-found-title'>PÁGINA NO ENCONTRADA</h1>
        <p className='not-found-text'>
          Lo sentimos, la página que buscas no existe.
        </p>
        <button className='not-found-button' onClick={() => navigate(-1)}>
          Volver atrás
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
