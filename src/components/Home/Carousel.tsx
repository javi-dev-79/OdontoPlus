// import ImageGallery from 'react-image-gallery'
// import 'react-image-gallery/styles/css/image-gallery.css'
// import '../../styles/home.css'
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// import { useState } from 'react'

// import Slide1 from '../../assets/images/Slide 1.webp'
// import Slide2 from '../../assets/images/Slide 2.webp'
// import Slide3 from '../../assets/images/Slide 3.webp'

// // Definimos la información para cada slide
// const slidesInfo = [
//   {
//     image: Slide1,
//     title: 'Transforma tu Vida Amorosa',
//     description: 'Descubre las claves para encontrar el amor verdadero'
//   },
//   {
//     image: Slide2,
//     title: 'Mejora tus Relaciones',
//     description: 'Aprende a construir conexiones significativas y duraderas'
//   },
//   {
//     image: Slide3,
//     title: 'Encuentra tu Camino',
//     description: 'Te ayudamos a alcanzar tus metas en el amor y las relaciones'
//   }
// ]

// const images = slidesInfo.map((slide) => ({
//   original: slide.image,
//   thumbnail: slide.image
// }))

// const renderLeftNav = (
//   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
//   disabled: boolean
// ) => (
//   <button className='custom-left-nav' onClick={onClick} disabled={disabled}>
//     <FaChevronLeft />
//   </button>
// )

// const renderRightNav = (
//   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
//   disabled: boolean
// ) => (
//   <button className='custom-right-nav' onClick={onClick} disabled={disabled}>
//     <FaChevronRight />
//   </button>
// )

// const Carousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0)

//   const handleSlideChange = (currentIndex: number) => {
//     setCurrentSlide(currentIndex)
//   }

//   return (
//     <div className='carousel-container'>
//       <ImageGallery
//         items={images}
//         showThumbnails={false}
//         showFullscreenButton={false}
//         showPlayButton={false}
//         autoPlay={false}
//         slideInterval={5000}
//         renderLeftNav={renderLeftNav}
//         renderRightNav={renderRightNav}
//         onSlide={handleSlideChange} // Manejar el cambio de slide
//       />
//       <div className='carousel-content'>
//         <h2 className='carousel-title'>{slidesInfo[currentSlide].title}</h2>
//         <p className='carousel-description'>
//           {slidesInfo[currentSlide].description}
//         </p>
//         <button className='carousel-cta-button'>PIDE CITA</button>
//       </div>
//     </div>
//   )
// }

// export default Carousel


import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import '../../styles/home.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useState } from 'react'

import Slide1 from '../../assets/images/Slide 1.webp'
import Slide2 from '../../assets/images/Slide 2.webp'
import Slide3 from '../../assets/images/Slide 3.webp'

const slidesInfo = [
  {
    image: Slide1,
    title: 'IMPLANTOLOGÍA',
    description: 'Tus implantes y dientes fijos en 24 horas'
  },
  {
    image: Slide2,
    title: 'PERIODONCIA',
    description: 'Recupera la salud de tus encías'
  },
  {
    image: Slide3,
    title: 'ESTÉTICA DENTAL',
    description: 'Hacemos realidad la sonrisa de tus sueños'
  }
]

const images = slidesInfo.map((slide) => ({
  original: slide.image,
  thumbnail: slide.image
}))

const renderLeftNav = (
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled: boolean
) => (
  <button className='custom-left-nav' onClick={onClick} disabled={disabled}>
    <FaChevronLeft />
  </button>
)

const renderRightNav = (
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled: boolean
) => (
  <button className='custom-right-nav' onClick={onClick} disabled={disabled}>
    <FaChevronRight />
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
        onSlide={handleSlideChange} // Manejar el cambio de slide
      />
      <div className='carousel-content'>
        <h1 className='carousel-title'>{slidesInfo[currentSlide].title}</h1>
        <p className='carousel-description'>
          {slidesInfo[currentSlide].description}
        </p>
        <button className='carousel-cta-button'>PIDE CITA</button>

        {/* Paginadores */}
        <div className='carousel-pagination'>
          {slidesInfo.map((_, index) => (
            <div
              key={index}
              className={`carousel-pagination-dot ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
