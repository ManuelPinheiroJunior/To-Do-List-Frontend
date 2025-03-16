import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';
 
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/react-vite-deploy',
  plugins: [vercel()],
});