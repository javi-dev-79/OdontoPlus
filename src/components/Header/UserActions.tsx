import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { Button, Flex } from "@chakra-ui/react";

const UserActions = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Usuario cerró sesión correctamente");
      navigate("/home");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Flex>
      {currentUser ? (
        <Button
          colorScheme="red"
          variant="solid"
          onClick={handleLogout}
          aria-label="Cerrar sesión"
        >
          SALIR
        </Button>
      ) : (
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={handleLogin}
          aria-label="Iniciar sesión"
        >
          INGRESAR
        </Button>
      )}
    </Flex>
  );
};

export default UserActions;
