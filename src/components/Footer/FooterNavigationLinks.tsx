import { Link as RouterLink } from "react-router-dom";
import { VStack, Link } from "@chakra-ui/react";

const FooterNavigationLinks = () => {
  return (
    <VStack spacing={{ base: 1, md: 3 }} textAlign="center">
      <Link as={RouterLink} to="/services" fontSize={{ base: "8px", md: "14px", lg: "16px" }}>SERVICIOS</Link>
      <Link as={RouterLink} to="/about-us" fontSize={{ base: "8px", md: "14px", lg: "16px" }}>SOBRE NOSOTROS</Link>
      <Link as={RouterLink} to="/contact" fontSize={{ base: "8px", md: "14px", lg: "16px" }}>CONTACTO</Link>
    </VStack>
  );
};

export default FooterNavigationLinks;
