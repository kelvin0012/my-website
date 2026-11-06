import { useEffect, useRef } from 'react';

/**
 * Ember / data-mote particle field. Particles drift upward, get pushed away by
 * the pointer, and draw faint links to neighbours near the cursor.
 */
const DEFAULT_COLORS = ['#ff2e63', '#ff8a00', '#c8aa6e', '#0ac8b9', '#ffffff'];

export function Particles({ density = 0.00011, colors = DEFAULT_COLORS }) {
  const canvas = useRef(null);

  useEffect(() => {
    const c = canvas.current;
    const ctx = c.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w, h, dpr, parts = [], raf, visible = true;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      dpr = Math.min(2, devicePixelRatio || 1);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(w * h * density);
      parts = Array.from({ length: n }, () => spawn(true));
    };
    const spawn = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(0.15 + Math.random() * 0.6),
      r: 0.6 + Math.random() * 2.2,
      col: colors[(Math.random() * colors.length) | 0],
      tw: Math.random() * Math.PI * 2,
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) {
          const f = (1 - Math.sqrt(d2) / 140) * 0.6;
          p.vx += (dx / 140) * f; p.vy += (dy / 140) * f;
        }
        p.vx *= 0.96; p.vy = p.vy * 0.96 - 0.012;
        p.x += p.vx; p.y += p.vy; p.tw += 0.05;
        if (p.y < -10 || p.x < -20 || p.x > w + 20) Object.assign(p, spawn(false));
        const a = 0.45 + Math.sin(p.tw) * 0.35;
        ctx.globalAlpha = a;
        ctx.fillStyle = p.col;
        ctx.shadowColor = p.col; ctx.shadowBlur = p.r * 5;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      // links near cursor
      ctx.shadowBlur = 0;
      ctx.lineWidth = 0.6;
      const near = parts.filter(p => (p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2 < 220 * 220);
      for (let i = 0; i < near.length; i++) {
        for (let j = i + 1; j < near.length; j++) {
          const a = near[i], b = near[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 90) {
            ctx.globalAlpha = (1 - d / 90) * 0.5;
            ctx.strokeStyle = a.col;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => { if (visible) draw(); raf = requestAnimationFrame(loop); };
    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };

    resize();
    if (reduce) draw(); else loop();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(c);
    addEventListener('resize', resize);
    addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      removeEventListener('resize', resize);
      removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [density, colors]);

  return <canvas ref={canvas} className="particles" aria-hidden="true" />;
}
