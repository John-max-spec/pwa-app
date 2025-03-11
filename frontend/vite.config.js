import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',              // Ensures paths resolve correctly on Render
  build: {
    outDir: 'dist',       // This is default, but safe to be explicit
  },
})
