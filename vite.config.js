import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    fs: {
      allow: ["."], // Permite acceso a archivos en la raíz
    },
  },
});
