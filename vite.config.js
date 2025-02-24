import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // IMPORTANTE para que funcione en producción
  build: {
    outDir: "dist",
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
});
