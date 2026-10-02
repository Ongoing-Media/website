import { describe, expect, it } from 'vitest';
import { cases, findCase, nextCase, type CaseStudy } from '../src/data/cases';
import { channels, pillars, processSteps } from '../src/data/services';
import { caseRoute, indexableRoutes, mainNav, routes } from '../src/config/routes';
import { parseVimeo } from '../src/lib/vimeo';

describe('cases', () => {
  it('hebben unieke, webveilige adressen', () => {
    const slugs = cases.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it('gebruiken alleen geldige Vimeo-links (nooit videobestanden)', () => {
    for (const item of cases) {
      for (const video of item.videos) expect(parseVimeo(video), `${item.slug}: ${video}`).not.toBeNull();
    }
  });

  it('vindt een case op adres', () => {
    expect(findCase(cases[0].slug)).toBe(cases[0]);
    expect(findCase('bestaat-niet')).toBeUndefined();
  });

  it('gaat na de laatste case weer naar de eerste', () => {
    const list = [{ slug: 'a' }, { slug: 'b' }] as CaseStudy[];
    expect(nextCase('a', list)?.slug).toBe('b');
    expect(nextCase('b', list)?.slug).toBe('a');
  });

  it('heeft geen volgende case bij één case of een onbekend adres', () => {
    const list = [{ slug: 'a' }] as CaseStudy[];
    expect(nextCase('a', list)).toBeUndefined();
    expect(nextCase('x', cases)).toBeUndefined();
  });
});

describe('diensten', () => {
  it('zijn de drie pijlers strategy, campaigns en data (geen talentmanagement)', () => {
    expect(pillars.map((pillar) => pillar.id)).toEqual(['strategy', 'campaigns', 'data']);
    const allText = JSON.stringify(pillars).toLowerCase();
    expect(allText).not.toContain('talent');
    expect(allText).not.toContain('media division');
  });

  it('heeft earned, owned en paid en vier stappen werkwijze', () => {
    expect(channels.map((channel) => channel.title)).toEqual(['earned', 'owned', 'paid']);
    expect(processSteps).toHaveLength(4);
  });
});

describe('routes', () => {
  it('maakt het adres van een case', () => {
    expect(caseRoute('abc')).toBe('/work/abc/');
  });

  it('alle menu-items verwijzen naar bestaande pagina’s', () => {
    const known = Object.values(routes);
    for (const item of mainNav) expect(known).toContain(item.href);
  });

  it('de bedankpagina hoort niet in zoekmachines', () => {
    expect(indexableRoutes).not.toContain(routes.contactThanks);
  });
});
