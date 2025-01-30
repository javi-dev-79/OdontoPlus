import logo from '../../assets/images/Logo.webp'
import '../../styles/Header.css'

const Logo = () => {
  return (
    <div className='logo'>
      <img
        src={logo}
        alt='OdontoPlus Logo - Ir a la página principal'
        className='logo-image'
      />
    </div>
  )
}

export default Logo







