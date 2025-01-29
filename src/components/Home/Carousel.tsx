import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import '../../styles/home.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import Slide1 from '../../assets/images/Slide 1.webp'
import Slide2 from '../../assets/images/Slide 2.webp'
import Slide3 from '../../assets/images/Slide 3.webp'

const images = [
  {
    original: Slide1,
    thumbnail: Slide1
  },
  {
    original: Slide2,
    thumbnail: Slide2
  },
  {
    original: Slide3,
    thumbnail: Slide3
  }
]

// Función para personalizar la flecha izquierda
const renderLeftNav = (
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled: boolean
) => (
  <button className='custom-left-nav' onClick={onClick} disabled={disabled}>
    <FaChevronLeft />
  </button>
)

// Función para personalizar la flecha derecha
const renderRightNav = (
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled: boolean
) => (
  <button className='custom-right-nav' onClick={onClick} disabled={disabled}>
    <FaChevronRight />
  </button>
)

const Carousel = () => {
  // TODO: quitar estilos
  const carouselStyle = {
    backgroundColor: 'yellow' // El fondo rojo
  }

  return (
    <div className='carousel-container' style={carouselStyle}>
      <ImageGallery
        items={images}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        autoPlay={false}
        slideInterval={5000}
        renderLeftNav={renderLeftNav} // Usar flecha personalizada
        renderRightNav={renderRightNav} // Usar flecha personalizada
      />
    </div>
  )
}

export default Carousel
