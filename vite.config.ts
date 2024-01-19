import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    vue(),
    checker({ typescript: true }),
  ],
  server: {
    port: 8070,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
