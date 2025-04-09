import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 10000,
    host: '0.0.0.0',
    allowedHosts: ['front-kppe.onrender.com'] // 👈 Agrega esto
  }
})
