import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Use relative paths
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  publicDir: 'public',
  server: {
    port: 5173,
    open: true,
  },
}); 