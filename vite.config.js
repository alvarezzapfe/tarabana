import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Asegura que Vercel tome la carpeta correcta
  },
  server: {
    fs: {
      allow: [".."], // Permite acceder a archivos fuera del directorio raíz si es necesario
    },
  },
});
