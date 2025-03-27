import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    define: {
    'import.meta.env.VITE_GOOGLE_PLACE_API_KEY': 
      JSON.stringify(process.env.VITE_GOOGLE_PLACE_API_KEY)
  }
  },
})