import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';
 
export default defineConfig({
  server: {
    port: process.env.VITE_BASE_URL as unknown as number,
  },
  plugins: [vercel()],
});