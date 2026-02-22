import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'MaVilleToulouse2026 — Toulouse',
        short_name: 'MaVilleToulouse2026',
        description: 'Quiz et comparateur des candidats aux municipales 2026 à Toulouse',
        theme_color: '#A4343A',
        background_color: '#f8fafc',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/image-_52_.ico',
            sizes: '48x48',
            type: 'image/x-icon'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      }
    })
  ],
})
