import { Link as RouterLink } from "react-router-dom";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import logo from "../../assets/images/Logo.webp";

const FooterContactInfo = () => {
  return (
    <VStack spacing={2} align="center">
      <RouterLink to="/">
        <Image
          src={logo}
          alt="OdontoPlus Logo"
          boxSize={{ base: "40px", md: "80px", lg: "100px" }} // 🔹 Reduce logo en móviles
          borderRadius="8px"
          objectFit="contain"
          cursor="pointer"
        />
      </RouterLink>
      <Box textAlign="center">
        <Text fontSize={{ base: "8px", md: "14px", lg: "16px" }}>Arucas | 928 928 928</Text>
        <Text fontSize={{ base: "8px", md: "14px", lg: "16px" }}>info@odontoplus.com</Text>
      </Box>
    </VStack>
  );
};

export default FooterContactInfo;
