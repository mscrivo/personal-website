import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    vitePluginFaviconsInject('./src/assets/logo/logo-bw.png'),
  ],
  build: {
    chunkSizeWarningLimit: 950,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replaceAll('\\', '/')

          if (normalizedId.includes('/node_modules/three/examples/')) {
            return 'three-examples'
          }

          if (normalizedId.includes('/node_modules/three/')) {
            return 'three-core'
          }

          if (normalizedId.includes('/node_modules/@react-three/fiber/')) {
            return 'react-three-fiber'
          }

          if (normalizedId.includes('/node_modules/@react-three/drei/')) {
            return 'react-three-drei'
          }

          if (normalizedId.includes('/node_modules/framer-motion/')) {
            return 'motion'
          }

          if (
            normalizedId.includes('/node_modules/react/') ||
            normalizedId.includes('/node_modules/react-dom/') ||
            normalizedId.includes('/node_modules/react-router-dom/')
          ) {
            return 'react'
          }

          return
        },
      },
    },
  },
})
