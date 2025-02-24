import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "frontend", // Indica a Vite que la carpeta principal es `frontend`
  build: {
    outDir: "dist", // La carpeta de salida seguirá siendo `dist`
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
});
