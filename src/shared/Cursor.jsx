import { useEffect, useRef } from 'react';

/**
 * Custom cursor: a dot that tracks exactly and a ring that trails with easing.
 * The ring grows over interactive elements. Only runs on fine pointers.
 */
export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.documentElement.classList.add('has-cursor');
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf;
    let visible = false;

    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (!visible) { visible = true; rx = x; ry = y; ring.current.style.opacity = dot.current.style.opacity = 1; }
      const t = e.target.closest?.('a, button, [data-hover], input, textarea, [role="button"]');
      ring.current.classList.toggle('is-hover', !!t);
    };
    const leave = () => { visible = false; ring.current.style.opacity = dot.current.style.opacity = 0; };
    const down = () => ring.current.classList.add('is-down');
    const up = () => ring.current.classList.remove('is-down');

    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true"><span /></div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
