// Pixel art biome transition divider
export default function BiomeDivider({ from = '#0F2A0F', to = '#070412', label = '' }) {
  return (
    <div className="relative h-20 overflow-hidden w-full">
      {/* Gradient fill */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${from}, ${to})` }} />

      {/* Pixel teeth top */}
      <div className="absolute top-0 left-0 w-full flex">
        {Array.from({ length: Math.ceil(window?.innerWidth / 32) || 60 }).map((_, i) => (
          <div key={i} style={{ width: 32, height: i % 2 === 0 ? 16 : 8, background: from, flexShrink: 0 }} />
        ))}
      </div>

      {/* Biome label */}
      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-pixel text-[8px] text-white/30">{label}</div>
        </div>
      )}
    </div>
  );
}
