const SEPARATOR = ' — ';

// Paginanaam eerst: zo zien bezoekers in zoekresultaten en tabbladen meteen waar ze zijn.
export function buildPageTitle(siteName: string, pageTitle?: string): string {
  const trimmed = pageTitle?.trim();
  return trimmed ? `${trimmed}${SEPARATOR}${siteName}` : siteName;
}
