import logo from '../../assets/images/Logo.webp'
import '../../styles/Header.css'

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img
      src={logo}
      alt='Logotipo de OdontoPlus'
      className={`${className || ''}`}
    />
  );
};

export default Logo;