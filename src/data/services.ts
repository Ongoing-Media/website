export interface Pillar {
  id: string;
  title: string;
  /** Korte, schuingedrukte toevoeging naast de titel. */
  aside: string;
  summary: string;
  services: readonly string[];
}

export const pillars: readonly Pillar[] = [
  {
    id: 'strategy',
    title: 'strategy',
    aside: 'with the algorithm',
    summary:
      'Every success starts with the right strategy. We don’t work against the algorithm, we work with it. Solid research into platform and consumer behavior takes the guessing game out of every campaign.',
    services: [
      'Social media strategy',
      'Influencer marketing strategy',
      'Campaign strategy',
      'Media strategy & planning',
    ],
  },
  {
    id: 'campaigns',
    title: 'campaigns',
    aside: 'people can’t scroll past',
    summary:
      'With a consumer-driven strategy and a creator-centric approach, we develop and run full-scale social media campaigns. Content that earns attention and adapts as fast as the platforms do.',
    services: [
      'Creative concepts',
      'Creator selection & longlists',
      'Influencer marketing',
      'Gifting',
      'PR events & activations',
      'Social & influencer productions',
      'Campaign management',
      'Full-service campaign partner',
    ],
  },
  {
    id: 'data',
    title: 'data',
    aside: 'full transparency',
    summary:
      'We work across all channels with an always-on organic, earned and paid approach that reaches audiences across the full funnel. KPIs are based on industry benchmarks, creator data and proven results.',
    services: ['Data & research', 'Consumer insights', 'Audience insights', 'Reporting & analytics', 'Live dashboards'],
  },
];

export interface Channel {
  title: string;
  text: string;
}

export const channels: readonly Channel[] = [
  { title: 'earned', text: 'Creators, PR and the conversation people choose to share.' },
  { title: 'owned', text: 'Your own channels and content, built to last.' },
  { title: 'paid', text: 'Targeted amplification across the full funnel.' },
];

export interface ProcessStep {
  title: string;
  text: string;
}

export const processSteps: readonly ProcessStep[] = [
  {
    title: 'briefing',
    text: 'We receive your briefing, talk it through together and come back with a debrief and a campaign proposal.',
  },
  {
    title: 'development',
    text: 'We select the right creators and shape the creative briefing with you, round by round.',
  },
  {
    title: 'roll-out',
    text: 'Contracts, full legal compliance, a clear content plan and production. All arranged.',
  },
  {
    title: 'evaluation',
    text: 'Feedback on content, posting, tracking results and a clear report on what it delivered.',
  },
];
