import { useState } from 'react'
import '../../styles/services.css'

interface ServiceCardProps {
  imageUrl: string
  hoverImageUrl: string
  title: string
  description: string
  moreInfoUrl: string
}

const ServiceCard = ({
  imageUrl,
  hoverImageUrl,
  title,
  description,
  moreInfoUrl
}: ServiceCardProps) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div className='service-card'>
      <div
        className='service-card-image-container'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={hovered ? hoverImageUrl : imageUrl}
          alt='service'
          className='service-card-image'
        />
      </div>
      <h3 className='service-card-title'>{title}</h3>
      <p className='service-card-description'>{description}</p>
      <a href={moreInfoUrl} className='service-card-button'>
        Más información
      </a>
    </div>
  )
}

export default ServiceCard

// import { useState } from 'react'

// interface ServiceCardProps {
//   imageUrl: string
//   hoverImageUrl: string
//   title: string
//   description: string
//   moreInfoUrl: string
// }

// const ServiceCard = ({
//   imageUrl,
//   hoverImageUrl,
//   title,
//   description,
//   moreInfoUrl
// }: ServiceCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className='service-card'
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <img
//         src={isHovered ? hoverImageUrl : imageUrl}
//         alt={title}
//         className='service-card-image'
//       />
//       <div className='service-card-content'>
//         <h3 className='service-card-title'>{title}</h3>
//         <p className='service-card-description'>{description}</p>
//         <a href={moreInfoUrl} className='service-card-button'>
//           Más información
//         </a>
//       </div>
//     </div>
//   )
// }

// export default ServiceCard