import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     external: ['react', 'react-dom', 'js-cookie'],
  //   },
  // },
  envDir: '.',
  define: {
    'process.env': loadEnv(process.env.NODE_ENV, process.cwd()),
  }
})
