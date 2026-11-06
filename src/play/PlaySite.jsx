import { useEffect, useRef, useState } from 'react';
import { player, games } from '../data/hobbies.js';
import { useRevealAll } from '../hooks/useReveal.js';
import { useRoute } from '../shared/Router.jsx';
import { Boot } from './Boot.jsx';
import { Particles } from './Particles.jsx';
import { Journey } from './Journey.jsx';
import { Roster } from './Roster.jsx';
import { KeepGoing } from './KeepGoing.jsx';
import { GameGlyph } from './Glyphs.jsx';
import { scenes, characters } from './assets.js';
import './play.css';
import './run.css';

const SECTIONS = [
  { id: 'journey', label: 'The Run' },
  ...(characters.length || import.meta.env.DEV ? [{ id: 'roster', label: 'Party' }] : []),
  { id: 'keep-going', label: 'Keep Going' },
];

const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function PlaySite() {
  const [booted, setBooted] = useState(() => {
    try { return sessionStorage.getItem('kg-booted') === '1'; } catch { return false; }
  });
  useRevealAll(booted);
  useSectionCursor();

  const finishBoot = () => {
    try { sessionStorage.setItem('kg-booted', '1'); } catch { /* private mode */ }
    setBooted(true);
  };

  return (
    <div className={`play ${booted ? 'is-booted' : ''}`}>
      {!booted && <Boot onDone={finishBoot} />}
      <Hud />
      <main>
        <PlayHero />
        <Journey />
        <Roster />
        <KeepGoing />
        <Credits />
      </main>
    </div>
  );
}

/** Each section can declare data-cursor="#hex" to recolour the custom cursor. */
function useSectionCursor() {
  useEffect(() => {
    const root = document.documentElement;
    const els = document.querySelectorAll('[data-cursor]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) root.style.setProperty('--cursor', e.target.dataset.cursor); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    els.forEach(el => io.observe(el));
    return () => { io.disconnect(); root.style.removeProperty('--cursor'); };
  }, []);
}

/* ───────── HUD: top bar with XP (scroll) bar and section nav ───────── */
function Hud() {
  const xp = useRef(null);
  const [active, setActive] = useState('');
  const [lvl, setLvl] = useState(player.level);
  const { go } = useRoute();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement.scrollHeight - innerHeight;
        const p = h > 0 ? scrollY / h : 0;
        if (xp.current) xp.current.style.transform = `scaleX(${p})`;
        setLvl(player.level + Math.floor(p * 5));
        let cur = '';
        for (const s of SECTIONS) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top < innerHeight * 0.45) cur = s.id;
        }
        setActive(cur);
      });
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="hud">
      <button className="hud__player" onClick={() => go('work')} title="Back to Work mode">
        <span className="hud__lvl">{lvl}</span>
        <span className="hud__name">{player.tag}<small>{player.title}</small></span>
      </button>
      <nav className="hud__nav" aria-label="Play sections">
        {SECTIONS.map(s => (
          <button key={s.id} className={active === s.id ? 'on' : ''} onClick={() => jump(s.id)}>{s.label}</button>
        ))}
      </nav>
      <div className="hud__xp" aria-hidden="true"><i ref={xp} /></div>
    </header>
  );
}

/* ───────── HERO ───────── */
function PlayHero() {
  const title = 'PLAYER TWO';
  return (
    <section className="p-hero" id="play-hero" data-cursor="#ff2e63">
      <HeroMontage />
      <Particles />
      <div className="p-hero__vignette" aria-hidden="true" />
      <div className="p-hero__inner">
        <p className="p-hero__kicker">
          <span>▶ NEW GAME+</span><span className="sep" /><span>{player.tag} HAS JOINED THE LOBBY</span>
        </p>
        <h1 className="p-hero__title glitch" data-text={title}>
          {[...title].map((c, i) => <span key={i} style={{ '--i': i }}>{c === ' ' ? ' ' : c}</span>)}
        </h1>
        <p className="p-hero__tag">{player.tagline}</p>
        <div className="party" aria-label="Games">
          {Object.entries(games).map(([id, g], i) => (
            <span key={id} className={`party__slot party__slot--${id}`} style={{ '--i': i }}>
              <GameGlyph game={id} /><b>{g.name}</b>
            </span>
          ))}
        </div>
        <button className="p-btn" onClick={() => jump('journey')}>
          <span>Start the run</span><kbd>↓</kbd>
        </button>
      </div>
      <div className="p-hero__corners" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="p-hero__ticker" aria-hidden="true">
        <div>{Array.from({ length: 2 }).map((_, k) => (
          <span key={k}>
            RANKED QUEUE · TEAM-UP READY · FACILITY LOCKDOWN · ONE MORE GAME · GG WP · RESPAWNING IN 3… 2… 1… ·&nbsp;
          </span>
        ))}</div>
      </div>
    </section>
  );
}

/** Slow cross-fade through every scene image you've added (all games mixed). */
function HeroMontage() {
  const all = [];
  const pools = [scenes.rift, scenes.rivals, scenes.facility];
  for (let i = 0; pools.some(p => p[i]); i++) pools.forEach(p => p[i] && all.push(p[i]));
  const [i, setI] = useState(0);
  useEffect(() => {
    if (all.length < 2) return;
    const t = setInterval(() => setI(n => (n + 1) % all.length), 5200);
    return () => clearInterval(t);
  }, [all.length]);
  if (!all.length) return null;
  return (
    <div className="montage" aria-hidden="true">
      {all.map((src, k) => <img key={src} src={src} alt="" className={k === i ? 'on' : ''} />)}
    </div>
  );
}

/* ───────── CREDITS ───────── */
function Credits() {
  const { go } = useRoute();
  return (
    <section className="credits" data-cursor="#ffffff">
      <div className="credits__roll" aria-hidden="true">
        <p>DIRECTED BY <b>KELVIN</b></p>
        <p>FUELLED BY <b>CAFFEINE</b></p>
        <p>PLAYTESTED BY <b>RANDOM TEAMMATES</b></p>
        <p>NO WALLS WERE HARMED <b>(SOME WERE)</b></p>
      </div>
      <h2 className="credits__gg" data-reveal>GG WP</h2>
      <p className="credits__sub" data-reveal>Thanks for playing. Want the serious version?</p>
      <button className="p-btn p-btn--light" data-reveal onClick={() => go('work')}>
        <span>Return to Work mode</span><kbd>◆</kbd>
      </button>
    </section>
  );
}
