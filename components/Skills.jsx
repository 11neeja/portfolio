import { Fragment, useEffect, useRef, useState } from 'react';
import { skills, stats, experience, hero } from '../data/portfolio';
import ThemeIcon from './ThemeIcon';

// Gamified hover palette — each word lights up in a rotating theme color.
const briefPalette = ['#2DD4BF', '#FF6B9D', '#C084FC', '#FBBF24', '#22C55E', '#38BDF8'];

const biomeColors = {
  'Full Stack': { bg: 'from-[#0F2A0F] to-[#071A07]', accent: '#22C55E', border: '#16A34A', icon: 'sword', label: 'FOREST BIOME' },
  'Languages': { bg: 'from-[#1A0A00] to-[#0A0500]', accent: '#F59E0B', border: '#D97706', icon: 'scroll', label: 'DESERT BIOME' },
  'AI / ML & Cloud': { bg: 'from-[#070020] to-[#030010]', accent: '#8B5CF6', border: '#7C3AED', icon: 'orb', label: 'MAGIC BIOME' },
  'Development Tools': { bg: 'from-[#001A2A] to-[#000D14]', accent: '#06B6D4', border: '#0891B2', icon: 'tools', label: 'OCEAN BIOME' },
};

const questBiomeThemes = {
  cyberpunk: { bg: 'from-[#001A1A] to-[#070412]', label: 'CYBER CITY BIOME' },
  sky: { bg: 'from-[#0A001A] to-[#070412]', label: 'SKY TEMPLE BIOME' },
};

const tabs = [
  { id: 'about', label: 'ABOUT', icon: 'scroll', color: '#FBBF24', glow: 'rgba(251,191,36,0.3)', sub: 'CHARACTER LORE' },
  { id: 'skills', label: 'SKILLS', icon: 'sword', color: '#22C55E', glow: 'rgba(34,197,94,0.3)', sub: 'UNLOCKED ABILITIES' },
  { id: 'quests', label: 'QUEST LOG', icon: 'shield', color: '#2DD4BF', glow: 'rgba(45,212,191,0.3)', sub: 'COMPLETED MISSIONS' },
  { id: 'level', label: 'LEVEL', icon: 'orb', color: '#FF6B9D', glow: 'rgba(255,107,157,0.3)', sub: 'CHARACTER STATS' },
];

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

const cornerPositions = [
  'top-1.5 left-1.5 border-t-2 border-l-2',
  'top-1.5 right-1.5 border-t-2 border-r-2',
  'bottom-1.5 left-1.5 border-b-2 border-l-2',
  'bottom-1.5 right-1.5 border-b-2 border-r-2',
];

function TabButton({ tab, active, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-pressed={active}
      className={`game-tab group relative text-left bg-darker/60 border p-5 backdrop-blur-sm overflow-hidden ${active ? 'is-active' : ''}`}
      style={{
        '--tc': tab.color,
        '--tc-soft': `${tab.color}40`,
        '--tc-glow': tab.glow,
        '--tc-bg': `${tab.color}24`,
        '--tc-shadow-soft': `${tab.color}20`,
      }}
    >
      {/* Top accent line — full when active, grows from center on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{ background: tab.color, boxShadow: `0 0 8px ${tab.color}`, transform: active ? 'scaleX(1)' : undefined }}
      />

      {/* Diagonal light sweep on hover */}
      <div
        className="tab-sweep pointer-events-none absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out"
        style={{ background: 'linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.10) 50%, transparent 58%)' }}
      />

      {/* Targeting brackets — faint, snap to full on hover / select */}
      {cornerPositions.map((pos, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute w-2.5 h-2.5 transition-opacity duration-200 ${pos} ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          style={{ borderColor: tab.color }}
        />
      ))}

      <div className="relative flex items-center gap-3 mb-2">
        <div className="tab-icon w-8 h-8 border flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
          style={{ borderColor: tab.color, background: `${tab.color}20` }}>
          <ThemeIcon name={tab.icon} size={16} color={tab.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-pixel text-[9px]" style={{ color: tab.color }}>▶ {tab.label}</div>
          <div className="font-pixel text-[7px] text-muted mt-1">{tab.sub}</div>
        </div>
      </div>

      <div className="relative flex items-center justify-between mt-3">
        <div className="tab-cta font-pixel text-[7px]" style={active ? { color: tab.color } : undefined}>
          {active ? '◆ ACTIVE' : '▶ CLICK TO OPEN'}
        </div>
        <div className="font-pixel text-[8px] transition-transform duration-200 group-hover:translate-x-1"
          style={{ color: tab.color }}>{active ? '▼' : '▶'}</div>
      </div>
    </button>
  );
}

function PanelHeader({ tab }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b" style={{ borderColor: `${tab.color}30` }}>
      <div className="w-10 h-10 border flex items-center justify-center" style={{ borderColor: tab.color, background: `${tab.color}20` }}>
        <ThemeIcon name={tab.icon} size={20} color={tab.color} />
      </div>
      <div>
        <div className="font-pixel text-[10px]" style={{ color: tab.color }}>▶ {tab.label}</div>
        <div className="font-pixel text-[7px] text-muted mt-1">{tab.sub}</div>
      </div>
    </div>
  );
}

