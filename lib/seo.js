const DEFAULT_SITE_URL = 'https://neeja-portfolio.vercel.app';

function ensureAbsoluteUrl(url) {
  if (!url) return DEFAULT_SITE_URL;
  if (/^https?:\/\//i.test(url)) return url.replace(/\/$/, '');
  return `https://${url}`.replace(/\/$/, '');
}

export function getSiteUrl() {
  return ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);
}

export function getCanonicalUrl(pathname = '/') {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function getDefaultOgImage() {
  return `${getSiteUrl()}/og-image.svg`;
}
