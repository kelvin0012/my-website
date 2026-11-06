import { useEffect, useRef, useState } from 'react';
import { profile, experience, projects, skills, extraTech, certifications, recognition } from '../data/professional.js';
import { useRevealAll, useScrollProgress } from '../hooks/useReveal.js';
import { Tilt } from '../shared/Tilt.jsx';
import { useRoute } from '../shared/Router.jsx';
import { LinkedInIcon, GitHubIcon, MailIcon, ArrowIcon, GamepadIcon } from '../shared/Icons.jsx';
import headshot from '../assets/profileHeadshot.jpg';
import './pro.css';

const NAV = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
];

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export function ProSite() {
  useRevealAll('pro');
  return (
    <div className="pro">
      <ProNav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <PlayTeaser />
        <Contact />
      </main>
      <footer className="pro-footer">
        <span>Designed &amp; built by {profile.name} · {new Date().getFullYear()}</span>
        <button className="linkish" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button>
      </footer>
    </div>
  );
}

/* ───────── NAV ───────── */
function ProNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const bar = useRef(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement.scrollHeight - innerHeight;
        bar.current && (bar.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`);
        setScrolled(scrollY > 24);
        let cur = '';
        for (const [id] of NAV) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top < innerHeight * 0.4) cur = id;
        }
        setActive(cur);
      });
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  const jump = (id) => { setOpen(false); scrollToId(id); };

  return (
    <header className={`pro-nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <button className="pro-nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        <span>K</span><span>G</span>
      </button>
      <nav className="pro-nav__links" aria-label="Sections">
        {NAV.map(([id, label], i) => (
          <button key={id} className={active === id ? 'active' : ''} onClick={() => jump(id)} style={{ '--i': i }}>
            <em>0{i + 1}</em>{label}
          </button>
        ))}
      </nav>
      <button className="pro-nav__burger" onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}>
        <span /><span />
      </button>
      <span className="pro-nav__progress" ref={bar} />
    </header>
  );
}

/* ───────── HERO ───────── */
function Hero() {
  const ref = useRef(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const { go } = useRoute();

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, []);

  // Aurora follows the pointer (smoothed)
  useEffect(() => {
    const el = ref.current;
    let tx = 0.5, ty = 0.4, x = tx, y = ty, raf;
    const move = (e) => { tx = e.clientX / innerWidth; ty = e.clientY / innerHeight; };
    const loop = () => {
      x += (tx - x) * 0.05; y += (ty - y) * 0.05;
      el.style.setProperty('--ax', `${x * 100}%`);
      el.style.setProperty('--ay', `${y * 100}%`);
      el.style.setProperty('--sy', `${Math.min(scrollY, 900)}px`);
      raf = requestAnimationFrame(loop);
    };
    loop();
    addEventListener('pointermove', move, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move); };
  }, []);

  const first = 'KELVIN';
  const last = 'GIAN';

  return (
    <section className="hero" ref={ref} id="top">
      <div className="hero__aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__inner">
        <p className="hero__eyebrow">
          <span className="pulse" /> {profile.headline}
        </p>
        <h1 className="hero__name" aria-label={profile.name}>
          <span className="line">{[...first].map((c, i) => <span key={i} className="ch" style={{ '--d': i }}>{c}</span>)}</span>
          <span className="line outline">{[...last].map((c, i) => <span key={i} className="ch" style={{ '--d': i + first.length }}>{c}</span>)}</span>
        </h1>
        <div className="hero__role" aria-live="polite">
          <span className="hero__role-prefix">I&apos;m a</span>
          <span className="hero__role-window">
            {profile.roles.map((r, i) => (
              <span key={r} className={`hero__role-word ${i === roleIdx ? 'on' : ''} ${i === (roleIdx - 1 + profile.roles.length) % profile.roles.length ? 'out' : ''}`}>{r}</span>
            ))}
          </span>
        </div>
        <p className="hero__blurb">{profile.blurb}</p>
        <div className="hero__cta">
          <button className="btn btn--primary" onClick={() => scrollToId('experience')}>View my work <ArrowIcon /></button>
          <button className="btn btn--ghost" onClick={() => go('play')}><GamepadIcon /> Enter Play mode</button>
        </div>
      </div>

      <div className="hero__portrait" aria-hidden="true">
        <div className="hero__orbit">
          {skills.filter(s => s.icon).slice(0, 6).map((s, i) => (
            <span key={s.name} className="hero__orb" style={{ '--i': i, '--n': 6 }}><img src={s.icon} alt="" /></span>
          ))}
        </div>
        <div className="hero__photo"><img src={headshot} alt="" /></div>
      </div>

      <div className="hero__socials">
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
        <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
        <a href={`mailto:${profile.links.email}`} aria-label="Email"><MailIcon /></a>
        <span className="hero__socials-line" />
      </div>

      <button className="hero__scroll" onClick={() => scrollToId('about')} aria-label="Scroll down">
        <span>scroll</span><i />
      </button>
    </section>
  );
}

