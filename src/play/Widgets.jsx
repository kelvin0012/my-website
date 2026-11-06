import { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal.js';

/* ─────────── LoL-style ability bar: my "kit" ─────────── */
const KIT = [
  { key: 'P', name: 'Curiosity', type: 'Passive', cd: '—', desc: 'Every new tool learned permanently grants bonus problem-solving. Stacks infinitely.' },
  { key: 'Q', name: 'Rapid Prototype', type: 'Active', cd: '1 hackathon', desc: 'Dashes forward and turns a rough idea into a working demo. Resets on hackathon finals.' },
  { key: 'W', name: 'Stack Trace', type: 'Active', cd: '30s', desc: 'Reveals the true source of a bug in a large radius. Bonus damage against flaky pipelines.' },
  { key: 'E', name: 'Team Sync', type: 'Active', cd: '1 sprint', desc: 'Links with nearby allies, sharing context with design and QA before anyone ships.' },
  { key: 'R', name: 'Ship It', type: 'Ultimate', cd: '1 release', desc: 'Channels briefly, then deploys through CI/CD. Allies gain Morale for the rest of the sprint.' },
];
const KIT_GLYPH = {
  P: <path d="M50 14c14 10 22 24 22 36a22 22 0 0 1-44 0c0-12 8-26 22-36Zm0 22a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />,
  Q: <path d="M18 70 62 26l6-12 12 0-4 10-8 10L28 80Zm-4 8 8 8-10 4Z" />,
  W: <path d="M30 20h40v12H58v36l10 12H32l10-12V32H30Z" />,
  E: <path d="M30 30a20 20 0 1 1 0 40M70 70a20 20 0 1 1 0-40M40 50h20" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />,
  R: <path d="M50 8 62 38l32 2-25 20 9 32-28-18-28 18 9-32L6 40l32-2Z" />,
};

export function Kit() {
  const [sel, setSel] = useState(4);
  const [casts, setCasts] = useState({});
  const cur = KIT[sel];
  const cast = (i) => {
    setSel(i);
    if (KIT[i].type !== 'Passive') setCasts(c => ({ ...c, [i]: (c[i] || 0) + 1 }));
  };
  return (
    <div className="kit">
      <p className="w-label">My kit · <em>click to cast</em></p>
      <div className="kit__bar" role="tablist" aria-label="Abilities">
        {KIT.map((a, i) => (
          <button key={a.key} role="tab" aria-selected={sel === i}
            className={`ability ${sel === i ? 'on' : ''} ${a.type === 'Ultimate' ? 'ability--ult' : ''} ${a.type === 'Passive' ? 'ability--passive' : ''}`}
            onClick={() => cast(i)} onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)}>
            <svg viewBox="0 0 100 100" aria-hidden="true" fill="currentColor">{KIT_GLYPH[a.key]}</svg>
            <span className="ability__key">{a.key}</span>
            {casts[i] > 0 && <span className="ability__cd" key={casts[i]} aria-hidden="true" />}
          </button>
        ))}
      </div>
      <div className="kit__tip" key={sel} role="tabpanel">
        <div className="kit__tip-head"><strong>{cur.name}</strong><span className="kit__type">{cur.type}</span><span className="kit__cdtext">⟳ {cur.cd}</span></div>
        <p>{cur.desc}</p>
      </div>
    </div>
  );
}

/* ─────────── SCP:SL-style keycard reader: least privilege ─────────── */
const CARDS = [
  { id: 'janitor', label: 'Janitor', level: 1, color: '#9aa3a8' },
  { id: 'scientist', label: 'Scientist', level: 2, color: '#ffd23f' },
  { id: 'manager', label: 'Facility Manager', level: 4, color: '#ff3b30' },
];
const DOORS = [
  { name: 'Light Containment', need: 1 },
  { name: 'Armoury', need: 3 },
  { name: 'Prod IAM Policies', need: 4 },
];

export function Keycard() {
  const [door, setDoor] = useState(1);
  const [result, setResult] = useState(null); // {card, ok, k}
  const swipe = (c) => setResult({ card: c.id, ok: c.level >= DOORS[door].need, k: Date.now() });
  const d = DOORS[door];
  return (
    <div className="keycard">
      <p className="w-label">Access check · <em>pick a door, then swipe a card</em></p>
      <div className="keycard__doors">
        {DOORS.map((x, i) => (
          <button key={x.name} className={i === door ? 'on' : ''} onClick={() => { setDoor(i); setResult(null); }}>
            {x.name}<small>L{x.need}+</small>
          </button>
        ))}
      </div>
      <div className="keycard__stage">
        <div className={`reader ${result ? (result.ok ? 'is-ok' : 'is-no') : ''}`} key={result?.k}>
          <span className="reader__led" />
          <span className="reader__text">{result ? (result.ok ? 'ACCESS GRANTED' : 'ACCESS DENIED') : `${d.name.toUpperCase()} · L${d.need}`}</span>
        </div>
        <div className={`blast ${result?.ok ? 'is-open' : ''}`} key={'d' + door}><i /><i /></div>
      </div>
      <div className="keycard__cards">
        {CARDS.map(c => (
          <button key={c.id} className={`card-key ${result?.card === c.id ? 'is-swiped' : ''}`} style={{ '--kc': c.color }} onClick={() => swipe(c)}>
            <span className="card-key__stripe" /><span className="card-key__name">{c.label}</span><span className="card-key__lvl">L{c.level}</span>
          </button>
        ))}
      </div>
      <p className="w-note">Least privilege: each role opens the doors it needs, and nothing else.</p>
    </div>
  );
}

