export function absoluteUrl(path: string, base: string | URL): string {
  return new URL(path, base).href;
}

// Een menu-item is actief op zijn eigen pagina én op alles daaronder (bijv. /work/ bij /work/een-case/).
export function isActivePath(currentPath: string, href: string): boolean {
  const current = withTrailingSlash(currentPath);
  const target = withTrailingSlash(href);
  return target === '/' ? current === '/' : current.startsWith(target);
}

function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}
