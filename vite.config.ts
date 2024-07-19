import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // Assuming your backend API is running on localhost:8080
        target: 'http://localhost:8080',
        changeOrigin: true, // this is necessary to handle CORS
        secure: false, // set to false if your backend runs on http but your frontend uses https
        rewrite: path => path.replace(/^\/api/, '/api') // might not be needed if your API path already starts with /api
      }
    }
  },

  plugins: [
    react({
      tsDecorators: true
    }),
    visualizer({
      template: 'treemap', // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyze.html' // will be saved in project's root
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      components: path.resolve(__dirname, 'src/components/'),
      shared: path.resolve(__dirname, './src/shared/'),
      public: path.resolve(__dirname, 'public/'),
      pages: path.resolve(__dirname, 'src/pages'),
      types: path.resolve(__dirname, 'src/@types/')
    }
  }
});
