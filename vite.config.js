import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Asegura rutas relativas
  build: {
    outDir: "dist", // La carpeta de salida
    assetsDir: "assets", // Carpeta de assets dentro de dist/
  },
});
