import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { HudCorners } from './HudFrame';

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Reveal-on-scroll wrapper: fades + rises panels into view ───────────── */
export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (prefersReduced()) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ── CRT power-on: one-shot boot flash over the whole page ──────────────── */
export function CrtBoot() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (prefersReduced()) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
      <div className="crt-boot absolute inset-0" />
    </div>
  );
}

/* ── Ambient biome particles drifting upward behind the content ─────────── */
const FX_COLORS = {
  forest: ['#22C55E', '#4ADE80', '#A7F3D0'],
  desert: ['#FBBF24', '#FCD34D', '#FDE68A'],
  sky: ['#C084FC', '#A78BFA', '#E9D5FF'],
  lava: ['#F87171', '#FB923C', '#FBBF24'],
};

export function BiomeFX({ biome }) {
  const colors = FX_COLORS[biome] || FX_COLORS.forest;
  // Deterministic pseudo-random (seeded by index) so SSR and client markup match.
  const particles = useMemo(() => {
    const rand = (i, n) => (Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1;
    const frac = (v) => Math.abs(v - Math.trunc(v));
    return Array.from({ length: 26 }, (_, i) => ({
      left: (i / 26) * 100 + frac(rand(i, 1)) * 3,
      bottom: frac(rand(i, 2)) * 45,
      size: 2 + Math.floor(frac(rand(i, 3)) * 4),
      dur: 7 + frac(rand(i, 4)) * 7,
      delay: frac(rand(i, 5)) * 8,
      drift: frac(rand(i, 6)) * 28 - 14,
      op: 0.3 + frac(rand(i, 7)) * 0.45,
      color: colors[i % colors.length],
    }));
  }, [biome, colors]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map((p, i) => (
        <span
          key={i}
          className="fx-particle absolute"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            imageRendering: 'pixelated',
            '--fx-dur': `${p.dur}s`,
            '--fx-delay': `${p.delay}s`,
            '--fx-drift': `${p.drift}px`,
            '--fx-op': p.op,
          }}
        />
      ))}
    </div>
  );
}

/* ── Quest-giver dialogue box that types out the mission hook ───────────── */
export function QuestDialogue({ project, color, glow }) {
  const message = `A new contract appears on the board... "${project.name}" — ${project.subtitle}.`;
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    if (prefersReduced()) {
      setShown(message);
      setDone(true);
      return;
    }
    idx.current = 0;
    setShown('');
    setDone(false);
    const id = setInterval(() => {
      idx.current += 1;
      setShown(message.slice(0, idx.current));
      if (idx.current >= message.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 28);
    return () => clearInterval(id);
  }, [message]);

  return (
    <div
      className="relative border bg-black/55 backdrop-blur-sm p-4 md:p-5 mb-7 flex gap-4 items-start"
      style={{ borderColor: `${color}66`, boxShadow: `0 0 22px ${glow}` }}
    >
      <HudCorners color={color} />
      <div
        className="shrink-0 w-12 h-12 border-2 flex items-center justify-center"
        style={{ borderColor: color, background: `${color}20`, boxShadow: `0 0 12px ${glow}` }}
      >
        <span className="font-pixel text-[16px]" style={{ color }}>!</span>
      </div>
      <div className="min-w-0">
        <div className="font-pixel text-[8px] mb-2" style={{ color }}>▶ QUEST GIVER · SYSTEM</div>
        <p className="font-body text-base md:text-lg text-white/90 leading-relaxed min-h-[2.5rem]">
          {shown}
          <span className={`ml-0.5 ${done ? 'opacity-0' : 'animate-ping'}`} style={{ color }}>▌</span>
        </p>
        {done && (
          <div className="font-pixel text-[7px] text-gold mt-2 coin-blink">▼ READ THE FULL MISSION BRIEF BELOW ▼</div>
        )}
      </div>
    </div>
  );
}

