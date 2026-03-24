import { experience } from '../data/portfolio';
import ThemeIcon from './ThemeIcon';

const biomeThemes = {
  cyberpunk: {
    bg: 'from-[#001A1A] to-[#070412]',
    accent: '#2DD4BF',
    glow: 'rgba(45,212,191,0.3)',
    ground: '#0D3D3D',
    label: 'CYBER CITY BIOME',
  },
  sky: {
    bg: 'from-[#0A001A] to-[#070412]',
    accent: '#C084FC',
    glow: 'rgba(192,132,252,0.3)',
    ground: '#1A0533',
    label: 'SKY TEMPLE BIOME',
  },
};

function QuestBadge({ text, color }) {
  return (
    <div className="font-pixel text-[7px] px-2.5 py-1 border flex items-center gap-1.5"
      style={{ borderColor: color, color, background: `${color}15` }}>
      <ThemeIcon name="check" size={11} color={color} />
      {text}
    </div>
  );
}

function QuestCard({ exp, index }) {
  const theme = biomeThemes[exp.biome];
  return (
    <div className={`relative bg-gradient-to-br ${theme.bg} border p-6 md:p-8 game-card overflow-hidden`}
      style={{ borderColor: `${exp.color}40`, boxShadow: `6px 6px 0 ${exp.color}25` }}>

      {/* Biome bg label */}
      <div className="absolute top-0 right-0 font-pixel text-[7px] opacity-20 px-3 py-2"
        style={{ color: exp.color }}>
        {theme.label}
      </div>

      {/* Quest number */}
      <div className="absolute top-4 left-4 w-10 h-10 border-2 flex items-center justify-center"
        style={{ borderColor: exp.color, background: `${exp.color}20` }}>
        <span className="font-pixel text-[10px]" style={{ color: exp.color }}>0{index + 1}</span>
      </div>

      <div className="ml-14">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <div className="font-pixel text-[8px] mb-1" style={{ color: exp.color }}>▶ QUEST COMPLETE</div>
            <h3 className="font-pixel text-sm md:text-base text-white mb-1">{exp.company}</h3>
            <div className="font-body text-purple-300 text-sm font-medium">{exp.role}</div>
          </div>
          <div className="text-right">
            <QuestBadge text="COMPLETED" color={exp.color} />
            <div className="font-pixel text-[7px] text-muted mt-2">{exp.period}</div>
          </div>
        </div>

        {/* Highlights as quest objectives */}
        <div className="space-y-2.5">
          {exp.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1 shrink-0 w-3 h-3 border"
                style={{ borderColor: exp.color, background: `${exp.color}40` }} />
              <div className="font-body text-sm text-purple-100/80 leading-relaxed">{h}</div>
            </div>
          ))}
        </div>
      </div>

      {/* XP reward */}
      <div className="mt-6 ml-14 flex gap-3 flex-wrap">
        <div className="font-pixel text-[7px] px-3 py-1.5 border border-gold/40 text-gold bg-gold/10">
          +500 XP EARNED
        </div>
        <div className="font-pixel text-[7px] px-3 py-1.5 border text-muted border-white/10">
          REAL-WORLD QUEST
        </div>
      </div>

      {/* Decorative pixel corner */}
      <div className="absolute bottom-0 right-0 w-8 h-8 border-t-2 border-l-2"
        style={{ borderColor: exp.color }} />
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A1E] via-[#070412] to-[#001A1A]" />

      {/* Pixel stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="absolute bg-white animate-pulse"
          style={{
            width: 2, height: 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
            animationDelay: `${Math.random() * 3}s`,
          }} />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-pixel text-[9px] text-teal mb-3">▶ BIOME: CYBER CITY</div>
          <h2 className="font-pixel text-2xl md:text-3xl gradient-text mb-4">QUEST LOG</h2>
          <div className="font-body text-muted max-w-md mx-auto text-sm">Professional experience and completed quests in the real world</div>

          {/* Quest count */}
          <div className="flex justify-center gap-6 mt-8">
            {[
              { val: '2', label: 'QUESTS DONE' },
              { val: '6+', label: 'WEEKS' },
              { val: '2', label: 'CERTIFICATIONS' },
            ].map((s) => (
              <div key={s.label} className="text-center bg-card/50 border border-white/10 px-4 py-3"
                style={{ boxShadow: '2px 2px 0 rgba(255,107,157,0.2)' }}>
                <div className="font-pixel text-xl text-pixel">{s.val}</div>
                <div className="font-pixel text-[7px] text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-0 top-0 bottom-0 w-px ml-8 bg-gradient-to-b from-pixel via-pixel2 to-teal opacity-30 hidden md:block" />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <QuestCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
