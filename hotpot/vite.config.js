import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// 本地默认 '/'；GitHub Actions 里通过 VITE_BASE=/仓库名/ 注入
export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE || '/',
  server: {
    host: true,
    port: 5173,
  },
})
