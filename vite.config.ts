import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // In production, ensure env vars are not bundled if they contain secrets
    ...(mode === 'production' && {
      'import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY': JSON.stringify(''),
      'import.meta.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(''),
      'import.meta.env.VITE_GOOGLE_CLIENT_SECRET': JSON.stringify(''),
    })
  },
}));
