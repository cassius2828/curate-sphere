import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Enable polling to fix issues with file changes not being detected
    },  hmr: {
      overlay: true, // Show an overlay with errors
    },
  },
})
