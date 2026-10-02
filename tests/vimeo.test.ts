import { describe, expect, it } from 'vitest';
import { buildVimeoEmbedUrl, buildVimeoPageUrl, parseVimeo } from '../src/lib/vimeo';

describe('parseVimeo', () => {
  it.each([
    ['76979871', { id: '76979871' }],
    ['https://vimeo.com/76979871', { id: '76979871' }],
    ['https://www.vimeo.com/76979871/', { id: '76979871' }],
    ['https://vimeo.com/76979871?share=copy', { id: '76979871' }],
    ['https://vimeo.com/76979871/abc123def', { id: '76979871', hash: 'abc123def' }],
    ['https://player.vimeo.com/video/76979871', { id: '76979871' }],
    ['https://player.vimeo.com/video/76979871?h=abc123&badge=0', { id: '76979871', hash: 'abc123' }],
    ['https://player.vimeo.com/video/76979871?badge=0', { id: '76979871' }],
    ['  76979871  ', { id: '76979871' }],
  ])('herkent %s', (input, expected) => {
    expect(parseVimeo(input)).toEqual(expected);
  });

  it.each(['', 'https://youtube.com/watch?v=abc', 'https://vimeo.com/channels/staffpicks', 'video.mp4'])(
    'weigert %s',
    (input) => {
      expect(parseVimeo(input)).toBeNull();
    },
  );
});

describe('buildVimeoEmbedUrl', () => {
  it('vraagt Vimeo om bezoekers niet te volgen', () => {
    const url = new URL(buildVimeoEmbedUrl({ id: '1' }));
    expect(url.origin + url.pathname).toBe('https://player.vimeo.com/video/1');
    expect(url.searchParams.get('dnt')).toBe('1');
    expect(url.searchParams.has('autoplay')).toBe(false);
    expect(url.searchParams.has('h')).toBe(false);
  });

  it('neemt de privé-sleutel en autoplay mee', () => {
    const url = new URL(buildVimeoEmbedUrl({ id: '1', hash: 'abc' }, { autoplay: true }));
    expect(url.searchParams.get('h')).toBe('abc');
    expect(url.searchParams.get('autoplay')).toBe('1');
  });
});

describe('buildVimeoPageUrl', () => {
  it('maakt een gewone Vimeo-link', () => {
    expect(buildVimeoPageUrl({ id: '1' })).toBe('https://vimeo.com/1');
    expect(buildVimeoPageUrl({ id: '1', hash: 'abc' })).toBe('https://vimeo.com/1/abc');
  });
});
