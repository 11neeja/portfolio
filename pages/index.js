import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import { Achievements, Contact } from '../components/AchievementsContact';

export default function Home() {
  return (
    <>
      <Head>
        <title>Neeja Suva | Full Stack Developer Portfolio</title>
        <meta name="description" content="Neeja Suva — Full Stack Developer & AI/ML Explorer from India. LDRP-ITR, Gandhinagar. React, Node.js, Python, ML." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect x='8' y='8' width='84' height='84' rx='8' fill='%23FF6B9D'/%3E%3Crect x='26' y='26' width='48' height='48' fill='%23070412'/%3E%3C/svg%3E" />
      </Head>

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
