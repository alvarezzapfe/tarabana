import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // base: "/", // opcional, por default ya es "/"
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
