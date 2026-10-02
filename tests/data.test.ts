import { describe, expect, it } from 'vitest';
import { channels, pillars, processSteps } from '../src/data/services';
import { indexableRoutes, mainNav, routes } from '../src/config/routes';

describe('diensten', () => {
  it('zijn de drie pijlers strategy, campaigns en data (geen talentmanagement)', () => {
    expect(pillars.map((pillar) => pillar.title)).toEqual(['strategy', 'campaigns', 'data']);
    const allText = JSON.stringify(pillars).toLowerCase();
    expect(allText).not.toContain('talent');
    expect(allText).not.toContain('media division');
  });

  it('heeft de juiste ondertitels bij de pijlers', () => {
    expect(pillars.map((pillar) => pillar.aside)).toEqual([
      'consumer & platform insights',
      'people can’t scroll past',
      'measure to learn',
    ]);
  });

  it('heeft earned, owned en paid en vier stappen werkwijze', () => {
    expect(channels.map((channel) => channel.title)).toEqual(['earned', 'owned', 'paid']);
    expect(processSteps).toHaveLength(4);
  });
});

describe('routes', () => {
  it('het menu begint met home en heeft (nog) geen work', () => {
    expect(mainNav.map((item) => item.label)).toEqual(['home', 'what we do', 'about', 'contact']);
    expect(mainNav[0].href).toBe('/');
  });

  it('alle menu-items verwijzen naar bestaande pagina’s', () => {
    const known = Object.values(routes);
    for (const item of mainNav) expect(known).toContain(item.href);
  });

  it('de bedankpagina hoort niet in zoekmachines', () => {
    expect(indexableRoutes).not.toContain(routes.contactThanks);
  });
});
