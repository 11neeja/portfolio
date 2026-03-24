import { useState, useEffect } from 'react';
import CharacterSprite from './CharacterSprite';
import ThemeIcon from './ThemeIcon';

const navItems = [
  { label: 'WORLD', href: '#hero' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'QUESTS', href: '#experience' },
  { label: 'ITEMS', href: '#projects' },
  { label: 'LOOT', href: '#achievements' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-darker/90 backdrop-blur-md border-b border-pixel/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-card border border-pixel/40 flex items-center justify-center">
            <CharacterSprite size={24} />
          </div>
          <div>
            <div className="font-pixel text-pixel text-[9px] leading-none">NEEJA.EXE</div>
            <div className="text-[10px] text-purple-400 font-body mt-0.5">LVL 3 · FULL STACK DEV</div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}
              className="px-3 py-1.5 font-pixel text-[8px] text-muted hover:text-pixel hover:bg-pixel/10 transition-all duration-200 border border-transparent hover:border-pixel/30">
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="mailto:suva.neeja11@gmail.com"
          className="hidden md:block font-pixel text-[8px] px-4 py-2 bg-pixel text-white border-2 border-pixel hover:bg-transparent hover:text-pixel transition-all duration-200"
          style={{ boxShadow: '3px 3px 0 #C084FC' }}>
          HIRE ME ▶
        </a>

        {/* Mobile menu */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-pixel font-pixel text-[10px]">
          <ThemeIcon name={open ? 'close' : 'menu'} size={16} color="#FF6B9D" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-darker border-t border-pixel/20 px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}
              className="font-pixel text-[8px] text-muted hover:text-pixel transition-colors py-2">
              ▶ {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
