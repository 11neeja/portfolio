import { useEffect, useRef, useState } from 'react';
import CharacterSprite from './CharacterSprite';
import ThemeIcon from './ThemeIcon';

// Stars component
function Stars() {
  const stars = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: (i / 70) * 100 + (Math.random() * 1.2 - 0.6),
    y: Math.random() * 62,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div key={s.id} className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            animation: `starTwinkle ${s.duration}s ${s.delay}s ease-in-out infinite, heroStarDrift ${70 + (s.id % 7) * 6}s ${s.delay}s linear infinite alternate`,
            opacity: 0.6,
          }} />
      ))}
    </div>
  );
}

// Floating particles
function Particles() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: (i / 22) * 100 + (Math.random() * 2.4 - 1.2),
    y: 60 + Math.random() * 40,
    color: ['#FF6B9D', '#C084FC', '#2DD4BF', '#FBBF24'][Math.floor(Math.random() * 4)],
    size: Math.floor(Math.random() * 3) + 2,
    delay: Math.random() * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div key={p.id} className="absolute"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size * 4, height: p.size * 4,
            background: p.color, opacity: 0.6,
            animation: `heroParticleFloat ${16 + (p.id % 4) * 1.2}s ${p.delay}s ease-in-out infinite, heroParticleDrift ${36 + (p.id % 5) * 5}s ${p.delay}s linear infinite alternate`,
            imageRendering: 'pixelated',
          }} />
      ))}
    </div>
  );
}

// Pixel cloud
function Cloud({ x, y, scale = 1 }) {
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: `scale(${scale})`, imageRendering: 'pixelated' }}>
      <div className="relative">
        <div className="bg-white/20 w-16 h-6 absolute top-0 left-2" />
        <div className="bg-white/20 w-24 h-6 absolute top-3 left-0" />
        <div className="bg-white/20 w-12 h-6 absolute top-3 left-8" />
      </div>
    </div>
  );
}

// Scrolling biome ground
function BiomeGround() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute bottom-20 left-0 w-full h-12 bg-gradient-to-b from-transparent to-green-900/40" />
      {/* Ground */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-[#0F2A0F] border-t-4 border-green-600/60" />
      {/* Grass details */}
      <div className="absolute bottom-16 left-0 w-full flex">
        {Array.from({ length: 220 }).map((_, i) => (
          <div key={i} style={{ width: 16, height: Math.random() * 8 + 4, background: '#22C55E', opacity: 0.7, imageRendering: 'pixelated', animation: `heroGrassPulse ${4.6 + (i % 4) * 0.6}s ${(i % 8) * 0.18}s ease-in-out infinite` }} />
        ))}
      </div>
      {/* Floating platforms */}
      {[2, 14, 26, 38, 50, 62, 74, 86, 94].map((x, i) => (
        <div key={i} className="absolute"
          style={{ left: `${x}%`, bottom: '60%', width: 64, height: 12, background: '#166534', border: '2px solid #16A34A', imageRendering: 'pixelated', animation: `heroPlatformBob 7.2s ${i * 0.35}s ease-in-out infinite` }} />
      ))}
      {/* Pixel trees */}
      {[3, 12, 21, 30, 39, 48, 57, 66, 75, 84, 93].map((x, i) => (
        <div key={i} className="absolute" style={{ left: `${x}%`, bottom: '18%', animation: `heroTreeSway ${8.8 + (i % 3) * 0.7}s ${i * 0.25}s ease-in-out infinite` }}>
          <div style={{ width: 8, height: 24, background: '#713F12', imageRendering: 'pixelated', margin: '0 auto' }} />
          <div style={{ width: 32, height: 32, background: '#15803D', imageRendering: 'pixelated', marginTop: -24, marginLeft: -12 }} />
          <div style={{ width: 20, height: 20, background: '#166534', imageRendering: 'pixelated', marginTop: -16, marginLeft: -6 }} />
        </div>
      ))}
    </div>
  );
}

