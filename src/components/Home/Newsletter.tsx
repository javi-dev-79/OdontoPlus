import NewsContent from './NewsContent'
import '../../styles/Home.css'
import image from '../../assets/images/newsletter-image.webp'

const Newsletter = () => {
  return (
    <div className='newsletter-container'>
      <div className='newsletter-image'>
        <img src={image} alt='Imagen de la newsletter' />
      </div>
      <div className='newsletter-content'>
        <NewsContent />
      </div>
    </div>
  )
}

export default Newsletter
