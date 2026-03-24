export default function ThemeIcon({ name, color = 'currentColor', size = 16, className = '' }) {
  const s = { width: size, height: size };

  const icons = {
    sword: (
      <>
        <rect x="7" y="1" width="2" height="9" fill={color} />
        <rect x="5" y="10" width="6" height="2" fill={color} />
        <rect x="7" y="12" width="2" height="3" fill={color} />
      </>
    ),
    shield: (
      <>
        <path d="M4 2h8v5c0 3-2 5-4 7-2-2-4-4-4-7V2z" fill={color} />
        <rect x="7" y="3" width="2" height="8" fill="#070412" opacity="0.35" />
      </>
    ),
    orb: (
      <>
        <circle cx="8" cy="8" r="6" fill={color} />
        <circle cx="6" cy="6" r="2" fill="#ffffff" opacity="0.45" />
      </>
    ),
    dagger: (
      <>
        <rect x="7" y="1" width="2" height="8" fill={color} />
        <rect x="6" y="9" width="4" height="2" fill={color} />
        <rect x="7" y="11" width="2" height="4" fill={color} />
      </>
    ),
    scroll: (
      <>
        <rect x="3" y="3" width="10" height="10" rx="1" fill={color} />
        <rect x="5" y="6" width="6" height="1" fill="#070412" opacity="0.45" />
        <rect x="5" y="8" width="6" height="1" fill="#070412" opacity="0.45" />
      </>
    ),
    tools: (
      <>
        <rect x="3" y="9" width="10" height="2" fill={color} transform="rotate(-45 8 8)" />
        <rect x="6" y="4" width="2" height="8" fill={color} transform="rotate(45 7 8)" />
      </>
    ),
    geometry: (
      <>
        <polygon points="2,13 8,2 14,13" fill={color} />
        <rect x="3" y="11" width="10" height="2" fill="#070412" opacity="0.25" />
      </>
    ),
    github: (
      <>
        <circle cx="8" cy="8" r="6" fill={color} />
        <rect x="5" y="10" width="6" height="2" fill="#070412" opacity="0.35" />
      </>
    ),
    linkedin: (
      <>
        <rect x="2" y="2" width="12" height="12" rx="2" fill={color} />
        <rect x="5" y="6" width="1.5" height="5" fill="#070412" opacity="0.35" />
        <rect x="8" y="6" width="1.5" height="5" fill="#070412" opacity="0.35" />
      </>
    ),
    mail: (
      <>
        <rect x="2" y="4" width="12" height="8" fill={color} />
        <polygon points="2,4 8,9 14,4" fill="#070412" opacity="0.3" />
      </>
    ),
    forest: (
      <>
        <rect x="7" y="9" width="2" height="5" fill={color} />
        <rect x="5" y="5" width="6" height="4" fill={color} />
        <rect x="6" y="3" width="4" height="2" fill={color} />
      </>
    ),
    legal: (
      <>
        <rect x="3" y="4" width="10" height="1.5" fill={color} />
        <rect x="7.25" y="5.5" width="1.5" height="6" fill={color} />
        <rect x="2.5" y="11.5" width="11" height="1.5" fill={color} />
      </>
    ),
    ai: (
      <>
        <rect x="3" y="3" width="10" height="10" rx="2" fill={color} />
        <rect x="6" y="6" width="1.5" height="1.5" fill="#070412" opacity="0.35" />
        <rect x="8.5" y="6" width="1.5" height="1.5" fill="#070412" opacity="0.35" />
        <rect x="6" y="9" width="4" height="1.5" fill="#070412" opacity="0.35" />
      </>
    ),
    trophy: (
      <>
        <rect x="4" y="3" width="8" height="5" fill={color} />
        <rect x="7" y="8" width="2" height="3" fill={color} />
        <rect x="5" y="11" width="6" height="2" fill={color} />
      </>
    ),
    cloud: (
      <>
        <circle cx="6" cy="8" r="3" fill={color} />
        <circle cx="9.5" cy="7" r="3.5" fill={color} />
        <rect x="3" y="8" width="9" height="3" fill={color} />
      </>
    ),
    india: (
      <>
        <rect x="2" y="4" width="12" height="3" fill="#F59E0B" />
        <rect x="2" y="7" width="12" height="3" fill="#FFFFFF" />
        <rect x="2" y="10" width="12" height="3" fill="#22C55E" />
        <circle cx="8" cy="8.5" r="1" fill="#1D4ED8" />
      </>
    ),
    python: (
      <>
        <rect x="3" y="3" width="5" height="5" rx="1" fill={color} />
        <rect x="8" y="8" width="5" height="5" rx="1" fill={color} opacity="0.75" />
      </>
    ),
    briefcase: (
      <>
        <rect x="2" y="5" width="12" height="8" fill={color} />
        <rect x="5" y="3" width="6" height="2" fill={color} />
      </>
    ),
    bolt: (
      <>
        <polygon points="9,1 4,8 8,8 6,15 12,7 8,7" fill={color} />
      </>
    ),
    city: (
      <>
        <rect x="2" y="8" width="4" height="6" fill={color} />
        <rect x="7" y="5" width="3" height="9" fill={color} />
        <rect x="11" y="7" width="3" height="7" fill={color} />
      </>
    ),
    temple: (
      <>
        <polygon points="2,6 8,2 14,6" fill={color} />
        <rect x="3" y="6" width="10" height="1.5" fill={color} />
        <rect x="4" y="7.5" width="1.5" height="5" fill={color} />
        <rect x="7.25" y="7.5" width="1.5" height="5" fill={color} />
        <rect x="10.5" y="7.5" width="1.5" height="5" fill={color} />
      </>
    ),
    menu: (
      <>
        <rect x="2" y="4" width="12" height="2" fill={color} />
        <rect x="2" y="7" width="12" height="2" fill={color} />
        <rect x="2" y="10" width="12" height="2" fill={color} />
      </>
    ),
    close: (
      <>
        <rect x="3" y="7" width="10" height="2" fill={color} transform="rotate(45 8 8)" />
        <rect x="3" y="7" width="10" height="2" fill={color} transform="rotate(-45 8 8)" />
      </>
    ),
    check: (
      <>
        <rect x="3" y="8" width="3" height="2" fill={color} transform="rotate(45 4.5 9)" />
        <rect x="5" y="8" width="8" height="2" fill={color} transform="rotate(-45 9 9)" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 16 16" style={s} className={className} aria-hidden="true">
      {icons[name] || icons.orb}
    </svg>
  );
}
