import { Link as RouterLink } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import logo from "../../assets/images/Logo.webp";

const Logo = () => {
  return (
    <RouterLink to="/">
      <Image
        src={logo}
        alt="Logotipo de OdontoPlus"
        cursor="pointer"
        boxSize="70px" // Ajusta el tamaño según sea necesario
        objectFit="contain"
      />
    </RouterLink>
  );
};

export default Logo;
