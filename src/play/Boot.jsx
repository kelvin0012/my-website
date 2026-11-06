import { useEffect, useState } from 'react';

const LINES = [
  'INITIALISING PLAYER PROFILE…',
  'LOADING SHADERS ............ OK',
  'SYNCING MATCH HISTORY ...... OK',
  'CALIBRATING TEAM-UPS ....... OK',
  'SEALING CONTAINMENT DOORS .. OK',
  'READY.',
];

/** Game-style boot / loading screen. Shown once per browser session. */
export function Boot({ onDone }) {
  const [shown, setShown] = useState(0);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const ready = pct >= 100;

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setShown(LINES.length); setPct(100); return; }
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(100, ((t - start) / 1800) * 100);
      // ease-out with a brief hitch at ~70%, like a real loading bar
      const ease = (q) => 1 - Math.pow(1 - q / 100, 2.2);
      setPct(Math.round(ease(p > 55 && p < 72 ? 55 : p) * 100));
      setShown(Math.min(LINES.length, Math.floor((p / 100) * LINES.length) + 1));
      if (p < 100) raf = requestAnimationFrame(tick); else setPct(100);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const start = () => {
      if (leaving) return;
      setLeaving(true);
      setTimeout(onDone, 900);
    };
    addEventListener('keydown', start);
    addEventListener('pointerdown', start);
    return () => { removeEventListener('keydown', start); removeEventListener('pointerdown', start); };
  }, [ready, leaving, onDone]);

  return (
    <div className={`boot ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-label="Loading Play mode">
      <div className="boot__half boot__half--top" />
      <div className="boot__half boot__half--bottom" />
      <div className="boot__content">
        <div className="boot__logo">
          <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4 92 27v46L50 96 8 73V27Z" /><path d="M50 18 79 34v32L50 82 21 66V34Z" /></svg>
          <span>KG</span>
        </div>
        <pre className="boot__log">
          {LINES.slice(0, shown).map((l, i) => <div key={i} style={{ '--i': i }}>{l}</div>)}
        </pre>
        <div className="boot__bar"><i style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <div className="boot__pct">{String(pct).padStart(3, '0')}%</div>
        <button className={`boot__start ${ready ? 'on' : ''}`} disabled={!ready}>
          {ready ? 'PRESS ANY KEY TO START' : 'LOADING'}
        </button>
      </div>
    </div>
  );
}
