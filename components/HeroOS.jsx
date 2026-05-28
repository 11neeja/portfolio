import { useEffect, useRef, useState } from 'react';
import { hero } from '../data/portfolio';

const PROJECTS = [
  { slug: 'medihub', name: 'MediHUB', game: 'Memory Pulse', color: '#A78BFA' },
  { slug: 'drishti', name: 'Drishti', game: 'Anomaly Sweep', color: '#F43F5E' },
  { slug: 'ecovision', name: 'EcoVision', game: 'Snake Game', color: '#2DD4BF' },
  { slug: 'joblink', name: 'JobLink', game: 'Flappy Bird', color: '#FBBF24' },
  { slug: 'documind', name: 'DocuMind', game: 'Tetris', color: '#C084FC' },
  { slug: 'smartpay', name: 'SmartPAY', game: '2048', color: '#FF6B9D' },
];

// Frosted "window" wrapper with traffic-light chrome.
function WinChrome({ title, color, children, className = '' }) {
  return (
    <div className={`bg-darker/80 backdrop-blur-md border border-white/12 ${className}`} style={{ boxShadow: '0 24px 70px -28px rgba(0,0,0,0.85)' }}>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10" style={{ background: `linear-gradient(90deg, ${color}22, transparent)` }}>
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF6B9D' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FBBF24' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#2DD4BF' }} />
        </span>
        <span className="font-pixel text-[8px] tracking-wide" style={{ color }}>{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// The project detail table (kept from the original hero).
function ProjectsTable() {
  return (
    <WinChrome title="projects.exe" color="#FF6B9D">
      <div className="flex items-center gap-3 px-1 pb-1 mb-2 border-b border-white/15">
        <div className="font-pixel text-[8px] text-muted w-20">PROJECT</div>
        <div className="font-pixel text-[8px] text-muted flex-1">GAME</div>
        <div className="font-pixel text-[8px] text-muted w-14 text-center">VIEW</div>
      </div>
      {PROJECTS.map((p) => (
        <div key={p.slug} className="flex items-center gap-3 px-1 mb-1.5 last:mb-0">
          <div className="font-pixel text-[9px] text-white w-20 truncate">{p.name}</div>
          <div className="font-pixel text-[9px] flex-1 truncate" style={{ color: p.color }}>{p.game}</div>
          <a
            href={`/projects/${p.slug}`}
            className="font-pixel text-[8px] w-14 text-center px-2 py-1 border transition-colors hover:bg-white/10"
            style={{ borderColor: `${p.color}60`, color: p.color }}
          >
            VIEW
          </a>
        </div>
      ))}
    </WinChrome>
  );
}

// 4-point pixel sparkle that twinkles in place. Positions are passed in via top/left/right.
function Sparkle({ top, left, right, size = 10, color = '#FBBF24', delay = 0 }) {
  return (
    <span
      className="absolute animate-sparkle pointer-events-none"
      style={{ top, left, right, width: size, height: size, animationDelay: `${delay}s` }}
      aria-hidden
    >
      <span
        className="block w-full h-full"
        style={{
          background: color,
          clipPath: 'polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)',
          filter: `drop-shadow(0 0 6px ${color})`,
        }}
      />
    </span>
  );
}

// Big idle character art for the hero — hovers up/down with sparkle-stars orbiting it.
function HeroArt() {
  const stars = [
    { top: '4%',  left: '6%',   size: 11, color: '#FBBF24', delay: 0    },
    { top: '0%',  left: '50%',  size: 7,  color: '#2DD4BF', delay: 0.55 },
    { top: '10%', right: '4%',  size: 13, color: '#FF6B9D', delay: 1.1  },
    { top: '32%', left: '-3%',  size: 9,  color: '#C084FC', delay: 0.3  },
    { top: '38%', right: '-2%', size: 10, color: '#FBBF24', delay: 1.45 },
    { top: '60%', left: '3%',   size: 8,  color: '#2DD4BF', delay: 0.9  },
    { top: '66%', right: '6%',  size: 12, color: '#C084FC', delay: 0.2  },
    { top: '82%', left: '42%',  size: 6,  color: '#FBBF24', delay: 1.7  },
  ];

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[560px] lg:max-w-[760px] mx-auto lg:mx-0">
      {/* Soft aura glow behind the character */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 42%, rgba(192,132,252,0.22), transparent 65%)',
          filter: 'blur(22px)',
        }}
        aria-hidden
      />

      {/* Twinkling sparkle-stars around the character */}
      {stars.map((s, i) => (
        <Sparkle key={i} {...s} />
      ))}

      {/* Character image, gently hovering */}
      <img
        src="/idle.png"
        alt="Neeja character"
        className="relative w-full h-auto block select-none animate-float"
        style={{ imageRendering: 'pixelated' }}
        draggable={false}
      />

      {/* Soft floor shadow — stays in place while the character bobs above it */}
      <div
        className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-1/2 h-5 rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(192,132,252,0.45), transparent 70%)', filter: 'blur(6px)' }}
        aria-hidden
      />
    </div>
  );
}

