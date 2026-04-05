const DEFAULT_SITE_URL = 'https://neeja.dev';

function ensureAbsoluteUrl(url) {
  if (!url) return DEFAULT_SITE_URL;
  if (/^https?:\/\//i.test(url)) return url.replace(/\/$/, '');
  return `https://${url}`.replace(/\/$/, '');
}

export function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function getSiteUrl() {
  const envUrl = ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);

  // Prevent accidental fallback to preview/vercel domain in sitemap/canonical tags.
  if (/\.vercel\.app$/i.test(envUrl.replace(/^https?:\/\//i, ''))) {
    return DEFAULT_SITE_URL;
  }

  return envUrl;
}

export function getCanonicalUrl(pathname = '/') {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function getDefaultOgImage() {
  return `${getSiteUrl()}/og-image.svg`;
}
