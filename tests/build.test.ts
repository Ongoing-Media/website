import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { cases } from '../src/data/cases';

// Controleert de echte gebouwde site. De build draait vooraf via tests/globalSetup.ts.
const dist = new URL('../dist/', import.meta.url).pathname;
const page = (path: string) => readFileSync(join(dist, path), 'utf8');

const pages = {
  home: 'index.html',
  whatWeDo: 'what-we-do/index.html',
  work: 'work/index.html',
  about: 'about/index.html',
  contact: 'contact/index.html',
  thanks: 'contact/thanks/index.html',
  privacy: 'privacy/index.html',
  notFound: '404.html',
};

function allFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? allFiles(full) : [full];
  });
}

describe('alle pagina’s', () => {
  it.each(Object.entries(pages))('%s bestaat en heeft titel, omschrijving en Engelse taal', (_, path) => {
    const html = page(path);
    expect(html).toMatch(/<html lang="en"[\s>]/);
    expect(html).toMatch(/<title>[^<]*Ongoing Media<\/title>/);
    expect(html).toMatch(/<meta name="description" content="[^"]{20,}">/);
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
  });

  it.each(Object.entries(pages))('%s heeft social share-gegevens en favicons', (_, path) => {
    const html = page(path);
    expect(html).toContain('<meta property="og:image" content="https://ongoingmedia.nl/og-image.jpg">');
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image">');
    expect(html).toContain('href="/favicon.svg"');
    expect(html).toContain('href="/apple-touch-icon.png"');
    expect(html).toContain('href="/site.webmanifest"');
  });

  it.each(Object.entries(pages))('%s laadt Helvetica via Adobe Fonts', (_, path) => {
    expect(page(path)).toContain('<link rel="stylesheet" href="https://use.typekit.net/rxa1hlv.css">');
  });

  it('heeft geen inline scripts of stijlen (nodig voor de beveiligingsregels)', () => {
    for (const path of Object.values(pages)) {
      const html = page(path);
      expect(html, path).not.toMatch(/<script(?![^>]*\b(?:src=|type="application\/ld\+json"))[^>]*>/);
      expect(html, path).not.toMatch(/<style[\s>]/);
      expect(html, path).not.toMatch(/\sstyle="/);
    }
  });
});

describe('homepage', () => {
  const html = page(pages.home);

  it('noemt ongoingmedia.nl als officieel adres', () => {
    expect(html).toContain('<link rel="canonical" href="https://ongoingmedia.nl/">');
  });

  it('toont de slogan en de drie pijlers', () => {
    expect(html).toContain('we turn behavior into strategy,');
    for (const word of ['strategy', 'campaigns', 'data']) expect(html).toContain(`>${word}`);
  });

  it('gebruikt de officiële logo’s met webveilige namen', () => {
    expect(html).toContain('src="/brand/logo-green.svg"');
    expect(html).toContain('src="/brand/logo-white.svg"');
    expect(page(pages.about)).toContain('src="/brand/logo-black.svg"');
  });

  it('toont foto’s als responsive WebP', () => {
    expect(html).toMatch(/<source[^>]+type="image\/webp"/);
    expect(html).toMatch(/srcset="[^"]+ 360w/);
    expect(html).toContain('loading="lazy"');
  });

  it('noemt geen creators of talentmanagement', () => {
    expect(html.toLowerCase()).not.toContain('talent');
    expect(html).not.toContain('[og_]');
  });
});

describe('contactformulier', () => {
  const html = page(pages.contact);

  it('is ingesteld voor Netlify Forms', () => {
    expect(html).toMatch(/<form[^>]+name="contact"[^>]+method="POST"[^>]+action="\/contact\/thanks\/"[^>]+data-netlify="true"/);
    expect(html).toMatch(/<input type="hidden" name="form-name" value="contact"[\s>]/);
  });

  it('heeft spam-bescherming met een verborgen honeypot-veld', () => {
    expect(html).toContain('netlify-honeypot="company-website"');
    expect(html).toMatch(/<input name="company-website" tabindex="-1"/);
  });

  it('vraagt naam, e-mail en bericht verplicht', () => {
    expect(html).toMatch(/name="name"[^>]+required/);
    expect(html).toMatch(/name="email" type="email"[^>]+required/);
    expect(html).toMatch(/name="message"[^>]+required/);
  });

  it('toont info@ongoingmedia.nl', () => {
    expect(html).toContain('href="mailto:info@ongoingmedia.nl"');
  });
});

describe('zoekmachines', () => {
  it('bedankpagina, 404 en voorbeeldcases staan op noindex', () => {
    expect(page(pages.thanks)).toContain('<meta name="robots" content="noindex">');
    expect(page(pages.notFound)).toContain('<meta name="robots" content="noindex">');
    for (const item of cases.filter((c) => c.placeholder)) {
      expect(page(`work/${item.slug}/index.html`)).toContain('<meta name="robots" content="noindex">');
    }
  });

  it('gewone pagina’s staan niet op noindex', () => {
    expect(page(pages.home)).not.toContain('noindex');
  });

  it('heeft een robots.txt met sitemap', () => {
    expect(page('robots.txt')).toContain('Sitemap: https://ongoingmedia.nl/sitemap.xml');
    expect(page('sitemap.xml')).toContain('<loc>https://ongoingmedia.nl/</loc>');
  });
});

describe('cases', () => {
  it.each(cases.map((item) => [item.slug]))('%s heeft een eigen pagina met een videoplek', (slug) => {
    const html = page(`work/${slug}/index.html`);
    expect(html).toMatch(/video coming soon|data-vimeo-embed="https:\/\/player\.vimeo\.com\/video\//);
  });
});

describe('bestanden', () => {
  const files = allFiles(dist);

  it('bevat geen videobestanden of het deck', () => {
    expect(files.filter((file) => /\.(mp4|mov|webm|m4v|avi|mkv|pdf)$/i.test(file))).toEqual([]);
  });

  it('heeft alle favicon-formaten', () => {
    for (const file of ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'og-image.jpg']) {
      expect(existsSync(join(dist, file)), file).toBe(true);
    }
  });

  it('houdt de gebruikte foto’s klein (max 200 kB per bestand)', () => {
    const html = files.filter((file) => file.endsWith('.html')).map((file) => readFileSync(file, 'utf8')).join('\n');
    const used = [...new Set(html.match(/\/_astro\/[^\s"',]+\.(?:webp|jpg)/g))];
    expect(used.length).toBeGreaterThan(0);
    for (const src of used) expect(statSync(join(dist, src)).size, src).toBeLessThan(200 * 1024);
  });
});
