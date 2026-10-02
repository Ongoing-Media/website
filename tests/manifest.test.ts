import { describe, expect, it } from 'vitest';
import { GET } from '../src/pages/site.webmanifest';
import { site } from '../src/config/site';

describe('site.webmanifest', () => {
  it('gebruikt naam en kleur uit de gedeelde sitegegevens', async () => {
    // @ts-expect-error deze route gebruikt geen context
    const response = await GET({});
    expect(response.headers.get('Content-Type')).toBe('application/manifest+json');
    const manifest = await response.json();
    expect(manifest.name).toBe(site.name);
    expect(manifest.theme_color).toBe(site.themeColor);
    expect(manifest.icons.map((icon: { sizes: string }) => icon.sizes)).toEqual(['192x192', '512x512']);
  });
});
