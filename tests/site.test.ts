import { describe, expect, it } from 'vitest';
import { site } from '../src/config/site';

describe('site config', () => {
  it('schrijft de naam altijd als "Ongoing Media"', () => {
    expect(site.name).toBe('Ongoing Media');
  });

  it('is Engelstalig en staat op ongoingmedia.nl', () => {
    expect(site.language).toBe('en');
    expect(site.url).toBe('https://ongoingmedia.nl');
  });

  it('gebruikt het algemene e-mailadres op het .nl-domein', () => {
    expect(site.email).toBe('info@ongoingmedia.nl');
  });
});
