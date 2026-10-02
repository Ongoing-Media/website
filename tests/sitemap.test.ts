import { describe, expect, it } from 'vitest';
import { buildSitemap } from '../src/lib/sitemap';
import { GET } from '../src/pages/sitemap.xml';

describe('buildSitemap', () => {
  it('zet elk adres één keer in de sitemap', () => {
    const xml = buildSitemap(['/', '/work/', '/work/'], 'https://ongoingmedia.nl');
    expect(xml).toContain('<loc>https://ongoingmedia.nl/</loc>');
    expect(xml.match(/<loc>https:\/\/ongoingmedia\.nl\/work\/<\/loc>/g)).toHaveLength(1);
  });

  it('maakt speciale tekens veilig', () => {
    const xml = buildSitemap(["/a&b'c/"], 'https://ongoingmedia.nl');
    expect(xml).toContain('/a&amp;b&apos;c/');
  });
});

describe('sitemap.xml', () => {
  it('geeft XML met de pagina’s, zonder bedankpagina', async () => {
    // @ts-expect-error alleen `site` is nodig voor deze route
    const response = await GET({ site: new URL('https://ongoingmedia.nl') });
    expect(response.headers.get('Content-Type')).toContain('application/xml');
    const xml = await response.text();
    expect(xml).toContain('<loc>https://ongoingmedia.nl/what-we-do/</loc>');
    expect(xml).not.toContain('/contact/thanks/');
  });
});
