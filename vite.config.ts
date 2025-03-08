import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // TODO: eliminar cuando termine el server
  server: {
    host: true, // Esto permite que el servidor escuche en todas las interfaces de red
    port: 5173 // El puerto en el que quieres que se ejecute el servidor (ya lo mencionaste)
  }
})

