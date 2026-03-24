// Pixel art girl character — SVG sprite
export default function CharacterSprite({ size = 80, walking = false }) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 16 24"
      style={{ imageRendering: 'pixelated' }}
      className={walking ? 'animate-bounce' : 'animate-float'}
    >
      {/* Hair */}
      <rect x="4" y="1" width="8" height="1" fill="#1A0533" />
      <rect x="3" y="2" width="10" height="4" fill="#2D0B5A" />
      <rect x="2" y="3" width="2" height="3" fill="#2D0B5A" />
      <rect x="12" y="3" width="2" height="3" fill="#2D0B5A" />
      <rect x="3" y="6" width="1" height="2" fill="#2D0B5A" />
      <rect x="12" y="6" width="1" height="2" fill="#2D0B5A" />
      {/* Face */}
      <rect x="4" y="3" width="8" height="6" fill="#FBBF8C" />
      {/* Eyes */}
      <rect x="5" y="5" width="2" height="2" fill="#1A0533" />
      <rect x="9" y="5" width="2" height="2" fill="#1A0533" />
      <rect x="5" y="5" width="1" height="1" fill="#fff" />
      <rect x="9" y="5" width="1" height="1" fill="#fff" />
      {/* Blush */}
      <rect x="4" y="7" width="2" height="1" fill="#FFB3C6" opacity="0.6" />
      <rect x="10" y="7" width="2" height="1" fill="#FFB3C6" opacity="0.6" />
      {/* Smile */}
      <rect x="6" y="8" width="1" height="1" fill="#FF6B9D" />
      <rect x="7" y="9" width="2" height="1" fill="#FF6B9D" />
      <rect x="9" y="8" width="1" height="1" fill="#FF6B9D" />
      {/* Bindi */}
      <rect x="7" y="4" width="2" height="1" fill="#FF6B9D" />
      {/* Hair detail */}
      <rect x="4" y="2" width="8" height="2" fill="#3D0F70" />
      <rect x="5" y="1" width="6" height="1" fill="#3D0F70" />
      {/* Body / Kurta */}
      <rect x="4" y="10" width="8" height="8" fill="#C084FC" />
      <rect x="5" y="10" width="6" height="1" fill="#A855F7" />
      {/* Dupatta */}
      <rect x="3" y="10" width="1" height="5" fill="#FF6B9D" />
      <rect x="12" y="10" width="1" height="5" fill="#FF6B9D" />
      {/* Kurta pattern */}
      <rect x="7" y="12" width="2" height="4" fill="#FBBF24" opacity="0.7" />
      <rect x="6" y="13" width="4" height="1" fill="#FBBF24" opacity="0.7" />
      {/* Arms */}
      <rect x="2" y="10" width="2" height="5" fill="#FBBF8C" />
      <rect x="12" y="10" width="2" height="5" fill="#FBBF8C" />
      {/* Bangles */}
      <rect x="2" y="13" width="2" height="1" fill="#FBBF24" />
      <rect x="12" y="13" width="2" height="1" fill="#FBBF24" />
      {/* Hands holding laptop */}
      <rect x="1" y="15" width="3" height="2" fill="#FBBF8C" />
      <rect x="12" y="15" width="3" height="2" fill="#FBBF8C" />
      {/* Mini laptop */}
      <rect x="4" y="15" width="8" height="5" fill="#1A1035" />
      <rect x="5" y="16" width="6" height="3" fill="#2DD4BF" opacity="0.8" />
      <rect x="3" y="20" width="10" height="1" fill="#374151" />
      {/* Legs / Churidar */}
      <rect x="5" y="18" width="2" height="5" fill="#7C3AED" />
      <rect x="9" y="18" width="2" height="5" fill="#7C3AED" />
      {/* Feet */}
      <rect x="4" y="23" width="3" height="1" fill="#1A0533" />
      <rect x="9" y="23" width="3" height="1" fill="#1A0533" />
    </svg>
  );
}
