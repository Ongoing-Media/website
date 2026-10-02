export const site = {
  name: 'Ongoing Media',
  language: 'en',
  locale: 'en_US',
  url: 'https://ongoingmedia.nl',
  tagline: 'we turn behavior into strategy, creators into momentum, and attention into impact.',
  description:
    'Ongoing Media is an Amsterdam-based influencer marketing agency. We turn behavior into strategy, creators into momentum, and attention into impact.',
  email: 'info@ongoingmedia.nl',
  address: {
    street: 'Herengracht 501',
    postalCode: '1017 BV',
    city: 'Amsterdam',
    country: 'The Netherlands',
    countryCode: 'NL',
  },
  socials: [
    { id: 'instagram', label: 'Instagram', handle: '@ongoing.nl', url: 'https://www.instagram.com/ongoing.nl/' },
    { id: 'tiktok', label: 'TikTok', handle: '@ongoingmedia.nl', url: 'https://www.tiktok.com/@ongoingmedia.nl' },
    { id: 'linkedin', label: 'LinkedIn', handle: 'Ongoing Media', url: 'https://www.linkedin.com/company/ongoing-media/' },
  ],
  shareImage: { path: '/og-image.jpg', width: 1200, height: 630 },
  themeColor: '#41192a',
  // Adobe Fonts-kit met Helvetica LT Pro (de licentie loopt via Adobe; de link mag publiek zijn).
  fontStylesheet: 'https://use.typekit.net/rxa1hlv.css',
} as const;
