import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
   base: '/DashboardStructure/',
   
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' 
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./public', import.meta.url)),
    }
  },
  build: {
    chunkSizeWarningLimit: 10000,
  }
})
