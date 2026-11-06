import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { games } from '../data/hobbies.js';
import { characters } from './assets.js';
import { GameGlyph } from './Glyphs.jsx';
import { useParallax } from '../hooks/useParallax.js';

/** Interleave characters by game so the roster reads as one mixed party, not three lists. */
function blend(list) {
  const by = { rift: [], rivals: [], facility: [] };
  list.forEach(c => by[c.game].push(c));
  const out = [];
  for (let i = 0; out.length < list.length; i++) {
    for (const g of ['rift', 'rivals', 'facility']) if (by[g][i]) out.push(by[g][i]);
  }
  return out;
}

/**
 * Character select: a 3D coverflow of the mains you drop into src/assets/characters/.
 * Active card gets a game-coloured aura, a rotating rune ring, floating motes and mouse parallax.
 */
export function Roster() {
  const [filter, setFilter] = useState('all');
  const list = useMemo(() => (filter === 'all' ? blend(characters) : characters.filter(c => c.game === filter)), [filter]);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const stage = useParallax();
  const drag = useRef(null);

  const go = useCallback((d) => setIdx(i => (i + d + list.length) % list.length), [list.length]);
  useEffect(() => setIdx(0), [filter]);

  useEffect(() => {
    if (paused || list.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => go(1), 4200);
    return () => clearInterval(t);
  }, [paused, go, list.length]);

  if (!characters.length) {
    return import.meta.env.DEV ? (
      <section className="roster roster--empty" id="roster">
        <p className="dev-hint"><b>DEV ONLY IF ITS IN PRODUCTION PLS LET ME KNOW</b> add character art to <code>src/assets/characters/</code> named
          <code>rift__Name.png</code>, <code>rivals__Name.png</code> or <code>facility__Name.png</code> and this character select appears.</p>
      </section>
    ) : null;
  }

  const cur = list[idx] || list[0];
  const g = games[cur.game];

  const onDown = (e) => { drag.current = e.clientX; };
  const onUp = (e) => {
    if (drag.current == null) return;
    const dx = e.clientX - drag.current;
    drag.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <section className="roster" id="roster" style={{ '--ga': g.a, '--gb': g.b }} data-cursor={g.a}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="roster__bg" aria-hidden="true">
        {list.map((c, i) => <img key={c.key} src={c.src} alt="" className={i === idx ? 'on' : ''} />)}
      </div>

      <header className="roster__head" data-reveal>
        <span className="roster__step">CHARACTER SELECT</span>
        <h2 className="roster__title">The party</h2>
        <div className="roster__filters" role="tablist">
          {[['all', 'All'], ...Object.entries(games).filter(([id]) => characters.some(c => c.game === id)).map(([id, x]) => [id, x.short])].map(([id, label]) => (
            <button key={id} role="tab" aria-selected={filter === id} className={filter === id ? 'on' : ''} onClick={() => setFilter(id)}>{label}</button>
          ))}
        </div>
      </header>

      <div className="roster__stage" ref={stage} onPointerDown={onDown} onPointerUp={onUp}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }} tabIndex={0} aria-roledescription="carousel">
        {list.map((c, i) => {
          let off = i - idx;
          const n = list.length;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const hidden = Math.abs(off) > 2;
          return (
            <button key={c.key} className={`hero-card hero-card--${c.game} ${off === 0 ? 'is-active' : ''}`}
              style={{ '--off': off, '--abs': Math.abs(off), '--ca': games[c.game].a, '--cb': games[c.game].b, visibility: hidden ? 'hidden' : 'visible' }}
              onClick={() => setIdx(i)} aria-label={c.name} tabIndex={off === 0 ? 0 : -1}>
              <span className="hero-card__ring" aria-hidden="true" />
              <span className="hero-card__aura" aria-hidden="true" style={{ backgroundImage: `url(${c.src})` }} />
              <span className="hero-card__frame">
                <img src={c.src} alt={c.name} draggable="false" />
                <span className="hero-card__sheen" aria-hidden="true" />
              </span>
              {off === 0 && (
                <span className="hero-card__motes" aria-hidden="true">
                  {Array.from({ length: 14 }).map((_, k) => <i key={k} style={{ '--k': k }} />)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="roster__info" key={cur.key}>
        <span className="roster__game"><GameGlyph game={cur.game} />{g.name}</span>
        <h3 className="roster__name" style={{ fontFamily: `'${g.font}', var(--hud)` }}>
          {[...cur.name].map((ch, i) => <span key={i} style={{ '--i': i }}>{ch === ' ' ? ' ' : ch}</span>)}
        </h3>
        {cur.role && <p className="roster__role">{cur.role}</p>}
        {cur.line && <p className="roster__line">“{cur.line}”</p>}
      </div>

      {list.length > 1 && (
        <div className="roster__nav">
          <button onClick={() => go(-1)} aria-label="Previous character">‹</button>
          <span>{String(idx + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</span>
          <button onClick={() => go(1)} aria-label="Next character">›</button>
        </div>
      )}
    </section>
  );
}
