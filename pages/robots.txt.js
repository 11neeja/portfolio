import { getSiteUrl } from '../lib/seo';

export async function getServerSideProps({ res }) {
  const siteUrl = getSiteUrl();
  const host = siteUrl.replace(/^https?:\/\//i, '');
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\nHost: ${host}`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(robots);
  res.end();

  return {
    props: {},
  };
}

export default function RobotsTxt() {
  return null;
}
