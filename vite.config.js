import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "frontend", // Asegura que Vite trabaje dentro de `frontend`
  build: {
    outDir: "dist", // Deja esto así para que genere `dist` dentro de `frontend`
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
});
