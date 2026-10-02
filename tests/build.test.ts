import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Controleert de echte gebouwde site. De build draait vooraf via tests/globalSetup.ts.
const dist = new URL('../dist/', import.meta.url).pathname;
const page = (path: string) => readFileSync(join(dist, path), 'utf8');

const pages = {
  home: 'index.html',
  whatWeDo: 'what-we-do/index.html',
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
    expect(page(pages.whatWeDo)).toContain('src="/brand/logo-black.svg"');
  });

  it('toont foto’s als responsive WebP', () => {
    expect(html).toMatch(/<source[^>]+type="image\/webp"/);
    expect(html).toMatch(/srcset="[^"]+ 360w/);
    expect(html).toContain('loading="lazy"');
  });

  it('toont bij "hi! we are" het zwarte logo', () => {
    expect(html).toMatch(/<h2 id="about-heading"[\s\S]*?hi! we are[\s\S]*?src="\/brand\/logo-black\.svg"[\s\S]*?<\/h2>/);
  });

  it('heeft geen "influencer marketing agency · amsterdam" boven de kop', () => {
    expect(html).not.toContain('influencer marketing agency · amsterdam');
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
  it('bedankpagina en 404 staan op noindex', () => {
    expect(page(pages.thanks)).toContain('<meta name="robots" content="noindex">');
    expect(page(pages.notFound)).toContain('<meta name="robots" content="noindex">');
  });

  it('gewone pagina’s staan niet op noindex', () => {
    expect(page(pages.home)).not.toContain('noindex');
  });

  it('heeft een robots.txt met sitemap', () => {
    expect(page('robots.txt')).toContain('Sitemap: https://ongoingmedia.nl/sitemap.xml');
    expect(page('sitemap.xml')).toContain('<loc>https://ongoingmedia.nl/</loc>');
  });
});

describe('menu en footer', () => {
  it.each(Object.entries(pages))('%s: menu met home, footer met socials en het juiste adres', (_, path) => {
    const html = page(path);
    expect(html).toMatch(/<a href="\/"[^>]*>home<\/a>/);
    expect(html).toContain('href="https://www.instagram.com/ongoing.nl/"');
    expect(html).toContain('href="https://www.tiktok.com/@ongoingmedia.nl"');
    expect(html).toContain('href="https://www.linkedin.com/company/ongoing-media/"');
    expect(html).toMatch(/<span class="label"[^>]*>social<\/span>/);
    expect(html).toContain('Herengracht 501');
    expect(html).toContain('1017 BV Amsterdam');
    expect(html).not.toContain('Keizersgracht');
  });

  it('heeft (nog) geen work-pagina of links ernaartoe', () => {
    expect(existsSync(join(dist, 'work'))).toBe(false);
    for (const path of Object.values(pages)) expect(page(path), path).not.toContain('href="/work/');
  });
});

describe('what we do', () => {
  const html = page(pages.whatWeDo);

  it('heeft geen "what we do" boven de kop, wel een foto ernaast', () => {
    const top = html.slice(html.indexOf('<main'), html.indexOf('</h1>'));
    expect(top).not.toContain('class="eyebrow"');
    expect(html.slice(html.indexOf('</h1>'), html.indexOf('class="on-repeat"'))).toContain('<picture');
  });

  it('heeft geen witte achtergrond maar crème', () => {
    expect(html).not.toContain('data-tone="white"');
    expect(html).toContain('data-tone="cream"');
  });

  it('heeft niet meer de dashboard-zin en de sectie "unfortunately"', () => {
    expect(html).not.toContain('we build live dashboards');
    expect(html).not.toContain('unfortunately');
  });
});

describe('about', () => {
  const html = page(pages.about);

  it('toont "hi! we are" met het logo, waarvan het streepje knippert', () => {
    const h1 = html.match(/<h1[\s\S]*?<\/h1>/)![0];
    expect(h1).toMatch(/hi! we<\/span> <span[^>]*>are<\/span>/);
    expect(h1).toMatch(/<svg[^>]+role="img"[^>]+aria-label="Ongoing Media"/);
    expect(h1).toContain('<rect class="cursor"');
  });

  it('vertelt het verhaal van de oprichters', () => {
    for (const name of ['Chantal Janzen', 'Marco Geerats', 'Michelle de Vroed', '&amp;C']) expect(html).toContain(name);
  });
});

describe('contact', () => {
  it('heeft geen foto en toont de socials met hun logo', () => {
    const html = page(pages.contact);
    const details = html.slice(html.indexOf('aria-label="Contact details"'), html.indexOf('</aside>'));
    expect(details).not.toContain('<picture');
    expect(details).toMatch(/<h2[^>]*>social<\/h2>/);
    expect(details.match(/class="icon"[^>]*aria-hidden="true"[^>]*><svg/g)).toHaveLength(3);
  });

  it('toont het formulier bovenaan, vóór de contactgegevens', () => {
    const html = page(pages.contact);
    expect(html.indexOf('<form')).toBeGreaterThan(0);
    expect(html.indexOf('<form')).toBeLessThan(html.indexOf('aria-label="Contact details"'));
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
