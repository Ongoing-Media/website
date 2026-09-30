import { describe, expect, it } from 'vitest';
import { site } from '../src/config/site';

describe('site config', () => {
  it('schrijft de naam altijd als "Ongoing Media"', () => {
    expect(site.name).toBe('Ongoing Media');
  });
});
