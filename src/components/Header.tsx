import { useRef, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useAuth } from "../contexts/UseAuth";
import Logo from "./Header/Logo";
import Navigation from "./Header/Navigation";
import UserActions from "./Header/UserActions";
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FaSignOutAlt, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Usuario cerró sesión correctamente");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Box as="header" bg="teal.700" w="100%" py={4} px={6} shadow="md">
      <Flex maxW="1200px" mx="auto" justify="space-between" align="center">
        {/* ✅ Logo SIEMPRE visible */}
        <Logo />

        {/* ✅ Navigation y UserActions solo en desktop (mayor a 1024px) */}
        <Flex display={{ base: "none", xl: "flex" }} flex="1" justify="center">
          <Navigation />
        </Flex>

        <Flex display={{ base: "none", xl: "flex" }}>
          <UserActions />
        </Flex>

        {/* ✅ Botón de menú hamburguesa solo en mobile (≤ 1024px), alineado a la derecha */}
        <Flex display={{ base: "flex", xl: "none" }} ml="auto">
          <IconButton
            aria-label={currentUser ? "Cerrar sesión" : "Iniciar sesión"}
            color="white"
            bg="transparent"
            _hover={{ bg: "transparent", color: "gray.300" }}
            icon={currentUser ? <FaSignOutAlt /> : <FaSignInAlt />}
            onClick={currentUser ? handleLogout : () => navigate("/login")}
          />

          <IconButton
            ref={btnRef}
            aria-label="Abrir menú"
            color="white"
            bg="transparent"
            _hover={{ bg: "transparent", color: "gray.300" }}
            icon={isOpen ? <FaTimes /> : <FaBars />}
            onClick={onOpen}
          />
        </Flex>
      </Flex>

      {/* ✅ Menú lateral (Drawer) solo en pantallas ≤ 1024px */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt={10}>
            <VStack align="start" spacing={4}>
              <RouterLink to="/" onClick={onClose}>Inicio</RouterLink>
              <RouterLink to="/services" onClick={onClose}>Servicios</RouterLink>
              <RouterLink to="/about-us" onClick={onClose}>Sobre Nosotros</RouterLink>
              <RouterLink to="/contact" onClick={onClose}>Contacto</RouterLink>
              <RouterLink to="/online-dating" onClick={onClose}>Citas en Línea</RouterLink>
              <RouterLink to={currentUser ? "/" : "/login"} onClick={currentUser ? handleLogout : onClose}>
                {currentUser ? "SALIR" : "INGRESAR"}
              </RouterLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
