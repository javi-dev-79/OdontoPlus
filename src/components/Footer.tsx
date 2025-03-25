import { Box, Grid } from "@chakra-ui/react";
import FooterContactInfo from "./Footer/FooterContactInfo";
import FooterNavigationLinks from "./Footer/FooterNavigationLinks";
import FooterSocialMedia from "./Footer/FooterSocialMedia";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="neutral.500"
      color="text.default"
      width="100%"
      mt="auto"
      py={{ base: "6px", md: "15px", lg: "20px" }} // 🔹 Reduce padding en móviles
    >
      {/* Contenedor en cuadrícula 3x1 siempre */}
      <Grid
        templateColumns="repeat(3, 1fr)" // 🔹 Siempre 3 columnas
        gap={{ base: 2, md: 6, lg: 8 }} // 🔹 Reduce espacio en móviles
        alignItems="center"
        justifyItems="center"
        maxW="1200px"
        mx="auto"
        px={{ base: 2, md: 6, lg: 8 }} // 🔹 Menos padding en mobile
      >
        <FooterContactInfo />
        <FooterNavigationLinks />
        <FooterSocialMedia />
      </Grid>
    </Box>
  );
};

export default Footer;
