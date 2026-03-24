import { achievements } from '../data/portfolio';
import ThemeIcon from './ThemeIcon';

function TrophyCard({ achievement, index }) {
  return (
    <div className="game-card group relative bg-card/60 border border-white/10 p-4 flex items-center gap-3 hover:border-pixel/50 transition-all"
      style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.5)', animationDelay: `${index * 100}ms` }}>
      {/* Icon */}
      <div className="w-10 h-10 border flex items-center justify-center shrink-0 text-xl group-hover:animate-bounce"
        style={{ borderColor: achievement.color, background: `${achievement.color}20` }}>
        <ThemeIcon name={achievement.icon} size={20} color={achievement.color} />
      </div>
      <div>
        <div className="font-body text-sm text-white font-medium leading-tight">{achievement.title}</div>
        <div className="font-pixel text-[6px] text-muted mt-0.5">ACHIEVEMENT UNLOCKED</div>
      </div>
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderColor: achievement.color }} />
    </div>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A1E] to-[#1A0020]" />

      {/* Star field */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="absolute bg-white animate-pulse"
          style={{ width: 2, height: 2, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.4 + 0.1, animationDelay: `${Math.random() * 4}s` }} />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="font-pixel text-[9px] text-gold mb-3">▶ BIOME: TROPHY HALL</div>
          <h2 className="font-pixel text-2xl md:text-3xl gold-text mb-4">ACHIEVEMENTS</h2>
          <div className="font-body text-muted max-w-md mx-auto text-sm">Loot collected from battles across hackathons, courses and certifications</div>
        </div>

        {/* Trophy count */}
        <div className="flex justify-center mb-10">
          <div className="bg-card/60 border border-gold/30 px-8 py-4 text-center"
            style={{ boxShadow: '4px 4px 0 rgba(251,191,36,0.3)' }}>
            <div className="font-pixel text-3xl text-gold">{achievements.length}</div>
            <div className="font-pixel text-[8px] text-muted mt-1">TROPHIES COLLECTED</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {achievements.map((a, i) => <TrophyCard key={i} achievement={a} index={i} />)}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0020] to-[#070412]" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl"
        style={{ background: '#FF6B9D' }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl"
        style={{ background: '#C084FC' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <div className="font-pixel text-[9px] text-pixel mb-3">▶ FINAL BIOME: HOME BASE</div>
        <h2 className="font-pixel text-2xl md:text-3xl gradient-text mb-4">CONTACT</h2>
        <p className="font-body text-purple-200/70 mb-10 leading-relaxed">
          Ready to team up? Send a message and let's build something legendary together.
        </p>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: 'mail', label: 'EMAIL', val: 'suva.neeja11@gmail.com', href: 'mailto:suva.neeja11@gmail.com', color: '#FF6B9D' },
            { icon: 'github', label: 'GITHUB', val: 'github.com', href: 'https://github.com/11neeja', color: '#C084FC' },
            { icon: 'linkedin', label: 'LINKEDIN', val: 'linkedin.com', href: 'https://www.linkedin.com/in/neeja-suva-1212121212121212121/', color: '#2DD4BF' },
          ].map((c) => (
            <a key={c.label} href={c.href}
              className="block bg-card/60 border p-4 text-center game-card hover:border-opacity-80 transition-all"
              style={{ borderColor: `${c.color}40`, boxShadow: `4px 4px 0 ${c.color}20` }}>
              <div className="mb-2 flex justify-center"><ThemeIcon name={c.icon} size={22} color={c.color} /></div>
              <div className="font-pixel text-[7px] mb-1" style={{ color: c.color }}>{c.label}</div>
              <div className="font-body text-xs text-muted truncate">{c.val}</div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="mailto:suva.neeja11@gmail.com"
          className="inline-block font-pixel text-[10px] px-8 py-4 bg-pixel text-white border-2 border-pixel hover:bg-transparent hover:text-pixel transition-all duration-200 animate-pulse-glow"
          style={{ boxShadow: '6px 6px 0 #C084FC' }}>
          ▶ START A NEW QUEST ◀
        </a>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="font-pixel text-[7px] text-muted">
            CRAFTED WITH ♥ BY NEEJA SUVA · INDIA · 2026
          </div>
          <div className="font-pixel text-[7px] text-pixel mt-2">
            © ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </section>
  );
}
