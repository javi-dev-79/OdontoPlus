import { useNavigate } from 'react-router-dom'
import './../styles/NotFoundPage.css'
import Logo from '../components/Header/Logo'
import { Helmet } from 'react-helmet-async'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Página No Encontrada | OdontoPlus</title>
        <meta
          name='description'
          content='Lo sentimos, la página que buscas no existe o ha sido movida.'
        />
        <meta property='og:title' content='Página No Encontrada | OdontoPlus' />
        <meta
          property='og:description'
          content='La página que buscas no está disponible. Vuelve al inicio para más información.'
        />
        <meta
          property='og:image'
          content='https://odontoplus.netlify.app/404.webp'
        />
        <meta property='og:url' content='https://odontoplus.netlify.app/404' />
        <meta property='og:type' content='website' />
      </Helmet>

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
    </>
  )
}

export default NotFoundPage
