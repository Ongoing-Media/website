import { describe, expect, it } from 'vitest';
import { buildPageTitle } from '../src/lib/pageTitle';

describe('buildPageTitle', () => {
  it('zet de paginanaam vóór de sitenaam', () => {
    expect(buildPageTitle('Ongoing Media', 'Work')).toBe('Work — Ongoing Media');
  });

  it('geeft alleen de sitenaam zonder paginatitel', () => {
    expect(buildPageTitle('Ongoing Media')).toBe('Ongoing Media');
  });

  it('negeert een lege paginatitel', () => {
    expect(buildPageTitle('Ongoing Media', '   ')).toBe('Ongoing Media');
  });
});
