// Video's staan op Vimeo en worden alleen ingesloten, nooit in de repo of op Netlify gezet.
export interface VimeoVideo {
  id: string;
  /** Privé-sleutel van een "unlisted" video (het stukje na het ID in de deel-link). */
  hash?: string;
}

const PATTERNS = [
  /^(\d+)$/,
  /^https?:\/\/(?:www\.)?vimeo\.com\/(\d+)(?:\/([a-z0-9]+))?\/?(?:[?#].*)?$/i,
  /^https?:\/\/player\.vimeo\.com\/video\/(\d+)\/?(?:\?(?:.*&)?h=([a-z0-9]+).*)?(?:[?#].*)?$/i,
];

/** Accepteert een Vimeo-ID of een gewone Vimeo-link (ook "unlisted" links met privé-sleutel). */
export function parseVimeo(input: string): VimeoVideo | null {
  const value = input.trim();
  for (const pattern of PATTERNS) {
    const match = value.match(pattern);
    if (match) {
      const [, id, hash] = match;
      return hash ? { id, hash } : { id };
    }
  }
  return null;
}

/** Bouwt de speler-link. `dnt=1` zorgt dat Vimeo bezoekers niet volgt. */
export function buildVimeoEmbedUrl(video: VimeoVideo, options: { autoplay?: boolean } = {}): string {
  const url = new URL(`https://player.vimeo.com/video/${video.id}`);
  if (video.hash) url.searchParams.set('h', video.hash);
  url.searchParams.set('dnt', '1');
  url.searchParams.set('title', '0');
  url.searchParams.set('byline', '0');
  url.searchParams.set('portrait', '0');
  if (options.autoplay) url.searchParams.set('autoplay', '1');
  return url.href;
}

export function buildVimeoPageUrl(video: VimeoVideo): string {
  return `https://vimeo.com/${video.id}${video.hash ? `/${video.hash}` : ''}`;
}
