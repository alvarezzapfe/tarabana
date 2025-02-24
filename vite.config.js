import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "frontend", // Le indica a Vite que el proyecto está en frontend/
  build: {
    outDir: "dist", // Generará el build en frontend/dist
  },
  server: {
    fs: {
      allow: [".."], // Permite acceder a archivos fuera de frontend
    },
  },
});
