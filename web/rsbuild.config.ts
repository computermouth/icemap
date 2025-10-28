import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "Rsbuild title",
    inject: "body",
    scriptLoading: "blocking",
    tags: [
    {
      tag: "script",
      attrs: {
        type: "text/javascript"
      }
    }, {
      tag: "link",
      attrs: {
        href: "https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css",
        rel: "stylesheet"
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
