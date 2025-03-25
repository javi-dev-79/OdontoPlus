import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#e0f2f1",
      100: "#b2dfdb",
      200: "#80cbc4",
      300: "#4db6ac",
      400: "#26a69a",
      500: "#004D40", // ✅ Color principal
      600: "#004037",
      700: "#00362f",
      800: "#002b26",
      900: "#001f1b",
    },
    secondary: {
      50: "#e0f2f1",
      100: "#b2dfdb",
      200: "#80cbc4",
      300: "#4db6ac",
      400: "#26a69a",
      500: "#00796B", // ✅ Color secundario
      600: "#00685c",
      700: "#00574d",
      800: "#00463e",
      900: "#00352f",
    },
    tertiary: {
      50: "#e6e6e6",
      100: "#cccccc",
      200: "#b3b3b3",
      300: "#999999",
      400: "#808080",
      500: "#333333", // ✅ Color terciario
      600: "#2e2e2e",
      700: "#292929",
      800: "#242424",
      900: "#1f1f1f",
    },
    neutral: {
      500: "#CCCCCC", // ✅ Color neutro
    },
    white: {
      500: "FFFFFF"
    },
    danger: {
      500: "#AE0B0B", // ✅ Color de error / peligro
    },
    modify: {
      500: "#0057af", // ✅ Color para modificar
    },
    text: {
      default: "#333333",
      button: "#333333", // Texto del botón normal
      buttonHover: "#004D40", // Texto del botón en hover
    },
    background: {
      default: "#FFFFFF",
      header: "primary.500", // ✅ Fondo del header
      button: "#FFFFFF", // Fondo del botón UserActions
      buttonHover: "#FFFFFF",
      deleteButton: "danger.500", // ✅ Fondo del botón de eliminar
      editButton: "modify.500", // ✅ Fondo del botón de modificar
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      variants: {
        userAction: {
          bg: "background.button", // Fondo blanco
          color: "text.button", // Texto gris oscuro
          _hover: {
            color: "text.buttonHover", // Texto verde oscuro en hover
          },
        },
      },
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Roboto', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "background.default",
        color: "text.default",
      },
      header: {
        bg: "background.header",
      },
    },
  },
});

export default theme;
