import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen:true,
  plugins: [
    vue(),
    ViteAliases(),
  ],
  server: {
    open:true,
    proxy: {
      '/pays': {
        target:'http://localhost:3000',
        changeOrigin: true
      },
      '/todo': {
        target:'http://localhost:3000',
        changeOrigin: true
      },
    }
  }
})
