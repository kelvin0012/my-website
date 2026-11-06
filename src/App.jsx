import { lazy, Suspense } from 'react';
import { RouterProvider, useRoute, ModeSwitch } from './shared/Router.jsx';
import { Cursor } from './shared/Cursor.jsx';
import { ProSite } from './pro/ProSite.jsx';
import './App.css';

// The play site is heavier, so load it only when someone visits it.
const PlaySite = lazy(() => import('./play/PlaySite.jsx'));

function Sites() {
  const { mode } = useRoute();
  return (
    <>
      <Cursor />
      <ModeSwitch />
      {mode === 'play' ? (
        <Suspense fallback={<div className="play-fallback">LOADING…</div>}>
          <PlaySite />
        </Suspense>
      ) : (
        <ProSite />
      )}
    </>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <Sites />
    </RouterProvider>
  );
}
