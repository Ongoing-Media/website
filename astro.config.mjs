import { defineConfig } from 'astro/config';
import { site } from './src/config/site.ts';

export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  build: {
    // CSS altijd als los bestand: nodig voor de strenge beveiligingsregels (CSP) in netlify.toml.
    inlineStylesheets: 'never',
  },
  vite: {
    // Ook scripts nooit in de pagina zelf zetten (zelfde reden: CSP).
    build: { assetsInlineLimit: 0 },
  },
});