/* ───────── MARQUEE ───────── */
function Marquee() {
  const items = [...skills.map(s => s.name), ...extraTech];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map(k => (
          <div className="marquee__group" key={k}>
            {items.map(t => <span key={t + k}>{t}<b>✦</b></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── ABOUT ───────── */
function About() {
  const stats = [
    { n: 3, suffix: '', label: 'Engineering rotations at Optus' },
    { n: 2, suffix: '+', label: 'Years building in industry' },
    { n: certifications.length, suffix: '', label: 'Certifications' },
    { n: 2, suffix: '×', label: "Dean's Merit List" },
  ];
  return (
    <section className="section about" id="about">
      <SectionHead num="01" title="About" />
      <div className="about__grid">
        <p className="about__lead" data-reveal>
          I like turning <mark>messy problems</mark> into <mark>clean, shipped software</mark>. At Optus I&apos;ve rotated through AI engineering, iOS and platform engineering, shipping AI search, app features for millions of customers, and leaner, safer cloud infrastructure. Outside work I help organise <mark>UNIHACK</mark>, a student-run hackathon.
        </p>
        <div className="about__stats">
          {stats.map((s, i) => <Stat key={s.label} {...s} delay={i} />)}
        </div>
      </div>
    </section>
  );
}

function Stat({ n, suffix, label, delay }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1200);
        setV(Math.round(n * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [n]);
  return (
    <div className="stat" ref={ref} data-reveal style={{ '--d': delay }}>
      <span className="stat__n">{v}{suffix}</span>
      <span className="stat__l">{label}</span>
    </div>
  );
}

function SectionHead({ num, title, kicker }) {
  return (
    <div className="section-head" data-reveal>
      <span className="section-head__num">{num}</span>
      <h2 className="section-head__title">{title}</h2>
      {kicker && <p className="section-head__kicker">{kicker}</p>}
      <span className="section-head__rule" />
    </div>
  );
}

/* ───────── EXPERIENCE ───────── */
function Experience() {
  const ref = useRef(null);
  const p = useScrollProgress(ref);
  return (
    <section className="section exp" id="experience">
      <SectionHead num="02" title="Experience" kicker="Where I've worked and studied." />
      <div className="exp__list" ref={ref} style={{ '--p': p }}>
        <span className="exp__rail" aria-hidden="true"><i /></span>
        {experience.map((e, i) => (
          <article key={e.title + e.date} className={`exp__item ${e.current ? 'is-current' : ''}`} data-reveal style={{ '--d': i }}>
            <div className="exp__node" aria-hidden="true"><img src={e.logo} alt="" /></div>
            <div className="exp__date">{e.date}{e.current && <span className="badge">Now</span>}</div>
            <div className="exp__card">
              <p className="exp__org">{e.org}{e.place && <span className="exp__place"> · {e.place}</span>}</p>
              <h3 className="exp__title">{e.title}</h3>
              {e.rotations ? <Rotations rotations={e.rotations} /> : (
                <>
                  <p className="exp__summary">{e.summary}</p>
                  {e.highlights && <Highlights items={e.highlights} />}
                  <ul className="chips">{e.tech.map(t => <li key={t}>{t}</li>)}</ul>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Highlights({ items }) {
  return (
    <ul className="hl">
      {items.map(([k, v]) => <li key={k}><b>{k}</b>{v}</li>)}
    </ul>
  );
}

/** Tabbed rotations inside one company card. Latest rotation selected by default. */
function Rotations({ rotations }) {
  const [i, setI] = useState(0);
  const r = rotations[i];
  return (
    <div className="rot">
      <div className="rot__tabs" role="tablist" aria-label="Rotations" style={{ '--n': rotations.length, '--i': i }}>
        {rotations.map((x, j) => (
          <button key={x.name} role="tab" aria-selected={i === j} className={i === j ? 'on' : ''} onClick={() => setI(j)}>
            <span className="rot__num">R{rotations.length - j}</span>{x.name}
          </button>
        ))}
        <span className="rot__ink" aria-hidden="true" />
      </div>
      <div className="rot__panel" key={i} role="tabpanel">
        <p className="rot__date">{r.date}</p>
        <p className="exp__summary">{r.summary}</p>
        <Highlights items={r.highlights} />
        {r.award && <p className="rot__award"><span>★</span>{r.award}</p>}
        <ul className="chips">{r.tech.map(t => <li key={t}>{t}</li>)}</ul>
      </div>
    </div>
  );
}

/* ───────── PROJECTS ───────── */
function Projects() {
  return (
    <section className="section projects" id="projects">
      <SectionHead num="03" title="Projects" kicker="Hackathons, bootcamps and side builds." />
      <div className="projects__grid">
        {projects.map((p, i) => {
          const Wrapper = p.href ? 'a' : 'div';
          return (
            <div key={p.name} data-reveal style={{ '--d': i }} className="projects__cell">
              <Tilt className="project" max={8} style={{ '--accent': p.accent }}>
                <Wrapper className="project__inner" {...(p.href ? { href: p.href, target: '_blank', rel: 'noreferrer' } : {})}>
                  <span className="project__glow" aria-hidden="true" />
                  <div className="project__top">
                    <span className="project__logo"><img src={p.logo} alt="" /></span>
                    <span className="project__idx">/0{i + 1}</span>
                  </div>
                  <p className="project__event">{p.event} · {p.date}</p>
                  <h3 className="project__name">{p.name}{p.href && <ArrowIcon className="project__arrow" />}</h3>
                  <p className="project__summary">{p.summary}</p>
                  <ul className="chips">{p.tech.map(t => <li key={t}>{t}</li>)}</ul>
                </Wrapper>
              </Tilt>
            </div>
          );
        })}
      </div>
      <div className="recog">
        {recognition.map((x, i) => (
          <div className="recog__item" key={x.name} data-reveal style={{ '--d': i }}>
            <span className="recog__label">{x.label}</span>
            <span className="recog__name">{x.name}</span>
            <span className="recog__year">{x.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────── SKILLS ───────── */
function Skills() {
  return (
    <section className="section skills" id="skills">
      <SectionHead num="04" title="Skills" kicker="Tools I reach for, and the certifications behind them." />
      <div className="skills__grid">
        {skills.map((s, i) => (
          <Tilt key={s.name} className="skill" max={18} data-reveal style={{ '--d': i * 0.5 }}>
            {s.icon
              ? <img src={s.icon} alt="" />
              : <i className="skill__mono" style={{ '--c': s.color }}>{s.mono}</i>}
            <span>{s.name}</span>
          </Tilt>
        ))}
      </div>
      <ul className="chips chips--big" data-reveal>
        {extraTech.map(t => <li key={t}>{t}</li>)}
      </ul>

      <h3 className="certs__title" data-reveal>Certifications</h3>
      <div className="certs">
        {certifications.map((c, i) => (
          <Tilt key={c.name} className="cert" max={10} data-reveal style={{ '--d': i * 0.6 }}>
            <span className="cert__mark">{c.mark}</span>
            <span className="cert__body">
              <span className="cert__name">{c.name}</span>
              <span className="cert__issuer">{c.issuer}</span>
            </span>
          </Tilt>
        ))}
      </div>
    </section>
  );
}

/* ───────── PLAY TEASER ───────── */
function PlayTeaser() {
  const { go } = useRoute();
  return (
    <section className="section teaser-wrap">
      <button className="teaser" onClick={() => go('play')} data-reveal>
        <span className="teaser__scan" aria-hidden="true" />
        <span className="teaser__kicker">{'// side quest unlocked'}</span>
        <span className="teaser__title" data-text="PRESS START">PRESS START</span>
        <span className="teaser__sub">There&apos;s another side to me: ranked queues, comic-book team-ups, facility breaches, and the wall that keeps me going.</span>
        <span className="teaser__games">
          <span>League of Legends</span><span>Marvel Rivals</span><span>SCP: Secret Laboratory</span>
        </span>
        <span className="teaser__cta">Enter Play mode <ArrowIcon /></span>
      </button>
    </section>
  );
}

/* ───────── CONTACT ───────── */
function Contact() {
  const btn = useRef(null);
  const onMove = (e) => {
    const el = btn.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => { btn.current.style.transform = ''; };

  return (
    <section className="section contact" id="contact">
      <SectionHead num="05" title="Contact" />
      <h2 className="contact__big" data-reveal>
        Let&apos;s build<br /><span className="grad">something great.</span>
      </h2>
      <div className="contact__row" data-reveal>
        <div className="magnet" onPointerMove={onMove} onPointerLeave={onLeave}>
          <a ref={btn} className="contact__mail" href={`mailto:${profile.links.email}`}>
            <MailIcon /> Say hello
          </a>
        </div>
        <div className="contact__links">
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon /> LinkedIn <ArrowIcon /></a>
          <a href={profile.links.github} target="_blank" rel="noreferrer"><GitHubIcon /> GitHub <ArrowIcon /></a>
          <a href={`mailto:${profile.links.email}`}><MailIcon /> {profile.links.email}</a>
        </div>
      </div>
    </section>
  );
}
