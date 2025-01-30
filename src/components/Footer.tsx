import FooterContactInfo from './Footer/FooterContactInfo'
import FooterNavigationLinks from './Footer/FooterNavigationLinks'
import FooterSocialMedia from './Footer/FooterSocialMedia'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className='footer' aria-label='Pie de página'>
      <div className='footer-content'>
        <FooterContactInfo />
        <FooterNavigationLinks />
        <FooterSocialMedia />
      </div>
    </footer>
  )
}

export default Footer
