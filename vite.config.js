import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'vite-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        { src: '_redirects', dest: 'dist' }
      ]
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.quotable.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})