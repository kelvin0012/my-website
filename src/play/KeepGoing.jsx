import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { quotes, imageCaptions } from '../data/hobbies.js';
import { inspirationAlts } from '../data/inspiration.js';
import { Tilt } from '../shared/Tilt.jsx';

// Every image in src/assets/inspiration is picked up automatically.
const files = import.meta.glob('../assets/inspiration/*.{png,jpg,jpeg,webp,gif,avif,svg}', { eager: true, import: 'default' });
const images = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const name = path.split('/').pop().replace(/\.[^.]+$/, '');
    const caption = imageCaptions[name] || '';
    return { type: 'img', src, name, caption, alt: inspirationAlts[name] || caption || 'Inspiration image' };
  });

/** Spread the quote cards evenly through the images, like small hints between them. */
function buildWall() {
  const q = quotes.map(x => ({ type: 'quote', ...x }));
  if (!images.length) return q;
  const out = [];
  const step = images.length / (q.length + 1);
  let qi = 0;
  images.forEach((img, i) => {
    out.push(img);
    if (qi < q.length && i + 1 >= Math.round(step * (qi + 1))) out.push(q[qi++]);
  });
  while (qi < q.length) out.push(q[qi++]);
  return out;
}

export function KeepGoing() {
  const wall = useMemo(buildWall, []);
  const [open, setOpen] = useState(-1);
  const [respawns, setRespawns] = useState(() => {
    try { return Number(localStorage.getItem('kg-respawns')) || 0; } catch { return 0; }
  });

  const respawn = () => {
    setRespawns(n => {
      const v = n + 1;
      try { localStorage.setItem('kg-respawns', String(v)); } catch { /* ignore */ }
      return v;
    });
  };

  return (
    <section className="kg" id="keep-going" data-cursor="#ffe14d">
      <div className="kg__bg" aria-hidden="true" />
      <header className="kg__head">
        <span className="kg__step" data-reveal>FINAL STAGE · RESPAWN POINT</span>
        <h2 className="kg__title" data-reveal aria-label="Keep going">
          <span className="kg__word">KEEP</span>
          <span className="kg__word kg__word--alt">GOING</span>
        </h2>
        <p className="kg__blurb" data-reveal>
          These are what push me forward. The images are my inspiration, the quotes are my reminders. I keep them on my wall, and I keep going.
        </p>
        <button className="kg__respawn" onClick={respawn} data-reveal>
          <span className="kg__heart" key={respawns} aria-hidden="true">♥</span>
          I needed this <b>{respawns > 0 ? `×${respawns}` : ''}</b>
        </button>
      </header>

      <div className="wall">
        {wall.map((item, i) => (
          <div className="wall__cell" key={i} data-reveal style={{ '--d': (i % 4) * 0.8 }}>
            <Tilt as="button" className={`card card--${item.type === 'img' ? 'img' : item.style}`} max={7} onClick={() => setOpen(i)} aria-label={item.type === 'img' ? item.alt : item.text}>
              {item.type === 'img' ? (
                <>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  {item.caption && <span className="card__cap">{item.caption}</span>}
                </>
              ) : (
                <QuoteBody item={item} />
              )}
              <span className="card__glare" aria-hidden="true" />
            </Tilt>
          </div>
        ))}
        {images.length === 0 && import.meta.env.DEV && (
          <div className="wall__cell">
            <div className="card card--hint">
              <b>DEV ONLY IF ITS IN PRODUCTION PLS LET ME KNOW</b>
              Drop images into <code>src/assets/inspiration/</code> and they appear here automatically.
              (This card SHOULD only show in dev.)
            </div>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <p className="kg__credit">
          Images collected by Jack Friks at{' '}
          <a href="https://www.jackfriks.com/keep-going" target="_blank" rel="noreferrer">jackfriks.com/keep-going</a>
        </p>
      )}

      {open >= 0 && <Lightbox items={wall} index={open} setIndex={setOpen} />}
    </section>
  );
}

function QuoteBody({ item }) {
  return (
    <span className="quote">
      {item.style === 'terminal' && <span className="quote__dots" aria-hidden="true"><i /><i /><i /></span>}
      {item.style === 'comic' && <span className="quote__burst" aria-hidden="true" />}
      {item.style === 'hex' && <span className="quote__mark" aria-hidden="true">❝</span>}
      <span className="quote__text">{item.text}</span>
      {item.by && <span className="quote__by">{item.by}</span>}
    </span>
  );
}

function Lightbox({ items, index, setIndex }) {
  const item = items[index];
  const close = useCallback(() => setIndex(-1), [setIndex]);
  const step = useCallback((d) => setIndex((index + d + items.length) % items.length), [index, items.length, setIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [close, step]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
      <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">‹</button>
      <figure className="lightbox__stage" key={index} onClick={(e) => e.stopPropagation()}>
        {item.type === 'img' ? (
          <>
            <img src={item.src} alt={item.alt} />
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </>
        ) : (
          <div className={`card card--${item.style} card--big`}><QuoteBody item={item} /></div>
        )}
      </figure>
      <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">›</button>
      <button className="lightbox__close" onClick={close} aria-label="Close">✕</button>
      <span className="lightbox__count">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
    </div>,
    document.querySelector('.play') || document.body
  );
}
