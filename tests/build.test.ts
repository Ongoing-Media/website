import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Controleert de echte gebouwde pagina. De build draait vooraf via tests/globalSetup.ts.
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

describe('gebouwde homepage', () => {
  it('heeft de juiste titel', () => {
    expect(html).toContain('<title>Ongoing Media — coming soon</title>');
  });

  it('toont de naam en "coming soon"', () => {
    expect(html).toMatch(/<h1[^>]*>Ongoing Media<\/h1>/);
    expect(html).toMatch(/<p[^>]*>coming soon<\/p>/);
  });

  it('noemt ongoingmedia.nl als officieel adres', () => {
    expect(html).toContain('<link rel="canonical" href="https://ongoingmedia.nl/">');
  });

  it('is ingesteld op Nederlands', () => {
    expect(html).toContain('<html lang="nl">');
  });
});
