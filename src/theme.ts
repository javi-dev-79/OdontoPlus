// import { createSystem, defaultBaseConfig, defineConfig } from "@chakra-ui/react"

// const customConfig = defineConfig({
//   theme: {
//     tokens: {
//       colors: {
//         brand: {
//           500: { value: "tomato" }
//         }
//       }
//     }
//   }
// })

// export const system = createSystem(defaultBaseConfig, customConfig)
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#f5f7ff",
      100: "#e4e8ff",
      200: "#c5caff",
      300: "#a6acff",
      400: "#8790ff",
      500: "#6872ff",
      600: "#5059cc",
      700: "#3a4399",
      800: "#282e66",
      900: "#181933",
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
});

export default theme;
