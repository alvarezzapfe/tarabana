import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Para evitar problemas de rutas en producción
  build: {
    outDir: "dist", // Confirma que el build se genera en dist/
  },
  server: {
    fs: {
      allow: [".."], // Permitir acceso a archivos fuera de frontend/
    },
  },
});
