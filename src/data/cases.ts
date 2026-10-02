export interface CaseStat {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  summary: string;
  body: readonly string[];
  /** Vimeo-links of -ID's. Video's komen nooit in de repo. */
  videos: readonly string[];
  /** Staand (9:16, social) of liggend (16:9). */
  videoFormat: 'vertical' | 'landscape';
  stats: readonly CaseStat[];
  services: readonly string[];
  /** Voorbeeldcase: zichtbaar gemarkeerd en niet in zoekmachines. */
  placeholder: boolean;
}

// Voorbeeldcases tot de echte cases klaar zijn. Vervang ze door echte cases en zet `placeholder` op false.
export const cases: readonly CaseStudy[] = [
  {
    slug: 'example-launch-campaign',
    title: 'launch campaign',
    client: 'Example case',
    summary: 'A full-scale launch campaign across social, creators and PR. Real case coming soon.',
    body: [
      'This is an example of how a case will look. Here we will tell the story of the campaign: the challenge, the idea and how we brought it to life with the right creators at the right moment.',
      'The videos will be embedded from Vimeo as soon as the case is ready.',
    ],
    videos: [],
    videoFormat: 'vertical',
    stats: [],
    services: ['Strategy', 'Campaigns', 'Data'],
    placeholder: true,
  },
  {
    slug: 'example-always-on',
    title: 'always-on content',
    client: 'Example case',
    summary: 'An always-on content program with live reporting. Real case coming soon.',
    body: [
      'This is an example of how a case will look. Here we will show how an always-on approach keeps a brand in the conversation, and what the live dashboard taught us along the way.',
      'The videos will be embedded from Vimeo as soon as the case is ready.',
    ],
    videos: [],
    videoFormat: 'vertical',
    stats: [],
    services: ['Campaigns', 'Data'],
    placeholder: true,
  },
];

export function findCase(slug: string, list: readonly CaseStudy[] = cases): CaseStudy | undefined {
  return list.find((item) => item.slug === slug);
}

/** De volgende case in de lijst (na de laatste weer de eerste). */
export function nextCase(slug: string, list: readonly CaseStudy[] = cases): CaseStudy | undefined {
  const index = list.findIndex((item) => item.slug === slug);
  if (index === -1 || list.length < 2) return undefined;
  return list[(index + 1) % list.length];
}