function CharacterBrief() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  // Terminal "session": each command is run, then its output streams in word by word.
  const lines = [
    { type: 'cmd', className: 'font-pixel text-[10px] text-teal', segments: [{ text: '> cat character-brief.md' }] },
    {
      type: 'out',
      className: 'font-body text-purple-100/90 text-base md:text-[17px] leading-relaxed',
      segments: [
        { text: "Hi, I'm " },
        { text: hero.name, className: 'text-pixel font-medium' },
        { text: " — officially a full stack and ai/ml developer, unofficially the menace who opens the editor to vibe code for fun and somehow exits with production-ready projects. No notes. I build full-stack systems that refuse to break (most days), train ML models until they stop hallucinating, and ship interactive products end-to-end. My game-feel UX hits so different that other devs lowkey want to copy it into their own projects — flattering, honestly. Basically built different. Sleep? Still a stretch goal, but I'm manifesting it." },
      ],
    },
    { type: 'cmd', className: 'font-pixel text-[10px] text-teal', segments: [{ text: '> cat off-the-clock.md' }] },
    {
      type: 'out',
      className: 'font-body text-purple-100/80 text-base md:text-[17px] leading-relaxed',
      segments: [
        { text: "Off the clock I'm fully in my side-quest era — laps in the pool, time on the dance floor, and exploring new places with zero itinerary and full delusion. Swimming hits the mental reset button, dancing keeps the vibes immaculate, and travel keeps the curiosity bar maxed. Because let's be real — the best ideas never spawn anywhere near a keyboard." },
      ],
    },
  ];

  // Flatten every line into an ordered stream of word tokens, each with a hover color.
  const tokens = [];
  lines.forEach((line, li) => {
    line.segments.forEach((seg) => {
      seg.text.split(' ').forEach((word) => {
        if (word === '') return;
        const hc = line.type === 'cmd' ? '#2DD4BF' : briefPalette[tokens.length % briefPalette.length];
        tokens.push({ gi: tokens.length, li, word, className: seg.className, hc, hcSoft: `${hc}59` });
      });
    });
  });
  const total = tokens.length;

  // Start typing only once the panel scrolls into view.
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStarted(true);
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Reveal one token at a time; commands type a touch slower than output.
  useEffect(() => {
    if (!started || count >= total) return;
    const isCmd = lines[tokens[count].li].type === 'cmd';
    const t = setTimeout(() => setCount((c) => c + 1), isCmd ? 60 : 34);
    return () => clearTimeout(t);
  }, [started, count, total]);

  const cursorLi = count < total ? tokens[count].li : lines[lines.length - 1].li;

  return (
    <div ref={ref} className="space-y-3 min-h-[280px]">
      {lines.map((line, li) => {
        const revealed = tokens.filter((t) => t.li === li && t.gi < count);
        if (revealed.length === 0 && li !== cursorLi) return null;
        return (
          <p key={li} className={line.className}>
            {revealed.map((t, i) => (
              <Fragment key={t.gi}>
                {i > 0 ? ' ' : ''}
                <span
                  className={`relative inline-block origin-bottom transition-all duration-200 ease-out cursor-default hover:z-10 hover:text-[1.22em] hover:font-semibold hover:tracking-wide hover:-translate-y-px hover:[color:var(--hc)] hover:[text-shadow:2px_2px_0_var(--hc-soft),4px_4px_0_var(--hc-faint)] ${t.className || ''}`}
                  style={{ '--hc': t.hc, '--hc-soft': t.hcSoft, '--hc-faint': `${t.hc}26` }}
                >
                  {t.word}
                </span>
              </Fragment>
            ))}
            {li === cursorLi && (
              <span className="inline-block align-baseline ml-0.5 text-teal animate-pulse">▌</span>
            )}
          </p>
        );
      })}
    </div>
  );
}

