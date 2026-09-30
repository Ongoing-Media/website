import { describe, expect, it } from 'vitest';
import { buildPageTitle } from '../src/lib/pageTitle';

describe('buildPageTitle', () => {
  it('combineert sitenaam en paginatitel', () => {
    expect(buildPageTitle('Ongoing Media', 'coming soon')).toBe('Ongoing Media — coming soon');
  });

  it('geeft alleen de sitenaam zonder paginatitel', () => {
    expect(buildPageTitle('Ongoing Media')).toBe('Ongoing Media');
  });

  it('negeert een lege paginatitel', () => {
    expect(buildPageTitle('Ongoing Media', '   ')).toBe('Ongoing Media');
  });
});
