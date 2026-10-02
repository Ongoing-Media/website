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
    build: {
      // Browsers waarvoor de CSS geschreven wordt. Zonder doelen voegt de CSS-verkleiner
      // "animation-timeline" samen met "animation", en die schrijfwijze begrijpen browsers nog niet.
      cssTarget: ['chrome115', 'safari16', 'firefox115'],
      // Ook scripts nooit in de pagina zelf zetten (zelfde reden: CSP).
      assetsInlineLimit: 0,
      // Eén stylesheet voor de hele site: minder verzoeken en na de eerste pagina uit de cache.
      cssCodeSplit: false,
    },
  },
});