const HERO_GROUND_PX = 84;
const OBSTACLE_GROUND_PX = HERO_GROUND_PX - 3;
const PLAYER_W = 56;
const BIOME_THEMES = [
  {
    name: 'FOREST',
    tint: 'rgba(16, 185, 129, 0.08)',
    hudBg: 'rgba(6, 36, 24, 0.72)',
    obstacleBase: '#5C3B1E',
    obstacleMid: '#7A4A22',
    obstacleTop: '#7B5A3A',
    obstacleLeaf: '#2F855A',
    obstacleLeafDark: '#276749',
    obstacleAccent: '#9AE6B4',
  },
  {
    name: 'GLACIER',
    tint: 'rgba(56, 189, 248, 0.1)',
    hudBg: 'rgba(8, 35, 52, 0.75)',
    obstacleBase: '#24536B',
    obstacleMid: '#2B6E8C',
    obstacleTop: '#6FC3E7',
    obstacleLeaf: '#A6E3FF',
    obstacleLeafDark: '#78C9EE',
    obstacleAccent: '#E0F2FE',
  },
  {
    name: 'RUINS',
    tint: 'rgba(129, 140, 248, 0.08)',
    hudBg: 'rgba(22, 24, 64, 0.74)',
    obstacleBase: '#39466B',
    obstacleMid: '#4B5A8A',
    obstacleTop: '#93A5D8',
    obstacleLeaf: '#B7C7F1',
    obstacleLeafDark: '#8FA2D8',
    obstacleAccent: '#D6E0FA',
  },
  {
    name: 'LAVA',
    tint: 'rgba(249, 115, 22, 0.08)',
    hudBg: 'rgba(64, 20, 10, 0.75)',
    obstacleBase: '#5A2B14',
    obstacleMid: '#8A3D1A',
    obstacleTop: '#D97745',
    obstacleLeaf: '#F6AD55',
    obstacleLeafDark: '#DD8A35',
    obstacleAccent: '#FDBA74',
  },
];

