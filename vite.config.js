import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// Configure Vite with the plugin
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Automatically open the report in the browser
      gzipSize: true, // Show the gzip size
      brotliSize: true // Show the Brotli size
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'] // Example of code-splitting
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
