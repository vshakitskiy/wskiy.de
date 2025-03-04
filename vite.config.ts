import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { loadEnv } from "vite"

const env = loadEnv(
  process.env.NODE_ENV as string,
  process.cwd(),
  "VITE_"
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    proxy: {
      "/api/ipdata": {
        target: "https://api.ipdata.co",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ipdata/, ""),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.path += `?api-key=${env.VITE_IPDATA_API_KEY}`
          })
        }
      }
    }
  },
  // ! TEMP
  base: "/www/",
  resolve: {
    alias: {
      "@": "/src",
      "@data": "/src/data",
      "@components": "/src/components",
      "@assets": "/src/assets"
    }
  }
})
