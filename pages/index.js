import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import { Achievements, Contact } from '../components/AchievementsContact';
import { hero } from '../data/portfolio';
import SEO from '../components/SEO';
import { getSiteUrl } from '../lib/seo';

function normalizeProfileUrl(url) {
  if (!url) return null;
  const absolute = /^https?:\/\//i.test(url) ? url : `https://${url}`;

  try {
    const parsed = new URL(absolute);
    const path = parsed.pathname.replace(/\/$/, '');
    if (!path || path === '') return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export default function Home() {
  const siteUrl = getSiteUrl();
  const sameAs = [normalizeProfileUrl(hero.github), normalizeProfileUrl(hero.linkedin)].filter(Boolean);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Neeja Suva',
        jobTitle: 'Full Stack Developer',
        url: siteUrl,
        email: 'mailto:suva.neeja11@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
        },
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'WebSite',
        name: 'Neeja Suva Portfolio',
        url: siteUrl,
      },
    ],
  };

  return (
    <>
      <SEO
        title="Neeja Suva | Full Stack Developer Portfolio"
        description="Neeja Suva — Full Stack Developer and AI/ML Explorer from India. Explore MERN, React, Node.js, Python and machine learning projects."
        pathname="/"
        keywords="Neeja Suva, Full Stack Developer, MERN Developer, AI ML Developer, Portfolio, React, Node.js, Python"
        structuredData={structuredData}
      />

      <Navbar />

      <main>
        <Hero />

        {/* Biome transition: forest → skill */}
        <div className="w-full h-2 bg-gradient-to-r from-green-900 via-purple-900 to-green-900" />

        <Skills />

        {/* Biome transition */}
        <div className="w-full h-2 bg-gradient-to-r from-purple-900 via-teal-900 to-purple-900" />

        <Experience />

        {/* Biome transition */}
        <div className="w-full h-2 bg-gradient-to-r from-teal-900 via-pink-900 to-teal-900" />

        <Projects />

        {/* Biome transition */}
        <div className="w-full h-2 bg-gradient-to-r from-pink-900 via-yellow-900 to-pink-900" />

        <Achievements />

        {/* Biome transition */}
        <div className="w-full h-2 bg-gradient-to-r from-yellow-900 via-purple-900 to-yellow-900" />

        <Contact />
      </main>
    </>
  );
}