export default function Hero() {
  const [typed, setTyped] = useState('');
  const [charPos, setCharPos] = useState(35);
  const [charY, setCharY] = useState(0);
  const [walking, setWalking] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [runnerX, setRunnerX] = useState(110);
  const [game, setGame] = useState({
    running: false,
    paused: false,
    over: false,
    score: 0,
    runnerY: 0,
    runnerV: 0,
    obstacles: [],
  });
  const phrases = ['Full Stack Developer', 'AI/ML Explorer', 'Code Adventurer', 'Problem Solver'];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  const heroRef = useRef(null);
  const gameWidthRef = useRef(760);
  const spawnCooldownRef = useRef(0);
  const speedRef = useRef(7);
  const touchStateRef = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
  });

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  const startRunnerGame = () => {
    gameWidthRef.current = heroRef.current?.clientWidth || window.innerWidth || 760;
    spawnCooldownRef.current = 70;
    speedRef.current = 5.5;
    setGame({
      running: true,
      paused: false,
      over: false,
      score: 0,
      runnerY: 0,
      runnerV: 0,
      obstacles: [],
    });
  };

  const togglePauseGame = () => {
    setGame((prev) => {
      if (!prev.running || prev.over) return prev;
      return { ...prev, paused: !prev.paused };
    });
  };

  const jumpRunner = () => {
    setGame((prev) => {
      if (!prev.running || prev.paused || prev.runnerY > 0) return prev;
      const scoreScale = Math.min(prev.score / 1200, 1.8);
      const jumpBoost = 18 + scoreScale * 3.4;
      return { ...prev, runnerV: jumpBoost };
    });
  };

  const getRunnerX = (width) => {
    const fromWidth = Math.floor(width * 0.2);
    return Math.max(76, Math.min(fromWidth, 120));
  };

  const biomeIdx = Math.floor(game.score / 550) % BIOME_THEMES.length;
  const currentBiome = BIOME_THEMES[biomeIdx];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = Number(window.localStorage.getItem('runnerHighScore') || '0');
    if (!Number.isNaN(saved) && saved > 0) {
      setHighScore(saved);
    }
  }, []);

  // Typewriter
  useEffect(() => {
    const tick = () => {
      const cur = phrases[phraseIdx.current];
      if (!deleting.current) {
        setTyped(cur.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === cur.length) {
          deleting.current = true;
          setTimeout(tick, 1500);
          return;
        }
      } else {
        setTyped(cur.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting.current ? 50 : 90);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);

  // Character walk using keyboard arrow keys
  useEffect(() => {
    const onKeyDown = (e) => {
      if (game.running) return;
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;

      e.preventDefault();
      setWalking(true);

      if (e.key === 'ArrowLeft') {
        setCharPos((prev) => clamp(prev - 3, 8, 92));
      }
      if (e.key === 'ArrowRight') {
        setCharPos((prev) => clamp(prev + 3, 8, 92));
      }
      if (e.key === 'ArrowUp') {
        setCharY((prev) => clamp(prev + 16, 0, 120));
      }
      if (e.key === 'ArrowDown') {
        setCharY((prev) => clamp(prev - 16, 0, 120));
      }
    };

    const onKeyUp = (e) => {
      if (game.running) return;
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        setWalking(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [game.running]);

  // Runner game controls — jump on ArrowUp
  useEffect(() => {
    const onRunnerKeyDown = (e) => {
      if (e.key !== 'ArrowUp') return;
      if (!game.running) return;
      if (game.paused) return;

      e.preventDefault();
      jumpRunner();
    };

    window.addEventListener('keydown', onRunnerKeyDown);
    return () => window.removeEventListener('keydown', onRunnerKeyDown);
  }, [game.running, game.paused]);

  // Runner game loop
  useEffect(() => {
    if (!game.running) return;

    const tickMs = 1000 / 45;

    const hasCollision = (runnerY, obstacles) => {
      return obstacles.some((obs) => {
        const hitX = runnerX < obs.x + obs.width && runnerX + PLAYER_W > obs.x;
        const hitY = runnerY < obs.height;
        return hitX && hitY;
      });
    };

    const timer = setInterval(() => {
      setGame((prev) => {
        if (!prev.running) return prev;
        if (prev.paused) return prev;

        const scoreScale = Math.min(prev.score / 1200, 1.8);
        const gravity = 0.76 + scoreScale * 0.22;
        const dynamicMinGap = Math.max(340 - Math.floor(prev.score / 20), 220);
        const dynamicSpeed = Math.min(5.5 + prev.score / 260, 10.8);
        speedRef.current = dynamicSpeed;

        let nextV = prev.runnerV - gravity;
        let nextY = prev.runnerY + nextV;

        if (nextY < 0) {
          nextY = 0;
          nextV = 0;
        }

        let nextObstacles = prev.obstacles
          .map((obs) => ({ ...obs, x: obs.x - speedRef.current }))
          .filter((obs) => obs.x + obs.width > -10);

        spawnCooldownRef.current -= 1;
        if (spawnCooldownRef.current <= 0) {
          const spawnX = gameWidthRef.current + 18;
          const rightMostObs = nextObstacles.reduce((acc, obs) => (obs.x > acc.x ? obs : acc), { x: -9999, width: 0 });
          const gapFromRightMost = spawnX - (rightMostObs.x + rightMostObs.width);
          if (gapFromRightMost < dynamicMinGap) {
            spawnCooldownRef.current = 6;
            return {
              ...prev,
              score: prev.score + 1,
              runnerY: nextY,
              runnerV: nextV,
              obstacles: nextObstacles,
            };
          }

          const patterns = [
            { kind: 'oak', width: 24, height: 58, crown: true },
            { kind: 'pine', width: 22, height: 76, crown: true },
            { kind: 'deadwood', width: 28, height: 64, crown: false },
            { kind: 'bush', width: 36, height: 44, crown: true },
          ];
          const pick = patterns[Math.floor(Math.random() * patterns.length)];

          nextObstacles.push({
            id: `${Date.now()}-${Math.random()}`,
            x: spawnX,
            width: pick.width,
            height: pick.height,
            kind: pick.kind,
            crown: pick.crown,
          });

          // Spawn faster as score climbs while still keeping a fair jump window.
          const baseCooldown = Math.max(66 - Math.floor(prev.score / 180), 28);
          const variance = Math.max(16 - Math.floor(prev.score / 500), 8);
          spawnCooldownRef.current = baseCooldown + Math.floor(Math.random() * variance);
        }

        const collided = hasCollision(nextY, nextObstacles);
        if (collided) {
          const finalScore = Math.floor(prev.score / 5);
          setHighScore((old) => {
            const next = Math.max(old, finalScore);
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('runnerHighScore', String(next));
            }
            return next;
          });

          return {
            ...prev,
            running: false,
            paused: false,
            over: true,
            runnerY: nextY,
            runnerV: 0,
            obstacles: nextObstacles,
          };
        }

        return {
          ...prev,
          score: prev.score + 1,
          runnerY: nextY,
          runnerV: nextV,
          obstacles: nextObstacles,
        };
      });
    }, tickMs);

    return () => clearInterval(timer);
  }, [game.running, runnerX]);

  // Keep game width in sync with viewport/section size.
  useEffect(() => {
    const syncWidth = () => {
      const width = heroRef.current?.clientWidth || window.innerWidth || 760;
      gameWidthRef.current = width;
      setRunnerX(getRunnerX(width));
    };

    syncWidth();
    window.addEventListener('resize', syncWidth);
    return () => window.removeEventListener('resize', syncWidth);
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden scanlines">
      {/* Sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07001A] via-[#110030] to-[#0F2A0F]" />
      {(game.running || game.over) && (
        <div className="absolute inset-0 z-[1]" style={{ background: currentBiome.tint }} />
      )}
      <Stars />
      <Particles />

      {/* Clouds */}
      <Cloud x={5} y={15} scale={1.2} />
      <Cloud x={30} y={8} scale={0.8} />
      <Cloud x={16} y={36} scale={1.2} />
      <Cloud x={80} y={10} scale={0.9} />

      {/* Moon */}
      <div className="absolute top-14 right-4 sm:right-10 md:right-16 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-yellow-100 border-4 border-yellow-200"
        style={{ imageRendering: 'pixelated', boxShadow: '0 0 30px rgba(253,230,138,0.4)' }}>
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-yellow-200/40" />
        <div className="absolute top-6 right-3 w-2 h-2 rounded-full bg-yellow-200/30" />
      </div>

      {/* HUD — top left stat panel */}
      <div className="absolute top-24 left-6 z-20 hidden lg:block">
        <div className="bg-darker/80 border border-pixel/30 p-3 backdrop-blur-sm" style={{ boxShadow: '4px 4px 0 #C084FC40', minWidth: 180 }}>
          <div className="font-pixel text-[8px] text-pixel mb-2">▶ PLAYER STATS</div>
          {[
            { label: 'HP', val: 95, color: '#2DD4BF' },
            { label: 'XP', val: 78, color: '#FBBF24' },
            { label: 'MP', val: 88, color: '#C084FC' },
          ].map((s) => (
            <div key={s.label} className="mb-1.5">
              <div className="flex justify-between font-pixel text-[7px] mb-0.5" style={{ color: s.color }}>
                <span>{s.label}</span><span>{s.val}/100</span>
              </div>
              <div className="w-full h-2 bg-white/10 border border-white/20">
                <div style={{ width: `${s.val}%`, height: '100%', background: s.color }} />
              </div>
            </div>
          ))}
          <div className="font-pixel text-[7px] text-muted mt-2">CLASS: FULL STACK</div>
          <div className="font-pixel text-[7px] text-gold mt-1">ORIGIN: INDIA</div>
        </div>
      </div>

      {/* HUD — top right inventory */}
      <div className="absolute top-35 right-6 z-20 hidden lg:block">
        <div className="bg-darker/80 border border-pixel/30 p-3 backdrop-blur-sm" style={{ boxShadow: '4px 4px 0 #C084FC40' }}>
          <div className="font-pixel text-[8px] text-pixel mb-2">▶ EQUIPPED</div>
          {[
            { icon: 'sword', name: 'React.js', rarity: 'EPIC' },
            { icon: 'shield', name: 'Node.js', rarity: 'RARE' },
            { icon: 'orb', name: 'AI / ML', rarity: 'LEGEND' },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 bg-card border border-white/20 flex items-center justify-center">
                <ThemeIcon name={item.icon} size={12} color="#EDE9FE" />
              </div>
              <div>
                <div className="font-pixel text-[6px] text-white">{item.name}</div>
                <div className="font-pixel text-[6px]" style={{ color: item.rarity === 'LEGEND' ? '#FBBF24' : item.rarity === 'EPIC' ? '#C084FC' : '#2DD4BF' }}>
                  {item.rarity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-4 mb-24 md:mb-32 w-full max-w-5xl">
        <div className="font-pixel text-pixel text-[11px] mb-2" style={{ textShadow: '0 0 20px #FF6B9D' }}>PLAYER ONE</div>
        <h1 className="font-pixel text-[clamp(2.2rem,16vw,4.4rem)] md:text-7xl gradient-text mb-4 leading-[0.92] whitespace-normal break-words max-w-[95vw] mx-auto" style={{ textShadow: '4px 4px 0 rgba(192,132,252,0.3)' }}>
          NEEJA SUVA
        </h1>
        <div className="hero-lower-motion">
          <div className="font-body text-base sm:text-lg md:text-xl text-purple-200 mb-3 h-10 px-2">
            {typed}<span className="animate-ping text-pixel">|</span>
          </div>

          {(game.running || game.over) && (
            <div className="mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-pixel text-[8px] sm:text-[9px] text-gold mb-4 px-3 py-2 border border-gold/50 max-w-[94vw]"
              style={{ background: currentBiome.hudBg }}>
              <span>BIOME: {currentBiome.name}</span>
              <span>SCORE: {Math.floor(game.score / 5)}</span>
              <span>HIGH: {highScore}</span>
              <span className="text-white/85">TAP OR PRESS UP TO JUMP</span>
              <span className="text-white/85">{game.paused ? 'PAUSED' : 'LIVE'}</span>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3 mb-8 px-2">
            {[
              { label: '▶ VIEW PROJECTS', href: '#projects', primary: true },
              { label: 'CONTACT', href: '#contact', primary: false },
            ].map((btn) => (
              <a key={btn.label} href={btn.href}
                className={`font-pixel text-[9px] px-5 py-3 border-2 transition-all duration-200 w-full max-w-[270px] sm:w-auto ${btn.primary
                  ? 'bg-pixel text-white border-pixel hover:bg-transparent hover:text-pixel'
                  : 'bg-transparent text-teal border-teal hover:bg-teal hover:text-darker'
                }`}
                style={{ boxShadow: btn.primary ? '4px 4px 0 #C084FC' : '4px 4px 0 #0D9488' }}>
                {btn.label}
              </a>
            ))}
          </div>

          <button
            onClick={game.running ? togglePauseGame : startRunnerGame}
            className="font-pixel text-[10px] text-teal mb-3 border-2 border-teal/70 px-4 py-2 bg-black/30 hover:bg-teal hover:text-darker transition-colors w-full max-w-[270px]"
          >
            {game.running ? (game.paused ? '▶ RESUME GAME ◀' : '❚❚ PAUSE GAME') : game.over ? 'RESTART GAME' : '▶ START GAME ◀'}
          </button>
        </div>

      </div>

      {/* Obstacles rendered in the same world area while game is active */}
      {(game.running || game.over) && game.obstacles.map((obs) => (
        <div key={obs.id} className="absolute z-30" style={{ left: obs.x, bottom: OBSTACLE_GROUND_PX }}>
          <div className="relative" style={{ width: obs.width, height: obs.height, imageRendering: 'pixelated' }}>
            {/* Trunk */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: obs.width, height: obs.height, background: currentBiome.obstacleBase }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: Math.max(obs.width - 6, 10), height: obs.height, background: currentBiome.obstacleMid }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: 3, height: obs.height, background: currentBiome.obstacleTop, opacity: 0.65 }} />

            {/* Root base */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: obs.width + 8, height: 4, background: currentBiome.obstacleTop, opacity: 0.5 }} />

            {/* Canopy variants for less boxy trees */}
            {obs.kind === 'pine' && (
              <>
                <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: obs.height - 6, width: obs.width + 26, height: 12, background: currentBiome.obstacleLeafDark }} />
                <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: obs.height + 5, width: obs.width + 20, height: 11, background: currentBiome.obstacleLeaf }} />
                <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: obs.height + 15, width: obs.width + 14, height: 10, background: currentBiome.obstacleLeafDark }} />
                <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: obs.height + 23, width: obs.width + 8, height: 9, background: currentBiome.obstacleLeaf }} />
                <div className="absolute" style={{ bottom: obs.height + 28, left: '50%', width: 4, height: 4, transform: 'translateX(-50%)', background: currentBiome.obstacleAccent }} />
              </>
            )}

            {obs.kind === 'oak' && (
              <>
                <div className="absolute" style={{ bottom: obs.height - 2, left: -8, width: obs.width + 16, height: 14, background: currentBiome.obstacleLeafDark }} />
                <div className="absolute" style={{ bottom: obs.height + 9, left: -12, width: obs.width + 24, height: 14, background: currentBiome.obstacleLeaf }} />
                <div className="absolute" style={{ bottom: obs.height + 20, left: -4, width: obs.width + 8, height: 10, background: currentBiome.obstacleAccent }} />
              </>
            )}

            {obs.kind === 'bush' && (
              <>
                <div className="absolute" style={{ bottom: obs.height - 1, left: -6, width: obs.width + 12, height: 16, background: currentBiome.obstacleLeafDark }} />
                <div className="absolute" style={{ bottom: obs.height + 8, left: -3, width: obs.width + 6, height: 12, background: currentBiome.obstacleLeaf }} />
              </>
            )}

            {obs.kind === 'deadwood' && (
              <>
                <div className="absolute" style={{ bottom: obs.height - 10, left: '50%', width: 4, height: 12, transform: 'translateX(-50%)', background: currentBiome.obstacleTop }} />
                <div className="absolute" style={{ bottom: obs.height - 14, left: '50%', width: 16, height: 3, transform: 'translateX(-50%)', background: currentBiome.obstacleTop, opacity: 0.8 }} />
              </>
            )}
          </div>
        </div>
      ))}

      {/* Character movement controlled with arrow keys */}
      {!(game.running || game.over) && (
        <div
          className="absolute bottom-32 z-20 transition-all duration-300"
          style={{ left: `${charPos}%`, transform: `translate(-50%, -${charY}px)`, touchAction: 'none' }}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            if (!touch) return;
            touchStateRef.current = {
              active: true,
              lastX: touch.clientX,
              lastY: touch.clientY,
            };
          }}
          onTouchMove={(event) => {
            const touch = event.touches[0];
            if (!touch || !touchStateRef.current.active) return;

            const deltaX = touch.clientX - touchStateRef.current.lastX;
            const deltaY = touch.clientY - touchStateRef.current.lastY;

            touchStateRef.current.lastX = touch.clientX;
            touchStateRef.current.lastY = touch.clientY;

            // Convert swipe distance to a smooth step in scene coordinates.
            const xStep = deltaX / 10;
            const yStep = deltaY / 4;

            setWalking(Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1);
            setCharPos((prev) => clamp(prev + xStep, 8, 92));
            setCharY((prev) => clamp(prev - yStep, 0, 120));

            event.preventDefault();
          }}
          onTouchEnd={() => {
            touchStateRef.current.active = false;
            setWalking(false);
          }}
          onTouchCancel={() => {
            touchStateRef.current.active = false;
            setWalking(false);
          }}
        >
          {/* Speech bubble */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-darker border-2 border-pixel px-3 py-1.5 whitespace-nowrap"
            style={{ boxShadow: '2px 2px 0 #C084FC' }}>
            <div className="font-pixel text-[7px] text-pixel">Hello, I'm Neeja !</div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-pixel" />
          </div>
          <CharacterSprite size={72} walking={walking} />
        </div>
      )}

      {(game.running || game.over) && (
        <div
          className="absolute inset-0 z-20"
          onPointerDown={(event) => {
            const target = event.target;
            if (target instanceof HTMLElement && target.closest('button, a')) return;
            if (game.running && !game.paused) jumpRunner();
          }}
          style={{ touchAction: 'manipulation' }}
        />
      )}

      {(game.running || game.over) && (
        <div className="absolute z-30 transition-transform duration-75"
          style={{ left: runnerX, bottom: HERO_GROUND_PX + game.runnerY }}>
          <CharacterSprite size={72} walking={game.running && game.runnerY === 0} />
        </div>
      )}

      {game.over && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-44 z-40 text-center bg-black/60 border-2 border-pixel px-5 py-3">
          <div className="font-pixel text-[10px] text-[#FF6B9D] mb-2">GAME OVER</div>
          <button
            onClick={startRunnerGame}
            className="font-pixel text-[9px] px-4 py-2 border-2 border-pixel text-pixel hover:bg-pixel hover:text-white transition-colors"
          >
            ▶ PLAY AGAIN
          </button>
        </div>
      )}

      {/* Ground biome */}
      <BiomeGround />

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center">
        <div className="font-pixel text-[7px] text-muted animate-bounce">SCROLL TO EXPLORE ▼</div>
      </div>
    </section>
  );
}
