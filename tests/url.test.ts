import { describe, expect, it } from 'vitest';
import { absoluteUrl, isActivePath } from '../src/lib/url';

describe('absoluteUrl', () => {
  it('maakt een volledig adres van een pad', () => {
    expect(absoluteUrl('/work/', 'https://ongoingmedia.nl')).toBe('https://ongoingmedia.nl/work/');
  });
});

describe('isActivePath', () => {
  it('is actief op de pagina zelf', () => {
    expect(isActivePath('/work/', '/work/')).toBe(true);
  });

  it('is actief op een onderliggende pagina', () => {
    expect(isActivePath('/work/example-launch-campaign/', '/work/')).toBe(true);
  });

  it('werkt ook zonder slash aan het eind', () => {
    expect(isActivePath('/about', '/about/')).toBe(true);
  });

  it('is niet actief op een andere pagina', () => {
    expect(isActivePath('/about/', '/work/')).toBe(false);
  });

  it('home is alleen actief op de homepage zelf', () => {
    expect(isActivePath('/', '/')).toBe(true);
    expect(isActivePath('/work/', '/')).toBe(false);
  });
});
