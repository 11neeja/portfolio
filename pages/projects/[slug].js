import Link from 'next/link';
import { useState } from 'react';
import { projects } from '../../data/portfolio';
import ProjectGameModal from '../../components/ProjectGameModal';
import SEO from '../../components/SEO';
import { getCanonicalUrl, getSiteUrl } from '../../lib/seo';

const biomeThemes = {
  forest: {
    pageBg: 'from-[#040E08] via-[#0A2215] to-[#07160D]',
    softText: '#D1FAE5',
    panelSurface: 'rgba(9, 31, 20, 0.72)',
    sectionBorder: 'rgba(16, 185, 129, 0.35)',
    banner: 'from-[#0D2A16] via-[#134D2A] to-[#08140E]',
    glow: 'rgba(45, 212, 191, 0.35)',
    panel: 'from-[#112518] to-[#0B1510]',
    tile: 'from-[#1C4B2A] to-[#12301D]',
    asset: 'from-[#1D6B3E] to-[#124E30]',
  },
  desert: {
    pageBg: 'from-[#141003] via-[#2A1F06] to-[#171004]',
    softText: '#FEF3C7',
    panelSurface: 'rgba(47, 34, 9, 0.74)',
    sectionBorder: 'rgba(251, 191, 36, 0.36)',
    banner: 'from-[#2A2108] via-[#5E4812] to-[#1F1806]',
    glow: 'rgba(251, 191, 36, 0.36)',
    panel: 'from-[#34280B] to-[#1F1707]',
    tile: 'from-[#7A5B14] to-[#4C390C]',
    asset: 'from-[#A67C1B] to-[#6A4F12]',
  },
  sky: {
    pageBg: 'from-[#0F0820] via-[#24123C] to-[#12091F]',
    softText: '#E9D5FF',
    panelSurface: 'rgba(36, 18, 60, 0.72)',
    sectionBorder: 'rgba(192, 132, 252, 0.34)',
    banner: 'from-[#231442] via-[#3A1F6D] to-[#170D2E]',
    glow: 'rgba(192, 132, 252, 0.4)',
    panel: 'from-[#2A174D] to-[#170C2D]',
    tile: 'from-[#5A31A3] to-[#341C64]',
    asset: 'from-[#7B4FD1] to-[#4E2E93]',
  },
  lava: {
    pageBg: 'from-[#16060E] via-[#2A0A19] to-[#170612]',
    softText: '#FCE7F3',
    panelSurface: 'rgba(44, 10, 30, 0.74)',
    sectionBorder: 'rgba(255, 107, 157, 0.36)',
    banner: 'from-[#3A1024] via-[#6E1C47] to-[#210D17]',
    glow: 'rgba(255, 107, 157, 0.42)',
    panel: 'from-[#4A1530] to-[#210B17]',
    tile: 'from-[#A7336C] to-[#6F1F47]',
    asset: 'from-[#D94D8A] to-[#8C2D5A]',
  },
};

