import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
  },
  server: {
    fs: {
      allow: [".."], // Esto permite acceder a archivos fuera de `frontend`
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
});
