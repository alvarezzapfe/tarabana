import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "frontend", // Define la raíz del proyecto
  build: {
    outDir: "dist", // Output en frontend/dist
  },
  server: {
    fs: {
      allow: [".."], // Permite acceder a archivos fuera de frontend/
    },
  },
});
