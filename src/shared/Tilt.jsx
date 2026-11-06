import { useRef } from 'react';

/**
 * 3D tilt + spotlight on hover. Sets CSS vars --mx/--my (0-100%) and --rx/--ry (deg)
 * which the stylesheet uses for the transform and a radial highlight.
 */
export function Tilt({ as: Tag = 'div', max = 10, className = '', children, ...rest }) {
  const ref = useRef(null);
  const raf = useRef(0);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      el.style.setProperty('--rx', `${(0.5 - py) * max}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * max}deg`);
    });
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <Tag ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
      {children}
    </Tag>
  );
}
