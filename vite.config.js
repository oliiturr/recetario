import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa' 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['web-app-manifest-192x192.png', 'web-app-manifest-512.png', 'favicon.svg'],
      manifest: {
        name: 'Mi Recetario',
        short_name: 'Recetario',
        start_url: '/',
        display: 'standalone',
        background_color: '#93676b',
        theme_color: '#93676b',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  
})
