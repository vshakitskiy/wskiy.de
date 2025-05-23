import preact from "@preact/preset-vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv } from "vite"

const env = loadEnv(process.env.NODE_ENV as string, process.cwd(), "VITE_")

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(), tailwindcss()],
  server: {
    port: 5000,
    proxy: {
      "/api/ipdata": {
        target: "https://api.ipdata.co",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/ipdata/, `?api-key=${env.VITE_IPDATA_API_KEY}`),
      },
    },
  },
  // base: "/www/",
  resolve: {
    alias: {
      "@": "/src",
      "@data": "/src/data",
      "@components": "/src/components",
      "@assets": "/src/assets",
    },
  },
})
