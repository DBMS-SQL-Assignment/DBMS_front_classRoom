import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// no tailwindcss import here 👇
export default defineConfig({
  plugins: [react(), tailwindcss(),],
})
