import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  // Establecemos la raíz del proyecto Vite al directorio 'frontend'
  root: resolve(__dirname, "frontend"),
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "frontend/src"),
    },
  },
});
