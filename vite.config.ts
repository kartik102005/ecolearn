import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",         // allow access from external IPs (like ngrok)
    port: 8080,
    allowedHosts: true ,     // allow any host (safe for development)
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["lucide-react", "framer-motion"],
          "vendor-utils": ["@tanstack/react-query", "react-hook-form", "zod"],
        },
      },
    },
  },
});
