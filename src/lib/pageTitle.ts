const SEPARATOR = ' — ';

export function buildPageTitle(siteName: string, pageTitle?: string): string {
  const trimmed = pageTitle?.trim();
  return trimmed ? `${siteName}${SEPARATOR}${trimmed}` : siteName;
}
