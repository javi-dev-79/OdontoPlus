import NewsContent from './NewsContent'
import '../../styles/home.css'
import image from '../../assets/images/newsletter-image.webp'

const Newsletter = () => {
  return (
    <div className='newsletter-container'>
      <div className='newsletter-image'>
        <img src={image} alt='Newsletter' />
      </div>
      <div className='newsletter-content'>
        <NewsContent />
      </div>
    </div>
  )
}

export default Newsletter
