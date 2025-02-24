import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Asegúrate de que esto esté bien
  },
  server: {
    fs: {
      allow: ["."], // Esto permite acceder a archivos en la raíz del proyecto
    },
  },
});
