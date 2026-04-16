import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3457,
    proxy: {
      '/api': {
        target: 'http://localhost:3458',
        changeOrigin: true,
      },
    },
  },
})
