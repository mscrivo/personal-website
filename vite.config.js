import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    vitePluginFaviconsInject('./src/assets/logo/logo-bw.png'),
  ],
})