export default function HeroOS() {
  const [booting, setBooting] = useState(true);
  const wallRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 650);
    return () => clearTimeout(t);
  }, []);

  // Subtle mouse parallax on the wallpaper name.
  useEffect(() => {
    const onMove = (e) => {
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      if (wallRef.current) wallRef.current.style.transform = `translate3d(${dx * 24}px, ${dy * 24}px, 0)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center overflow-hidden scanlines">
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07001A] via-[#110030] to-[#0B0420]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-25" style={{ background: '#C084FC' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: '#2DD4BF' }} />
      <div ref={wallRef} className="absolute inset-0 grid items-start lg:items-center justify-items-center pointer-events-none select-none transition-transform duration-200 ease-out pt-[18vh] lg:pt-0">
        <h1 className="font-pixel gradient-text leading-none text-center opacity-[0.10] text-[clamp(3rem,18vw,11rem)]">NEEJA<br />SUVA</h1>
      </div>

      {/* Main: IDLE ART (left) + NAME (right), project table under the name */}
      <div className="relative z-30 w-full px-4 sm:px-6 lg:px-10 pt-16 pb-10">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left — big idle character art (spans both rows on desktop) */}
          <div className="lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2 flex items-center justify-center py-6">
            <HeroArt />
          </div>

          {/* Right — name + buttons */}
          <div className="lg:col-start-3 lg:col-span-3 lg:row-start-1 text-center lg:text-right lg:pr-32">
            <div className="inline-flex items-center gap-2 font-pixel text-[8px] text-teal mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
              </span>
              AVAILABLE FOR WORK
            </div>
            <h1 className="font-pixel text-[clamp(2.4rem,11vw,4.8rem)] gradient-text leading-[0.95] mb-4" style={{ textShadow: '4px 4px 0 rgba(192,132,252,0.3)' }}>
              NEEJA SUVA
            </h1>
            <div className="font-body text-base sm:text-lg md:text-xl text-purple-200 mb-2">Full Stack &amp; AI/ML Developer</div>
            <div className="font-pixel text-[8px] text-muted mb-6">{hero.class} · LV {String(hero.level).padStart(2, '0')} · {hero.origin}</div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              {[
                { label: '▶ VIEW WORK', href: '#projects', primary: true },
                { label: '✦ HIRE ME', href: '#contact', primary: false },
              ].map((btn) => (
                <a key={btn.label} href={btn.href}
                  className={`font-pixel text-[9px] px-5 py-3 border-2 transition-all duration-200 w-full max-w-[260px] sm:w-auto ${btn.primary
                    ? 'bg-pixel text-white border-pixel hover:bg-transparent hover:text-pixel'
                    : 'bg-transparent text-teal border-teal hover:bg-teal hover:text-darker'}`}
                  style={{ boxShadow: btn.primary ? '4px 4px 0 #C084FC' : '4px 4px 0 #0D9488' }}>
                  {btn.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right, lower — project detail table */}
          <div className="lg:col-start-3 lg:col-span-3 lg:row-start-2 lg:pr-32">
            <div className="ml-auto max-w-[360px]">
              <ProjectsTable />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 font-pixel text-[7px] text-muted animate-bounce">SCROLL TO EXPLORE ▼</div>

      {/* Boot flash */}
      <div className={`pointer-events-none fixed inset-0 z-[60] bg-darker transition-opacity duration-500 ${booting ? 'opacity-100' : 'opacity-0'}`}>
        <div className="grid place-items-center h-full font-pixel text-[10px] text-teal">NEEJA_OS · booting…</div>
      </div>
    </section>
  );
}
