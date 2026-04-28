import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  resolve: {
    tsconfigPaths: true
},
  plugins: [react(), svgr({include: "**/*.svg?react"})],
  base: '/to-do-app/',
});
