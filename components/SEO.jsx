import Head from 'next/head';
import { getCanonicalUrl, getDefaultOgImage } from '../lib/seo';

export default function SEO({
  title,
  description,
  pathname = '/',
  image,
  type = 'website',
  noindex = false,
  keywords,
  structuredData,
}) {
  const canonical = getCanonicalUrl(pathname);
  const socialImage = image || getDefaultOgImage();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />

      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:site_name" content="Neeja Suva Portfolio" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />

      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      ) : null}
    </Head>
  );
}
