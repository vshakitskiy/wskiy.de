import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    tailwindcss()
  ],
  server: {
    port: 3000
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
