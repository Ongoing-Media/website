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

  it('heeft het juiste adres', () => {
    expect(site.address.street).toBe('Herengracht 501');
    expect(site.address.postalCode).toBe('1017 BV');
  });

  it('linkt naar Instagram, TikTok en LinkedIn', () => {
    expect(site.socials.map((social) => social.url)).toEqual([
      'https://www.instagram.com/ongoing.nl/',
      'https://www.tiktok.com/@ongoingmedia.nl',
      'https://www.linkedin.com/company/ongoing-media/',
    ]);
  });
});
