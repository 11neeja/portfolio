import { projects } from '../data/portfolio';
import { getSiteUrl } from '../lib/seo';

function buildSitemapXml() {
  const siteUrl = getSiteUrl();
  const now = new Date().toISOString();

  const urls = [
    { loc: `${siteUrl}/`, changefreq: 'weekly', priority: '1.0' },
    ...projects.map((project) => ({
      loc: `${siteUrl}/projects/${project.slug}`,
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ];

  const body = urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const sitemap = buildSitemapXml();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SitemapXml() {
  return null;
}
