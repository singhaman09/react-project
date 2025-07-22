import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this to your VitePWA configuration
workbox: {
  // Previous configuration...
  // Add this:
  navigateFallback: 'index.html',
  navigateFallbackDenylist: [/^\/api\//],
  skipWaiting: true,
  clientsClaim: true,
  // Other configurations...
}
})
