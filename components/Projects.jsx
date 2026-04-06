import { projects } from '../data/portfolio';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeIcon from './ThemeIcon';

const biomeStyles = {
  forest: { bg: 'from-[#0A1F0A] to-[#070412]', particle: '#22C55E' },
  desert: { bg: 'from-[#1A0F00] to-[#070412]', particle: '#F59E0B' },
  sky: { bg: 'from-[#08001A] to-[#070412]', particle: '#A78BFA' },
  lava: { bg: 'from-[#1A0008] to-[#070412]', particle: '#F43F5E' },
};

function StatPill({ label, val, color }) {
  return (
    <div className="text-center px-2 py-2 md:px-3 md:py-2 border border-white/10 bg-white/5 min-w-0">
      <div className="font-pixel text-[11px] sm:text-[13px] md:text-base leading-tight break-words" style={{ color }}>{val}</div>
      <div className="font-body text-[10px] md:text-[11px] text-purple-100/90 mt-1 tracking-wide break-words">{label}</div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const router = useRouter();
  const style = biomeStyles[project.biome];
  const isEven = index % 2 === 0;

  const openDetails = () => router.push(`/projects/${project.slug}`);

  return (
    <div className={`relative grid md:grid-cols-2 gap-0 bg-gradient-to-br ${style.bg} border overflow-hidden game-card cursor-pointer`}
      role="button"
      tabIndex={0}
      onClick={openDetails}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetails();
        }
      }}
      style={{ borderColor: `${project.color}40`, boxShadow: `6px 6px 0 ${project.color}20` }}>

      {/* Left: visual panel */}
      <div className={`relative p-5 sm:p-6 md:p-8 flex flex-col items-center justify-center min-h-48 border-r ${isEven ? 'md:order-1' : 'md:order-2'}`}
        style={{ borderColor: `${project.color}20`, background: `${project.color}08` }}>

        {/* Badge */}
        <div className="absolute top-3 left-3 font-pixel text-[8px] px-2 py-1 border"
          style={{ borderColor: project.color, color: project.color, background: `${project.color}20` }}>
          {project.badge}
        </div>

        {/* Project icon — pixel art style */}
        <div className="w-20 h-20 border-2 flex items-center justify-center mb-4 animate-pulse-glow relative"
          style={{ borderColor: project.color, boxShadow: `0 0 20px ${project.color}40, inset 0 0 20px ${project.color}10` }}>
          <div className="absolute inset-0" style={{ background: `${project.color}15` }} />
          <span className="relative z-10">
            <ThemeIcon
              name={project.biome === 'forest' ? 'forest' : project.biome === 'desert' ? 'briefcase' : project.biome === 'sky' ? 'legal' : 'ai'}
              size={38}
              color={project.color}
            />
          </span>
        </div>

        <div className="font-pixel text-[10px] sm:text-[11px] md:text-xs text-center" style={{ color: project.color }}>{project.name}</div>
        <div className="font-body text-xs sm:text-sm text-purple-100/90 text-center mt-2">{project.subtitle}</div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 w-full">
          {Object.entries(project.stats).map(([k, v]) => (
            <StatPill key={k} label={k.toUpperCase()} val={v} color={project.color} />
          ))}
        </div>
      </div>

      {/* Right: info panel */}
      <div className={`p-5 sm:p-6 md:p-8 flex flex-col justify-center ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <div className="font-pixel text-[9px] mb-2" style={{ color: project.color }}>
          ▶ ITEM ACQUIRED
        </div>
        <h3 className="font-pixel text-2xl text-white mb-3">{project.name}</h3>
        <div className="font-body text-base text-purple-100/90 mb-4">{project.subtitle}</div>
        <p className="font-body text-base text-purple-100/90 leading-relaxed mb-5">{project.desc}</p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((s) => (
            <span key={s} className="font-body text-xs px-2.5 py-1.5 border border-white/25 text-purple-100/90 hover:border-pixel/40 hover:text-white transition-colors">
              {s}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <a href={project.github}
            className="font-pixel text-[9px] px-4 py-2 border-2 transition-all duration-200 hover:scale-105"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: project.color, color: project.color, boxShadow: `3px 3px 0 ${project.accent}` }}>
            ▶ VIEW CODE
          </a>
          <Link href={`/projects/${project.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="font-pixel text-[9px] px-3 py-2 border border-white/20 text-purple-100/90 hover:text-white hover:border-white/50 transition-colors">
            INSPECT ITEM
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#001A1A] via-[#070412] to-[#0F0A1E]" />

      {/* Floating particles */}
      {['#FF6B9D', '#C084FC', '#2DD4BF', '#FBBF24'].map((c, i) => (
        <div key={i} className="absolute animate-float opacity-20"
          style={{ width: 8, height: 8, background: c, left: `${20 + i * 20}%`, top: `${10 + i * 15}%`, animationDelay: `${i * 0.8}s` }} />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-pixel text-[10px] text-gold mb-3">▶ BIOME: ITEM DUNGEON</div>
          <h2 className="font-pixel text-2xl md:text-3xl gradient-text mb-4">INVENTORY</h2>
          <div className="font-body text-purple-100/90 max-w-2xl mx-auto text-base">Projects built, battles won. Click any card to open the full project world and details.</div>
        </div>

        {/* Projects list */}
        <div className="space-y-8">
          {projects.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
