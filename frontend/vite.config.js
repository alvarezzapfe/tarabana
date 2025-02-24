import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Asegura rutas relativas en producción
  build: {
    outDir: "dist", // Output de la build en `frontend/dist`
  },
  server: {
    fs: {
      allow: [".."], // Permite acceder a archivos fuera de `frontend`
    },
  },
});