/* ─────────── Marvel Rivals-style team-up: design + QA + eng ─────────── */
export function TeamUp() {
  const [on, setOn] = useState(0);
  const members = ['Design', 'Engineering', 'QA'];
  return (
    <div className={`teamup ${on ? 'is-on' : ''}`}>
      <p className="w-label">Team-up ability · <em>activate it</em></p>
      <div className="teamup__row">
        {members.map((m, i) => <span key={m} className="teamup__member" style={{ '--i': i }}>{m}</span>)}
        {on > 0 && <span className="teamup__burst" key={on} aria-hidden="true">TEAM-UP!</span>}
      </div>
      <button className="teamup__btn" onClick={() => setOn(n => n + 1)}>{on ? 'Shipped! Again?' : 'Activate team-up'}</button>
    </div>
  );
}

/* ─────────── Proximity chat → intent routing terminal ─────────── */
const CHATS = [
  { msg: "my phone has no signal since I landed in bali", route: 'ROAMING AGENT' },
  { msg: 'can I upgrade my plan without a new contract?', route: 'PLANS AGENT' },
  { msg: 'the app keeps logging me out', route: 'TECH SUPPORT AGENT' },
];
export function IntentTerminal() {
  const [ref, inView] = useReveal({ threshold: 0.5 });
  const [lines, setLines] = useState([]);
  useEffect(() => {
    if (!inView) return;
    let alive = true, t;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const run = async () => {
      const wait = (ms) => new Promise(r => { t = setTimeout(r, reduce ? 0 : ms); });
      for (let n = 0; alive; n++) {
        const c = CHATS[n % CHATS.length];
        const base = [];
        for (let i = 1; i <= c.msg.length && alive; i++) {
          setLines([...base, { k: 'u', t: '> user: ' + c.msg.slice(0, i) }]);
          await wait(28);
        }
        await wait(350);
        setLines([{ k: 'u', t: '> user: ' + c.msg }, { k: 's', t: '> classifying intent ...' }]);
        await wait(700);
        setLines([{ k: 'u', t: '> user: ' + c.msg }, { k: 's', t: '> classifying intent ... OK' }, { k: 'r', t: `> routed → ${c.route}` }]);
        await wait(2200);
      }
    };
    run();
    return () => { alive = false; clearTimeout(t); };
  }, [inView]);
  return (
    <div className="term" ref={ref}>
      <div className="term__bar"><i /><i /><i /><span>site-k://intent-router</span></div>
      <pre className="term__body">
        {lines.map((l, i) => <div key={i} className={`term__${l.k}`}>{l.t}</div>)}
        <span className="term__caret">█</span>
      </pre>
    </div>
  );
}

/* ─────────── Role select: three rotations as three roles ─────────── */
const ROLES = [
  { role: 'Vanguard', rot: 'Platform Engineering', why: 'Holds the line for everyone: IAM boundaries, GitOps, cost controls.', c: '#4aa3ff' },
  { role: 'Duelist', rot: 'AI Engineering', why: 'Makes the plays: AI search, LLM workflows, conversational agents.', c: '#ff4655' },
  { role: 'Strategist', rot: 'Mobile iOS', why: 'Keeps the team (and millions of users) healthy: polished app features.', c: '#3ddc84' },
];
export function RoleSelect() {
  const [i, setI] = useState(0);
  const r = ROLES[i];
  return (
    <div className="roles">
      <p className="w-label">Role queue · <em>pick one</em></p>
      <div className="roles__row">
        {ROLES.map((x, j) => (
          <button key={x.role} className={`role ${i === j ? 'on' : ''}`} style={{ '--rc': x.c }} onClick={() => setI(j)}>
            <span className="role__name">{x.role}</span><span className="role__rot">{x.rot}</span>
          </button>
        ))}
      </div>
      <p className="roles__why" key={i} style={{ '--rc': r.c }}>{r.why}</p>
    </div>
  );
}
