import { Link } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import '../../styles/Home.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useState } from 'react'

import Slide1 from '../../assets/images/Slide 1.webp'
import Slide2 from '../../assets/images/Slide 2.webp'
import Slide3 from '../../assets/images/Slide 3.webp'

const slidesInfo = [
  {
    image: Slide1,
    title: 'ESTÉTICA DENTAL',
    description: 'Hacemos realidad la sonrisa de tus sueños',
    alt: 'Imagen de estética dental'
  },
  {
    image: Slide2,
    title: 'PERIODONCIA',
    description: 'Recupera la salud de tus encías',
    alt: 'Imagen de muela con tratamiento de periodoncia'
  },
  {
    image: Slide3,
    title: 'IMPLANTOLOGÍA',
    description: 'Tus implantes y dientes fijos en 24 horas',
    alt: 'Imagen de instrumental para implantes dentales'
  }
]

const images = slidesInfo.map((slide) => ({
  original: slide.image,
  thumbnail: slide.image,
  alt: slide.alt
}))

const renderLeftNav = (
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled: boolean
) => (
  <button
    className='custom-left-nav'
    onClick={onClick}
    disabled={disabled}
    aria-label='Anterior'
  >
    <FaChevronLeft aria-hidden='true' />
  </button>
)

const renderRightNav = (
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled: boolean
) => (
  <button
    className='custom-right-nav'
    onClick={onClick}
    disabled={disabled}
    aria-label='Siguiente'
  >
    <FaChevronRight aria-hidden='true' />
  </button>
)

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleSlideChange = (currentIndex: number) => {
    setCurrentSlide(currentIndex)
  }

  return (
    <div className='carousel-container'>
      <ImageGallery
        items={images}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        autoPlay={false}
        slideInterval={5000}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        onSlide={handleSlideChange}
        aria-label='Carrusel de imágenes'
      />
      <div className='carousel-content'>
        <h1 className='carousel-title'>{slidesInfo[currentSlide].title}</h1>
        <p className='carousel-description'>
          {slidesInfo[currentSlide].description}
        </p>
        <Link to='/contact' className='carousel-cta-button'>
          PIDE CITA
        </Link>

        {/* Paginators */}
        <div className='carousel-pagination'>
          {slidesInfo.map((_, index) => (
            <div
              key={index}
              className={`carousel-pagination-dot ${index === currentSlide ? 'active' : ''}`}
              aria-label={`Slide ${index + 1} de ${slidesInfo.length}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
