import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/UseAuth";
import { db } from "../../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { Flex, List, ListItem, Link } from "@chakra-ui/react";

const Navigation = () => {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, "app-users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setIsAdmin(userData.role === "admin");
          }
        } catch (error) {
          console.error("Error obteniendo rol del usuario:", error);
        }
      }
    };

    checkAdminRole();
  }, [currentUser]);

  return (
    <Flex as="nav" aria-label="Menú principal">
      <List display="flex" gap={4} alignItems="center">
        <ListItem>
          <Link as={RouterLink} to="/" fontWeight="bold" color="white" _hover={{ color: "gray.300" }}>
            INICIO
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="/services" aria-label="Ir a la página de servicios" fontWeight="bold" color="white" _hover={{ color: "gray.300" }}>
            SERVICIOS
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="/about-us" aria-label="Ir a la página de sobre nosotros" fontWeight="bold" color="white" _hover={{ color: "gray.300" }}>
            SOBRE NOSOTROS
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="/contact" aria-label="Ir a la página de contacto" fontWeight="bold" color="white" _hover={{ color: "gray.300" }}>
            CONTACTO
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="/online-dating" aria-label="Ir a la página de citas en línea" fontWeight="bold" color="white" _hover={{ color: "gray.300" }}>
            CITAS EN LÍNEA
          </Link>
        </ListItem>
        {isAdmin && (
          <ListItem>
            <Link as={RouterLink} to="/admin-panel" aria-label="Ir al panel de administración" fontWeight="bold" color="red.300" _hover={{ color: "red.500" }}>
              ADMIN
            </Link>
          </ListItem>
        )}
      </List>
    </Flex>
  );
};

export default Navigation;
