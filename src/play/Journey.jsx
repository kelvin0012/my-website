import { Fragment, useEffect, useRef } from 'react';
import { lessons, games, whispers } from '../data/hobbies.js';
import { useScrollProgress } from '../hooks/useReveal.js';
import { scenes } from './assets.js';
import { GameGlyph } from './Glyphs.jsx';
import { Kit, Keycard, TeamUp, IntentTerminal, RoleSelect } from './Widgets.jsx';

const WIDGETS = { kit: Kit, keycard: Keycard, comic: TeamUp, terminal: IntentTerminal, roles: RoleSelect };

/**
 * One continuous run through all three games. The background is three stacked palettes whose
 * opacities are weighted by which lessons are nearest the centre of the viewport, so the page
 * blends from Rift gold to comic yellow to facility amber instead of cutting between sections.
 */
export function Journey() {
  const root = useRef(null);
  const list = useRef(null);
  const progress = useScrollProgress(list);

  // assign scene images per game in order
  const counters = { rift: 0, rivals: 0, facility: 0 };
  const items = lessons.map((l) => {
    const pool = scenes[l.game];
    const img = pool.length ? pool[counters[l.game]++ % pool.length] : null;
    return { ...l, img };
  });

  useEffect(() => {
    const el = root.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = innerHeight;
      const w = { rift: 0, rivals: 0, facility: 0 };
      el.querySelectorAll('.stop').forEach((s) => {
        const r = s.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - vh / 2);
        w[s.dataset.game] += Math.max(0, 1 - d / (vh * 0.9));
        // local parallax for each stop's scene
        const p = (r.top + r.height / 2 - vh / 2) / vh;
        s.style.setProperty('--par', p.toFixed(3));
      });
      const sum = w.rift + w.rivals + w.facility || 1;
      let top = 'rift', max = -1;
      for (const g in w) {
        el.style.setProperty(`--w-${g}`, (w[g] / sum).toFixed(3));
        if (w[g] > max) { max = w[g]; top = g; }
      }
      if (el.dataset.game !== top) {
        el.dataset.game = top;
        document.documentElement.style.setProperty('--cursor', games[top].a);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="journey" id="journey" ref={root} data-game="rift">
      <div className="journey__bg" aria-hidden="true">
        <i className="jbg jbg--rift" /><i className="jbg jbg--rivals" /><i className="jbg jbg--facility" />
        <i className="jbg__noise" />
      </div>

      <header className="journey__head" data-reveal>
        <span className="journey__step">THE RUN</span>
        <h2 className="journey__title">What the games taught me</h2>
        <p className="journey__sub">The lessons I took from each game with three examples of each.</p>
        <div className="journey__legend">
          {Object.entries(games).map(([id, g]) => (
            <span key={id} className={`legend legend--${id}`}><GameGlyph game={id} />{g.name}</span>
          ))}
        </div>
      </header>

      <div className="journey__list" ref={list} style={{ '--p': progress }}>
        <span className="spine" aria-hidden="true"><i /></span>
        {items.map((l, i) => {
          const Widget = l.widget ? WIDGETS[l.widget] : null;
          return (
            <Fragment key={l.title}>
              <article className={`stop stop--${l.game} ${i % 2 ? 'stop--r' : 'stop--l'} ${l.img ? 'has-img' : ''}`} data-game={l.game}>
                <span className="stop__node" aria-hidden="true"><GameGlyph game={l.game} /></span>
                <div className="stop__card" data-reveal>
                  {l.img && (
                    <div className="stop__media">
                      <img src={l.img} alt="" loading="lazy" />
                      <span className="stop__shade" />
                    </div>
                  )}
                  <div className="stop__body">
                    <p className="stop__meta">
                      <span className="stop__num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="stop__game">{games[l.game].name}</span>
                      <span className="stop__skill">{l.skill}</span>
                    </p>
                    <h3 className="stop__title">{l.title}</h3>
                    <div className="stop__split">
                      <div className="stop__col">
                        <span className="stop__label">In game</span>
                        <p>{l.mechanic}</p>
                      </div>
                      <span className="stop__arrow" aria-hidden="true">→</span>
                      <div className="stop__col stop__col--work">
                        <span className="stop__label">At work</span>
                        <p>{l.work}</p>
                      </div>
                    </div>
                    <ul className="stop__tags">{l.tags.map(t => <li key={t}>{t}</li>)}</ul>
                    {Widget && <div className="stop__widget"><Widget /></div>}
                  </div>
                </div>
              </article>
              {i < items.length - 1 && i % 2 === 1 && (
                <p className="whisper" data-reveal><span>{whispers[(i >> 1) % whispers.length]}</span></p>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