function BiomePreview({ project }) {
  const theme = biomeThemes[project.biome] || biomeThemes.forest;
  const tilesetItems = project.detailBoxes?.tileset || [];
  const assetItems = project.detailBoxes?.assets || [];

  return (
    <div className="relative border border-white/20 overflow-hidden" style={{ boxShadow: `0 0 50px ${theme.glow}` }}>
      <div className={`h-52 md:h-72 bg-gradient-to-r ${theme.banner} relative`}>
        {project.world?.image ? (
          <img
            src={project.world.image}
            alt={`${project.name} world preview`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}

        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,6,25,0.2) 0%, rgba(8,6,25,0.65) 100%)' }} />
        <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(circle at 70% 30%, #ffffff55 0%, transparent 45%)' }} />
        <div className="absolute inset-0 opacity-12" style={{ background: 'linear-gradient(120deg, transparent 0%, #ffffff33 45%, transparent 100%)' }} />

        <div className="absolute top-4 left-4 border border-white/30 bg-black/20 px-3 py-1">
          <div className="font-pixel text-[8px] text-white">WORLD</div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="font-pixel text-[10px] md:text-xs text-white mb-1">{project.world.title}</div>
          <div className="font-body text-xs md:text-sm text-white/90">{project.world.tone}</div>
        </div>
      </div>

      <div className={`grid md:grid-cols-2 gap-0 bg-gradient-to-r ${theme.panel} p-4 md:p-6`}>
        <div className="pr-0 md:pr-6 border-b md:border-b-0 md:border-r border-white/15 pb-5 md:pb-0">
          <div className="font-pixel text-[10px] text-white/90 mb-3">TILESET</div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className={`h-12 md:h-16 border border-white/20 bg-gradient-to-br ${theme.tile} p-1.5 flex flex-col justify-between`}>
                <div className="font-pixel text-[6px] text-white/95 leading-tight break-words">
                  {tilesetItems[idx]?.title || `Module ${idx + 1}`}
                </div>
                <div className="font-body text-[9px] text-white/80 leading-tight break-words">
                  {tilesetItems[idx]?.desc || 'Core project component'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-5 md:pt-0 md:pl-6">
          <div className="font-pixel text-[10px] text-white/90 mb-3">ASSETS</div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className={`h-14 md:h-20 border border-white/20 bg-gradient-to-br ${theme.asset} p-2 flex flex-col justify-between`}>
                <div className="font-pixel text-[7px] text-white/95 leading-tight break-words">
                  {assetItems[idx]?.title || `Asset ${idx + 1}`}
                </div>
                <div className="font-body text-[10px] text-white/80 leading-tight break-words">
                  {assetItems[idx]?.desc || 'Supporting project feature'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatGrid({ stats, color }) {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">
      {Object.entries(stats).map(([k, v]) => (
        <div key={k} className="border border-white/15 bg-white/5 p-2 md:p-3 text-center">
          <div className="font-pixel text-[9px] md:text-[10px]" style={{ color }}>{v}</div>
          <div className="font-pixel text-[7px] text-muted mt-1">{k.toUpperCase()}</div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectDetailsPage({ project }) {
  if (!project) return null;
  const [isGameOpen, setIsGameOpen] = useState(false);
  const theme = biomeThemes[project.biome] || biomeThemes.forest;
  const hasGame = ['ecovision', 'joblink', 'documind', 'smartpay'].includes(project.slug);
  const pathname = `/projects/${project.slug}`;
  const siteUrl = getSiteUrl();
  const socialImage = project.world?.image ? `${siteUrl}${project.world.image}` : undefined;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: project.desc,
    url: getCanonicalUrl(pathname),
    codeRepository: project.github && project.github !== '#' ? project.github : undefined,
    programmingLanguage: project.stack,
    author: {
      '@type': 'Person',
      name: 'Neeja Suva',
    },
  };

  return (
    <>
      <SEO
        title={`${project.name} | Project Details | Neeja Suva`}
        description={project.desc}
        pathname={pathname}
        image={socialImage}
        type="article"
        keywords={`${project.name}, ${project.stack.join(', ')}, project case study, full stack project`}
        structuredData={structuredData}
      />

      <main className="relative min-h-screen text-white overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.pageBg}`} />

        <section className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 pt-12 pb-16">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/#projects" className="font-pixel text-[9px] px-3 py-2 border hover:text-white transition-colors"
                style={{ color: theme.softText, borderColor: theme.sectionBorder }}>
                ◀ BACK TO PROJECTS
              </Link>

              {hasGame ? (
                <button
                  onClick={() => setIsGameOpen(true)}
                  className="font-pixel text-[9px] px-4 py-2 border-2"
                  style={{
                    borderColor: project.color,
                    color: '#FFFFFF',
                    backgroundColor: `${project.color}33`,
                    boxShadow: `0 0 14px ${project.color}66`,
                  }}
                >
                  ▶ GAME
                </button>
              ) : null}
            </div>

            <div className="font-pixel text-[9px] px-3 py-2 border" style={{ borderColor: project.color, color: project.color }}>
              {project.badge}
            </div>
          </div>

          <div className="mb-7">
            <div className="font-pixel text-[10px] mb-2" style={{ color: project.color }}>PROJECT WORLD</div>
            <h1 className="font-pixel text-3xl md:text-5xl leading-tight mb-3">{project.name}</h1>
            <p className="font-body text-base md:text-lg max-w-4xl" style={{ color: theme.softText }}>{project.subtitle} · {project.desc}</p>
          </div>

          <BiomePreview project={project} />

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 border p-5 md:p-6" style={{ borderColor: theme.sectionBorder, background: theme.panelSurface }}>
              <div className="font-pixel text-[10px] text-gold mb-4">MISSION BRIEF</div>

              <div className="space-y-4 text-base leading-relaxed" style={{ color: theme.softText }}>
                <p><span className="font-pixel text-[9px] text-white">PROBLEM:</span> {project.problem}</p>
                <p><span className="font-pixel text-[9px] text-white">SOLUTION:</span> {project.solution}</p>
                <p><span className="font-pixel text-[9px] text-white">OUTCOME:</span> {project.outcome}</p>
              </div>

              <div className="mt-6">
                <div className="font-pixel text-[10px] text-white mb-3">KEY HIGHLIGHTS</div>
                <ul className="space-y-2">
                  {project.highlights.map((item) => (
                    <li key={item} className="font-body text-base border-l-2 pl-3" style={{ color: theme.softText, borderColor: project.color }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border p-5 md:p-6" style={{ borderColor: theme.sectionBorder, background: theme.panelSurface }}>
              <div className="font-pixel text-[10px] text-white mb-4">PROJECT STATS</div>
              <StatGrid stats={project.stats} color={project.color} />

              <div className="font-pixel text-[10px] text-white mt-6 mb-3">TECH STACK</div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="font-body text-xs px-2.5 py-1.5 border" style={{ color: theme.softText, borderColor: theme.sectionBorder }}>
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.github}
                className="mt-6 inline-block font-pixel text-[9px] px-4 py-2 border-2"
                style={{ borderColor: project.color, color: project.color }}
              >
                ▶ VIEW CODE
              </a>
            </div>
          </div>

          {isGameOpen ? <ProjectGameModal project={project} onClose={() => setIsGameOpen(false)} /> : null}
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: projects.map((project) => ({ params: { slug: project.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = projects.find((item) => item.slug === params.slug) || null;

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project,
    },
  };
}
