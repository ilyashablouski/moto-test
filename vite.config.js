import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

const pageData = {
  '/index.html': {
    title: 'Main Page',
  },
};

export default defineConfig({
  plugins: [
    handlebars({
      context(pagePath) {
        return pageData[pagePath] || {};
      },
      partialDirectory: [resolve(__dirname, 'src/components'), resolve(__dirname, 'src/template/partials')],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },
});
