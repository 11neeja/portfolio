// Glowing L-shaped corner brackets — the signature arcade-HUD frame accent.
// Drop inside any `position: relative` container.
export function HudCorners({ color, size = 'w-3.5 h-3.5' }) {
  const positions = [
    'top-0 left-0 border-t-2 border-l-2',
    'top-0 right-0 border-t-2 border-r-2',
    'bottom-0 left-0 border-b-2 border-l-2',
    'bottom-0 right-0 border-b-2 border-r-2',
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute ${size} ${pos}`}
          style={{ borderColor: color, filter: `drop-shadow(0 0 3px ${color})` }}
        />
      ))}
    </>
  );
}
