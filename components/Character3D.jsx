import { useEffect, useState } from 'react';

// Renders a .glb 3D model via Google's <model-viewer> web component
// (loaded from CDN in pages/_document.js). Client-only — the custom
// element isn't registered until the script runs in the browser.
export default function Character3D({
  size = 180,
  width,
  height,
  src = '/lego_style_character.glb',
  alt = 'Neeja 3D avatar',
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const w = width ?? size;
  const h = height ?? size;

  if (!mounted) {
    // Reserve space so the layout doesn't jump when the model mounts.
    return <div style={{ width: w, height: h }} aria-hidden />;
  }

  return (
    <model-viewer
      src={src}
      alt={alt}
      auto-rotate=""
      camera-controls=""
      disable-zoom=""
      interaction-prompt="none"
      shadow-intensity="0"
      exposure="1.1"
      style={{
        width: w,
        height: h,
        background: 'transparent',
        '--poster-color': 'transparent',
      }}
    />
  );
}
