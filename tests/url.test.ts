import { describe, expect, it } from 'vitest';
import { absoluteUrl, isActivePath } from '../src/lib/url';

describe('absoluteUrl', () => {
  it('maakt een volledig adres van een pad', () => {
    expect(absoluteUrl('/who-we-are/', 'https://ongoingmedia.nl')).toBe('https://ongoingmedia.nl/who-we-are/');
  });
});

describe('isActivePath', () => {
  it('is actief op de pagina zelf', () => {
    expect(isActivePath('/contact/', '/contact/')).toBe(true);
  });

  it('is actief op een onderliggende pagina', () => {
    expect(isActivePath('/contact/thanks/', '/contact/')).toBe(true);
  });

  it('werkt ook zonder slash aan het eind', () => {
    expect(isActivePath('/who-we-are', '/who-we-are/')).toBe(true);
  });

  it('is niet actief op een andere pagina', () => {
    expect(isActivePath('/who-we-are/', '/contact/')).toBe(false);
  });

  it('home is alleen actief op de homepage zelf', () => {
    expect(isActivePath('/', '/')).toBe(true);
    expect(isActivePath('/who-we-are/', '/')).toBe(false);
  });
});
