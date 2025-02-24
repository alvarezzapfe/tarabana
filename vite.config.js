import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Importante para que los archivos se sirvan correctamente en Vercel
  build: {
    outDir: "dist", // La carpeta donde se guarda la compilación
    assetsDir: "assets", // Para evitar conflictos con los assets
  },
});