/* ── Mini arcade screen that launches the in-page game ──────────────────── */
export function GamePreviewTile({ color, glow, onPlay }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group relative w-full border-2 overflow-hidden text-left transition-all duration-150 hover:-translate-y-0.5"
      style={{ borderColor: color, boxShadow: `0 0 18px ${glow}` }}
      aria-label="Play mini-game"
    >
      <HudCorners color={color} />
      <div className="relative h-28 bg-[#05010E] scanlines overflow-hidden">
        <div className="absolute bottom-3 left-0 right-0 h-px" style={{ background: `${color}99` }} />
        <div className="mini-runner absolute bottom-3 left-8 w-4 h-4" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
        <div className="mini-obstacle absolute bottom-3 right-0 w-3 h-5 bg-white/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="coin-blink font-pixel text-[9px] text-white" style={{ textShadow: `0 0 10px ${color}` }}>
            ▶ INSERT COIN
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between px-3 py-2 bg-black/50">
        <span className="font-pixel text-[8px]" style={{ color }}>◆ PLAYABLE MINI-GAME</span>
        <span className="font-pixel text-[8px] transition-transform group-hover:translate-x-1" style={{ color }}>▶</span>
      </div>
    </button>
  );
}

/* ── Scrolling arcade marquee advertising the playable demo ─────────────── */
export function ArcadeMarquee({ color, glow, onPlay }) {
  const text = '★ PLAYABLE DEMO INSIDE ★ PRESS PLAY TO ENTER THE GAME ';
  return (
    <button
      type="button"
      onClick={onPlay}
      className="relative w-full overflow-hidden border-2 py-2 mb-6"
      style={{ borderColor: color, boxShadow: `0 0 20px ${glow}`, background: 'rgba(5,1,14,0.6)' }}
      aria-label="Play mini-game"
    >
      <div className="flex whitespace-nowrap marquee-track">
        {[0, 1].map((k) => (
          <span key={k} className="font-pixel text-[9px] px-2" style={{ color, textShadow: `0 0 8px ${color}` }}>
            {text.repeat(2)}
          </span>
        ))}
      </div>
    </button>
  );
}

/* ── World-map quest navigation between projects ────────────────────────── */
export function QuestNav({ projects, currentSlug, color }) {
  const i = projects.findIndex((p) => p.slug === currentSlug);
  if (i < 0) return null;
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <div className="mt-10 border-t pt-6" style={{ borderColor: `${color}30` }}>
      <div className="font-pixel text-[8px] text-center mb-4" style={{ color }}>◆ WORLD MAP · SELECT A QUEST</div>

      <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
        {projects.map((p, idx) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            title={p.name}
            className="relative w-7 h-7 border flex items-center justify-center font-pixel text-[7px] transition-all hover:-translate-y-0.5"
            style={
              idx === i
                ? { borderColor: p.color, color: '#FFFFFF', background: `${p.color}33`, boxShadow: `0 0 12px ${p.color}` }
                : { borderColor: `${p.color}55`, color: p.color, background: 'rgba(0,0,0,0.3)' }
            }
          >
            {idx + 1}
          </Link>
        ))}
      </div>

      <div className="flex items-stretch justify-between gap-3">
        <Link
          href={`/projects/${prev.slug}`}
          className="flex-1 border-2 px-3 py-2 font-pixel text-[8px] transition-all hover:-translate-y-0.5"
          style={{ borderColor: `${prev.color}66`, color: prev.color, boxShadow: `0 0 10px ${prev.color}22` }}
        >
          <span className="block text-[6px] text-muted mb-1">◀ PREV QUEST</span>
          {prev.name}
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="flex-1 text-right border-2 px-3 py-2 font-pixel text-[8px] transition-all hover:-translate-y-0.5"
          style={{ borderColor: `${next.color}66`, color: next.color, boxShadow: `0 0 10px ${next.color}22` }}
        >
          <span className="block text-[6px] text-muted mb-1">NEXT QUEST ▶</span>
          {next.name}
        </Link>
      </div>
    </div>
  );
}
