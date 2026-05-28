import { useEffect, useState } from 'react';
import { hero } from '../data/portfolio';

// Thin persistent game-HUD strip pinned to the bottom of every page.
// Ties the whole site together as one "game" and surfaces the live hi-score.
export default function GameHUD() {
  const [hi, setHi] = useState(0);

  useEffect(() => {
    const read = () => setHi(Number(window.localStorage.getItem('runnerHighScore') || '0'));
    read();
    window.addEventListener('storage', read);
    window.addEventListener('runnerHighScore', read);
    window.addEventListener('focus', read);
    return () => {
      window.removeEventListener('storage', read);
      window.removeEventListener('runnerHighScore', read);
      window.removeEventListener('focus', read);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 pointer-events-none">
      <div className="mx-auto max-w-7xl px-2 sm:px-3">
        <div
          className="flex items-center justify-between gap-3 border-t-2 border-x border-teal/40 bg-darker/90 backdrop-blur-sm px-3 py-1.5"
          style={{ boxShadow: '0 -4px 20px rgba(45,212,191,0.18)' }}
        >
          <div className="flex items-center gap-2 font-pixel text-[7px] sm:text-[8px]">
            <span className="w-2 h-2 bg-teal animate-pulse" style={{ boxShadow: '0 0 6px #2DD4BF' }} />
            <span className="text-teal">PLAYER:</span>
            <span className="text-white">{hero.name.toUpperCase()}</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-pixel text-[7px] sm:text-[8px] text-purple-200">
            <span>LVL {hero.level}</span>
            <span className="text-white/30">·</span>
            <span className="text-gold">{hero.class.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2 font-pixel text-[7px] sm:text-[8px]">
            <span className="text-pixel">HI-SCORE</span>
            <span className="text-white">{String(hi).padStart(5, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