function AboutPanel() {
  const tab = tabs.find((t) => t.id === 'about');
  const info = [
    { label: 'NAME', value: hero.name, color: '#FBBF24' },
    { label: 'CLASS', value: hero.class, color: '#FF6B9D' },
    { label: 'ORIGIN', value: hero.origin, color: '#2DD4BF' },
    { label: 'MODE', value: 'Caffeinated', color: '#C084FC' },
  ];

  return (
    <div className="bg-darker/60 border p-6 md:p-8 backdrop-blur-sm" style={{ borderColor: `${tab.color}30`, boxShadow: `4px 4px 0 ${tab.glow}` }}>
      <PanelHeader tab={tab} />

      <div className="grid md:grid-cols-5 gap-6 items-start">
        <div className="md:col-span-3 space-y-4">
          <div className="font-pixel text-[8px] text-teal">▶ CHARACTER BRIEF</div>
          <CharacterBrief />

          <div className="flex flex-wrap gap-2 pt-2">
            {['Pixel-perfect UI', 'Scalable APIs', 'AI / ML pipelines', 'Game-feel UX'].map((t) => (
              <div key={t} className="font-pixel text-[7px] px-2.5 py-1.5 border border-pixel/40 text-pixel" style={{ background: 'rgba(255,107,157,0.08)' }}>
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-3">
          {info.map((item) => (
            <div key={item.label} className="bg-card/50 border border-white/10 p-3 min-w-0">
              <div className="font-pixel text-[7px] text-muted mb-1.5">{item.label}</div>
              <div className="font-pixel text-[9px] leading-tight break-words" style={{ color: item.color }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsPanel() {
  const tab = tabs.find((t) => t.id === 'skills');
  return (
    <div className="space-y-5">
      <div className="bg-darker/60 border p-6 backdrop-blur-sm" style={{ borderColor: `${tab.color}30`, boxShadow: `4px 4px 0 ${tab.glow}` }}>
        <PanelHeader tab={tab} />

        <div className="space-y-6">
          {Object.entries(skills).map(([category, items]) => {
            const biome = biomeColors[category];
            return (
              <div key={category} className={`relative bg-gradient-to-r ${biome.bg} border p-6 overflow-hidden game-card`}
                style={{ borderColor: biome.border + '50', boxShadow: `4px 4px 0 ${biome.accent}30` }}>
                <div className="absolute top-3 right-4">
                  <div className="font-pixel text-[7px] opacity-40" style={{ color: biome.accent }}>{biome.label}</div>
                </div>
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
                <div className="flex flex-wrap gap-2">
                  {items.map((item, i) => (
                    <SkillTag key={item} name={item} color={biome.accent} delay={i * 60} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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
  const theme = questBiomeThemes[exp.biome] || questBiomeThemes.cyberpunk;
  return (
    <div className={`relative bg-gradient-to-br ${theme.bg} border p-6 md:p-8 game-card overflow-hidden`}
      style={{ borderColor: `${exp.color}40`, boxShadow: `6px 6px 0 ${exp.color}25` }}>
      <div className="absolute top-0 right-0 font-pixel text-[7px] opacity-20 px-3 py-2" style={{ color: exp.color }}>
        {theme.label}
      </div>

      <div className="absolute top-4 left-4 w-10 h-10 border-2 flex items-center justify-center"
        style={{ borderColor: exp.color, background: `${exp.color}20` }}>
        <span className="font-pixel text-[10px]" style={{ color: exp.color }}>0{index + 1}</span>
      </div>

      <div className="ml-14">
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

        <div className="space-y-2.5">
          {exp.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1 shrink-0 w-3 h-3 border" style={{ borderColor: exp.color, background: `${exp.color}40` }} />
              <div className="font-body text-sm text-purple-100/80 leading-relaxed">{h}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 ml-14 flex gap-3 flex-wrap">
        <div className="font-pixel text-[7px] px-3 py-1.5 border border-gold/40 text-gold bg-gold/10">+500 XP EARNED</div>
        <div className="font-pixel text-[7px] px-3 py-1.5 border text-muted border-white/10">REAL-WORLD QUEST</div>
      </div>

      <div className="absolute bottom-0 right-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: exp.color }} />
    </div>
  );
}

function QuestLogPanel() {
  const tab = tabs.find((t) => t.id === 'quests');
  return (
    <div className="bg-darker/60 border p-6 md:p-8 backdrop-blur-sm" style={{ borderColor: `${tab.color}30`, boxShadow: `4px 4px 0 ${tab.glow}` }}>
      <PanelHeader tab={tab} />

      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { val: '3', label: 'QUESTS DONE' },
          { val: '20+', label: 'WEEKS' },
          { val: '2', label: 'CERTIFICATIONS' },
        ].map((s) => (
          <div key={s.label} className="bg-card/50 border border-white/10 px-4 py-3 text-center" style={{ boxShadow: '2px 2px 0 rgba(255,107,157,0.2)' }}>
            <div className="font-pixel text-xl text-pixel">{s.val}</div>
            <div className="font-pixel text-[7px] text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {experience.map((exp, i) => (
          <QuestCard key={i} exp={exp} index={i} />
        ))}
      </div>
    </div>
  );
}

function LevelPanel() {
  const tab = tabs.find((t) => t.id === 'level');
  return (
    <div className="bg-darker/60 border p-6 md:p-8 backdrop-blur-sm" style={{ borderColor: `${tab.color}30`, boxShadow: `4px 4px 0 ${tab.glow}` }}>
      <PanelHeader tab={tab} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { label: 'LEVEL', val: '03', color: '#FBBF24' },
          { label: 'CLASS', val: 'FULL STACK', color: '#FF6B9D' },
          { label: 'CGPA', val: '7.6', color: '#2DD4BF' },
          { label: 'INTERN XP', val: '3x', color: '#C084FC' },
        ].map((item) => (
          <div key={item.label} className="bg-card/50 border border-white/10 p-3 sm:p-4 text-center min-w-0">
            <div className="font-pixel text-[7px] text-muted mb-1.5">{item.label}</div>
            <div className={`font-pixel leading-tight break-words ${item.label === 'CLASS' ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}`} style={{ color: item.color }}>
              {item.val}
            </div>
          </div>
        ))}
      </div>

      <div className="font-pixel text-[7px] text-muted mb-2">OVERALL PROGRESS</div>
      <div className="w-full h-4 bg-white/10 border border-white/20">
        <div className="h-full w-4/5 relative overflow-hidden" style={{ background: 'linear-gradient(90deg, #FF6B9D, #C084FC, #2DD4BF)' }}>
          <div className="absolute inset-0 animate-shimmer"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', backgroundSize: '200% 100%' }} />
        </div>
      </div>
      <div className="font-pixel text-[7px] text-right text-pixel mt-1">80 / 100 XP</div>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('about');
  const panelRef = useRef(null);
  const didMountRef = useRef(false);

  useEffect(() => {
    const hashToTab = {
      '#about': 'about',
      '#skills': 'skills',
      '#experience': 'quests',
      '#quests': 'quests',
      '#level': 'level',
    };
    const apply = () => {
      const id = hashToTab[window.location.hash];
      if (id) setActiveTab(id);
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (panelRef.current) {
      const top = panelRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F2A0F] via-[#0F0A1E] to-[#0F0A1E]" />

      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hidden anchors so existing nav hashes (#experience) still land here */}
        <div id="experience" className="absolute -top-20" aria-hidden />
        <div id="about" className="absolute -top-20" aria-hidden />

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="font-pixel text-[9px] text-teal mb-3">▶ BIOME: SKILL FOREST</div>
          <h2 className="font-pixel text-2xl md:text-3xl gradient-text mb-4">CHARACTER PROFILE</h2>
          <div className="font-body text-muted max-w-md mx-auto text-sm">Inspect attributes, unlocked abilities, completed quests, and character level</div>
        </div>

        {/* Top row: ATTRIBUTE POINTS (kept as is) + 2x2 tab grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
          <div className="bg-darker/60 border border-pixel/20 p-6 backdrop-blur-sm" style={{ boxShadow: '4px 4px 0 rgba(255,107,157,0.2)' }}>
            <div className="font-pixel text-[9px] text-pixel mb-6">▶ ATTRIBUTE POINTS</div>
            {stats.map((s, i) => <StatBar key={s.label} {...s} index={i} />)}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 content-start">
            {tabs.map((tab) => (
              <TabButton key={tab.id} tab={tab} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} />
            ))}
          </div>
        </div>

        {/* Detail panel for the active tab */}
        <div ref={panelRef} className="animate-fade-in" key={activeTab}>
          {activeTab === 'about' && <AboutPanel />}
          {activeTab === 'skills' && <SkillsPanel />}
          {activeTab === 'quests' && <QuestLogPanel />}
          {activeTab === 'level' && <LevelPanel />}
        </div>
      </div>
    </section>
  );
}
