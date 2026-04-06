import { useEffect, useRef, useState } from 'react';
import { skills, stats } from '../data/portfolio';
import ThemeIcon from './ThemeIcon';

const biomeColors = {
  'Full Stack': { bg: 'from-[#0F2A0F] to-[#071A07]', accent: '#22C55E', border: '#16A34A', icon: 'sword', label: 'FOREST BIOME' },
  'Languages': { bg: 'from-[#1A0A00] to-[#0A0500]', accent: '#F59E0B', border: '#D97706', icon: 'scroll', label: 'DESERT BIOME' },
  'AI / ML & Cloud': { bg: 'from-[#070020] to-[#030010]', accent: '#8B5CF6', border: '#7C3AED', icon: 'orb', label: 'MAGIC BIOME' },
  'Tools': { bg: 'from-[#001A2A] to-[#000D14]', accent: '#06B6D4', border: '#0891B2', icon: 'tools', label: 'OCEAN BIOME' },
  'CS Fundamentals': { bg: 'from-[#1A0010] to-[#0A0008]', accent: '#EC4899', border: '#DB2777', icon: 'geometry', label: 'CRYSTAL BIOME' },
};

function StatBar({ label, value, color, icon, index }) {
  const [width, setWidth] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setWidth(value), index * 150);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, index]);

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          <ThemeIcon name={icon} size={15} color={color} />
          <span className="font-pixel text-[9px] text-white">{label}</span>
        </div>
        <div className="font-pixel text-[9px]" style={{ color }}>{width}%</div>
      </div>
      <div className="w-full h-3 bg-white/10 border border-white/20" style={{ imageRendering: 'pixelated' }}>
        <div className="h-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ width: `${width}%`, background: color }}>
          <div className="absolute inset-0 bg-white/20 animate-shimmer"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', backgroundSize: '200% 100%' }} />
        </div>
      </div>
    </div>
  );
}

function SkillTag({ name, color, delay }) {
  return (
    <div className="inline-block animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="font-pixel text-[7px] px-2.5 py-1.5 border transition-all duration-200 hover:scale-105 cursor-default"
        style={{ borderColor: color, color, background: `${color}15`, boxShadow: `2px 2px 0 ${color}40` }}>
        {name}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F2A0F] via-[#0F0A1E] to-[#0F0A1E]" />

      {/* Pixel grid overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="font-pixel text-[9px] text-teal mb-3">▶ BIOME: SKILL FOREST</div>
          <h2 className="font-pixel text-2xl md:text-3xl gradient-text mb-4">SKILL TREE</h2>
          <div className="font-body text-muted max-w-md mx-auto text-sm">Unlock abilities and master technologies across multiple magical biomes</div>
        </div>

        {/* Stats panel */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-darker/60 border border-pixel/20 p-6 backdrop-blur-sm"
            style={{ boxShadow: '4px 4px 0 rgba(255,107,157,0.2)' }}>
            <div className="font-pixel text-[9px] text-pixel mb-6">▶ ATTRIBUTE POINTS</div>
            {stats.map((s, i) => <StatBar key={s.label} {...s} index={i} />)}
          </div>

          {/* Level card */}
          <div className="bg-darker/60 border border-gold/30 p-6 backdrop-blur-sm"
            style={{ boxShadow: '4px 4px 0 rgba(251,191,36,0.3)' }}>
            <div className="font-pixel text-[9px] text-gold mb-6">▶ CHARACTER INFO</div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
              {[
                { label: 'LEVEL', val: '03', color: '#FBBF24' },
                { label: 'CLASS', val: 'FULL STACK', color: '#FF6B9D' },
                { label: 'CGPA', val: '7.3', color: '#2DD4BF' },
                { label: 'INTERN XP', val: '2x', color: '#C084FC' },
              ].map((item) => (
                <div key={item.label} className="bg-card/50 border border-white/10 p-2.5 sm:p-3 text-center min-w-0">
                  <div className="font-pixel text-[7px] text-muted mb-1">{item.label}</div>
                  <div
                    className={`font-pixel leading-tight break-words ${item.label === 'CLASS' ? 'text-sm sm:text-base md:text-lg' : 'text-base sm:text-lg'}`}
                    style={{ color: item.color }}
                  >
                    {item.val}
                  </div>
                </div>
              ))}
            </div>
            <div className="font-pixel text-[7px] text-muted mb-2">OVERALL PROGRESS</div>
            <div className="w-full h-4 bg-white/10 border border-white/20">
              <div className="h-full w-4/5 relative overflow-hidden"
                style={{ background: 'linear-gradient(90deg, #FF6B9D, #C084FC, #2DD4BF)' }}>
                <div className="absolute inset-0 animate-shimmer"
                  style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', backgroundSize: '200% 100%' }} />
              </div>
            </div>
            <div className="font-pixel text-[7px] text-right text-pixel mt-1">80 / 100 XP</div>
          </div>
        </div>

        {/* Skill biomes grid */}
        <div className="space-y-6">
          {Object.entries(skills).map(([category, items]) => {
            const biome = biomeColors[category];
            return (
              <div key={category} className={`relative bg-gradient-to-r ${biome.bg} border p-6 overflow-hidden game-card`}
                style={{ borderColor: biome.border + '50', boxShadow: `4px 4px 0 ${biome.accent}30` }}>
                {/* Biome label */}
                <div className="absolute top-3 right-4">
                  <div className="font-pixel text-[7px] opacity-40" style={{ color: biome.accent }}>{biome.label}</div>
                </div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 border flex items-center justify-center text-base"
                    style={{ borderColor: biome.border, background: `${biome.accent}20` }}>
                    <ThemeIcon name={biome.icon} size={16} color={biome.accent} />
                  </div>
                  <div className="font-pixel text-[9px]" style={{ color: biome.accent }}>{category.toUpperCase()}</div>
                  <div className="font-pixel text-[7px] px-2 py-0.5 border" style={{ borderColor: biome.accent, color: biome.accent }}>
                    {items.length} UNLOCKED
                  </div>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {items.map((item, i) => (
                    <SkillTag key={item} name={item} color={biome.accent} delay={i * 80} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
