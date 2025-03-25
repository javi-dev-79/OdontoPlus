import { Link as RouterLink } from "react-router-dom";
import { IconButton, Button, VStack, Box, HStack } from "@chakra-ui/react";
import { FaInstagramSquare, FaLinkedin, FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const FooterSocialMedia = () => {
  return (
    <VStack spacing={4} align="center" width="100%" mr={{ base: "12px", sm: "16px", md: "0" }}>
      {/* Contenedor de redes sociales con ancho idéntico al botón */}
      <Box width="100%" maxW={{ base: "120px", sm: "150px", md: "230px" }}>
        <HStack
          width="100%"
          maxW="100%" // ✅ Se asegura que no sobrepase el ancho del botón
          spacing={{ base: "5px", sm: "8px", md: "12px" }} // ✅ Espaciado entre iconos
          justify="space-between"
        >
          {[
            { href: "https://www.instagram.com", icon: <FaInstagramSquare />, label: "Instagram" },
            { href: "https://www.facebook.com", icon: <FaFacebook />, label: "Facebook" },
            { href: "https://www.linkedin.com", icon: <FaLinkedin />, label: "LinkedIn" },
            { href: "https://www.youtube.com", icon: <IoLogoYoutube />, label: "YouTube" }
          ].map((social, index) => (
            <IconButton
              key={index}
              as="a"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              icon={social.icon}
              fontSize={{ base: "24px", sm: "28px", md: "34px", lg: "40px" }} // ✅ Aumentamos SOLO el tamaño de los iconos
              color="white"
              bg="primary.500"
              borderRadius="5px"
              flex="1" // ✅ Distribuye los iconos equitativamente dentro del ancho total
              minW="23%" // ✅ Contenedores cuadrados
              maxW="23%"
              h={{ base: "35px", sm: "40px", md: "50px", lg: "55px" }} // ✅ Mantiene el tamaño del contenedor
              p="0" // ✅ Elimina padding extra dentro del contenedor
              _hover={{ bg: "white", color: "primary.500" }}
            />
          ))}
        </HStack>
      </Box>

      {/* Botón con los estilos correctos y tamaño reducido en mobile */}
      <Button
        as={RouterLink}
        to="/contact"
        fontSize={{ base: "10px", sm: "12px", md: "14px", lg: "18px" }} 
        px={{ base: "10px", sm: "14px", md: "24px" }}
        py={{ base: "8px", sm: "12px", md: "18px", lg: "22px" }} 
        height={{ base: "35px", sm: "45px", md: "55px", lg: "65px" }} // ✅ Mantiene el tamaño del botón sin cambios
        width="100%"
        maxW={{ base: "120px", sm: "150px", md: "230px" }} // ✅ No se ha aumentado su tamaño
        bg="primary.500"
        color="white"
        border="3px solid"
        borderColor="white"
        borderRadius="15px"
        _hover={{
          bg: "white",
          color: "tertiary.500",
          borderColor: "primary.500",
          opacity: 0.9,
        }}
        aria-label="Ir a la página de contacto"
      >
        PIDE TU CITA YA
      </Button>
    </VStack>
  );
};

export default FooterSocialMedia;
