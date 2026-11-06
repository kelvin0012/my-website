import { characterInfo, games } from '../data/hobbies.js';

const stem = (p) => p.split('/').pop().replace(/\.[^.]+$/, '');
const sorted = (obj) => Object.entries(obj).sort(([a], [b]) => a.localeCompare(b));

const sceneFiles = {
  rift: import.meta.glob('../assets/games/rift/*.{png,jpg,jpeg,webp,avif,gif}', { eager: true, import: 'default' }),
  rivals: import.meta.glob('../assets/games/rivals/*.{png,jpg,jpeg,webp,avif,gif}', { eager: true, import: 'default' }),
  facility: import.meta.glob('../assets/games/facility/*.{png,jpg,jpeg,webp,avif,gif}', { eager: true, import: 'default' }),
};

/** Scene images per game, in file-name order. */
export const scenes = Object.fromEntries(
  Object.entries(sceneFiles).map(([g, files]) => [g, sorted(files).map(([, src]) => src)])
);

/** Characters from src/assets/characters/<game>__<Name>.<ext> */
const charFiles = import.meta.glob('../assets/characters/*.{png,jpg,jpeg,webp,avif,gif}', { eager: true, import: 'default' });
export const characters = sorted(charFiles)
  .map(([path, src]) => {
    const key = stem(path);
    const [game, ...rest] = key.split('__');
    if (!games[game] || !rest.length) return null;
    return { key, src, game, name: rest.join(' ').replace(/_+/g, ' ').trim(), ...(characterInfo[key] || {}) };
  })
  .filter(Boolean);

/** Keep Going wall images. */
const inspFiles = import.meta.glob('../assets/inspiration/*.{png,jpg,jpeg,webp,avif,gif}', { eager: true, import: 'default' });
export const inspiration = sorted(inspFiles).map(([path, src]) => ({ name: stem(path), src }));
