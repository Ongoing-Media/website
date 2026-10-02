import type { APIRoute } from 'astro';
import { site } from '../config/site';

// Gemaakt uit de gedeelde sitegegevens, zodat naam en kleur op één plek staan.
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: site.name,
      short_name: 'Ongoing',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: site.themeColor,
      background_color: site.themeColor,
      display: 'browser',
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
