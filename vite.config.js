import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "frontend", // 📌 Especifica que el proyecto se encuentra dentro de `frontend`
  build: {
    outDir: "dist", // 📌 La carpeta de salida sigue siendo `dist`
  },
  server: {
    fs: {
      allow: [".."], // Permite acceso a archivos fuera de `frontend`
    },
  },
});
