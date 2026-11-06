import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

/**
 * Tiny hash router with a cinematic transition between the two sites.
 * Routes: '#/' (work) and '#/play' (play). Hash routing keeps GitHub Pages happy.
 */
const RouteCtx = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useRoute = () => useContext(RouteCtx);

const parse = () => (location.hash.replace(/^#\/?/, '').split(/[/?]/)[0] === 'play' ? 'play' : 'work');

export function RouterProvider({ children }) {
  const [mode, setMode] = useState(parse);
  const [phase, setPhase] = useState('idle'); // idle | cover | reveal
  const [target, setTarget] = useState(mode);
  const timers = useRef([]);

  useEffect(() => {
    const onHash = () => setMode(parse());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    document.title = mode === 'play' ? 'Kelvin Gian · Player Two' : 'Kelvin Gian · Software Engineer';
  }, [mode]);

  const go = useCallback((next) => {
    if (next === mode || phase !== 'idle') return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const swap = () => {
      location.hash = next === 'play' ? '#/play' : '#/';
      setMode(next);
      window.scrollTo(0, 0);
    };
    if (reduce) { swap(); return; }
    setTarget(next);
    setPhase('cover');
    timers.current.push(setTimeout(() => { swap(); setPhase('reveal'); }, 900));
    timers.current.push(setTimeout(() => setPhase('idle'), 1800));
  }, [mode, phase]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <RouteCtx.Provider value={{ mode, go }}>
      {children}
      <ModeTransition phase={phase} target={target} />
    </RouteCtx.Provider>
  );
}

function ModeTransition({ phase, target }) {
  if (phase === 'idle') return null;
  const label = target === 'play' ? 'ENTERING PLAY MODE' : 'RETURNING TO WORK';
  return (
    <div className={`mode-wipe is-${phase} to-${target}`} aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <span key={i} className="mode-wipe__bar" style={{ '--i': i }} />
      ))}
      <div className="mode-wipe__label">
        <span className="mode-wipe__glyph">{target === 'play' ? '▶' : '◆'}</span>
        <span className="mode-wipe__text" data-text={label}>{label}</span>
        <span className="mode-wipe__load"><i /></span>
      </div>
    </div>
  );
}

/** The floating Work ⟷ Play switch shown on both sites. */
export function ModeSwitch() {
  const { mode, go } = useRoute();
  return (
    <div className={`mode-switch is-${mode}`} role="group" aria-label="Choose site">
      <button className={mode === 'work' ? 'on' : ''} onClick={() => go('work')} aria-pressed={mode === 'work'}>Work</button>
      <button className={mode === 'play' ? 'on' : ''} onClick={() => go('play')} aria-pressed={mode === 'play'}>Play</button>
      <span className="mode-switch__thumb" aria-hidden="true" />
    </div>
  );
}
