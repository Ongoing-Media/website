import type { APIRoute } from 'astro';
import { indexableRoutes } from '../config/routes';
import { buildSitemap } from '../lib/sitemap';

export const GET: APIRoute = ({ site }) =>
  new Response(buildSitemap(indexableRoutes, site!), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
