import type { APIRoute } from 'astro';
import { indexableRoutes, caseRoute } from '../config/routes';
import { cases } from '../data/cases';
import { buildSitemap } from '../lib/sitemap';

// Voorbeeldcases staan niet in de sitemap; echte cases wel.
export const GET: APIRoute = ({ site }) => {
  const casePaths = cases.filter((item) => !item.placeholder).map((item) => caseRoute(item.slug));
  return new Response(buildSitemap([...indexableRoutes, ...casePaths], site!), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
