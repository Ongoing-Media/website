// Eén plek voor alle adressen binnen de site, zodat links nooit uit elkaar lopen.
export const routes = {
  home: '/',
  whatWeDo: '/what-we-do/',
  work: '/work/',
  about: '/about/',
  contact: '/contact/',
  contactThanks: '/contact/thanks/',
  privacy: '/privacy/',
} as const;

export function caseRoute(slug: string): string {
  return `${routes.work}${slug}/`;
}

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: readonly NavItem[] = [
  { label: 'what we do', href: routes.whatWeDo },
  { label: 'work', href: routes.work },
  { label: 'about', href: routes.about },
  { label: 'contact', href: routes.contact },
];

// Pagina's die in zoekmachines mogen verschijnen (de bedankpagina hoort daar niet bij).
export const indexableRoutes: readonly string[] = [
  routes.home,
  routes.whatWeDo,
  routes.work,
  routes.about,
  routes.contact,
  routes.privacy,
];
