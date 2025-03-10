import ServiceCard from '../components/Serv/ServiceCard'
import '../styles/Home.css'

import logoCard from '../assets/images/Logo Card Text.jpg'

import ImageCard1 from '../assets/images/Implantes_dientes.webp'
import ImageCard2 from '../assets/images/ortodoncia_invisible.webp'
import ImageCard3 from '../assets/images/blanqueamiento_dental.webp'
import ImageCard4 from '../assets/images/periodoncia.webp'
import ImageCard5 from '../assets/images/endodoncia.webp'
import ImageCard6 from '../assets/images/cirugia-maxilofacial-cabecera.webp'
import ImageCard7 from '../assets/images/tratamientos_dolor_orofacial.webp'
import ImageCard8 from '../assets/images/antiage-1.webp'
import ImageCard9 from '../assets/images/apena_sueno_dispositivo_dia.webp'
import { Helmet } from 'react-helmet-async'

const images = [
  {
    imageUrl: ImageCard1,
    hoverImageUrl: logoCard,
    title: 'IMPLANTOLOGÍA',
    description: 'Tus implantes y dientes fijos en 24',
    moreInfoUrl: '/contact'
  },
  {
    imageUrl: ImageCard2,
    hoverImageUrl: logoCard,
    title: 'ORTODONCIA INVISIBLE',
    description:
      'Ortodoncia invisible con alineadores removibles transparentes',
    moreInfoUrl: '/contact'
  },
  {
    imageUrl: ImageCard3,
    hoverImageUrl: logoCard,
    title: 'BLANQUEAMIENTO DENTAL',
    description: 'Una sonrisa luminosa que deja huella',
    moreInfoUrl: '/contact'
  },
  {
    imageUrl: ImageCard4,
    hoverImageUrl: logoCard,
    title: 'PERIODONCIA',
    description:
      'La salud de las encías es clave para evitar perder los dientes o implantes',
    moreInfoUrl: '/contact'
  },
  {
    imageUrl: ImageCard5,
    hoverImageUrl: logoCard,
    title: 'ENDODONCIA',
    description:
      'Técnica rotatoria o mecánica, no manual, y por especialistas con Máster en Endodoncia Avanzada',
    moreInfoUrl: '/contact'
  },
  {
    imageUrl: ImageCard6,
    hoverImageUrl: logoCard,
    title: 'CIRUGÍA MAXILOFACIAL',
    description:
      'Atención y seguimiento post-intervención de los tratamientos quirúrgicos',
    moreInfoUrl: '/contact'
  },
  {
    imageUrl: ImageCard7,
    hoverImageUrl: logoCard,
    title: 'DOLOR OROFACIAL',
    description:
      'Tratamiento del dolor orofacial y trastornos cérvico-cráneo-mandibulares',
    moreInfoUrl: '/contact'
  },
  {
    imageUrl: ImageCard8,
    hoverImageUrl: logoCard,
    title: 'ESTÉTICA FACIAL',
    description: 'Equipo experto en belleza y medicina antienvejecimiento',
    moreInfoUrl: '/contact'
  },
  {
    imageUrl: ImageCard9,
    hoverImageUrl: logoCard,
    title: 'APNEA DEL SUEÑO',
    description: 'Detectar y tratar apneas del sueño leves y moderadas',
    moreInfoUrl: '/contact'
  }
]

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Servicios | OdontoPlus</title>
        <meta
          name='description'
          content='Explora nuestros tratamientos dentales especializados para el cuidado de tu salud bucal.'
        />
        <meta property='og:title' content='Servicios | OdontoPlus' />
        <meta
          property='og:description'
          content='Conoce los tratamientos de ortodoncia, implantes, blanqueamiento y más en OdontoPlus.'
        />
        <meta
          property='og:image'
          content='https://odontoplus.netlify.app/services.webp'
        />
        <meta
          property='og:url'
          content='https://odontoplus.netlify.app/services'
        />
        <meta property='og:type' content='website' />
      </Helmet>

      <main>
        <div className='services-text-content'>
          <h1>NUESTROS TRATAMIENTOS</h1>
          <h2>ESPECIALIDADES PARA UNA SONRISA PERFECTA</h2>
          <p>
            En OdontoPlus, ofrecemos tratamientos de vanguardia, adaptados a tus
            necesidades y realizados por un equipo de expertos. Con la última
            tecnología, te ayudamos a lograr una sonrisa saludable y radiante. A
            continuación, te presentamos las especialidades y tratamientos que
            ponemos a tu disposición, para que consigas la sonrisa que mereces.
          </p>
        </div>

        <div className='service-grid'>
          {images.map((image, index) => (
            <ServiceCard
              key={index}
              imageUrl={image.imageUrl}
              hoverImageUrl={image.hoverImageUrl}
              title={image.title}
              description={image.description}
              moreInfoUrl={image.moreInfoUrl}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default Services
