import '../styles/globals.css';
import { useEffect, useRef } from 'react';

export default function App({ Component, pageProps }) {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let fx = 0;
    let fy = 0;
    let rafId = null;

    const onMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const animate = () => {
      const x = parseFloat(cursor.style.left) || 0;
      const y = parseFloat(cursor.style.top) || 0;
      fx += (x - fx) * 0.15;
      fy += (y - fy) * 0.15;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
      <Component {...pageProps} />
    </>
  );
}
