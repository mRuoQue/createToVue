import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { fileURLToPath } from 'node:url'
const pathSrc = fileURLToPath(new URL('./src', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": pathSrc,
    },
    extensions:['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
  },
});
