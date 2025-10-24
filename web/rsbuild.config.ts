import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    inject: "body",
    scriptLoading: "blocking",
    tags: [
    {
      tag: "script",
      attrs: {
        type: "text/javascript"
      }
    }
  ]
  },
  server: {
    port: 1212,
    open: true,
    proxy: {
      '/api': 'http://localhost:7676/api'
    }
  },
});
