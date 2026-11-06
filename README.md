# Kelvin Gian · Portfolio

Two sites in one, built with React + Vite and deployed to GitHub Pages.

| Route | Site | What's there |
|---|---|---|
| `#/` | **Work** | Hero, about, experience timeline, projects, skills, contact |
| `#/play` | **Play** | Boot screen, particle hero, game select, League-inspired Rift, Marvel Rivals-inspired comic panels, SCP: SL-inspired facility, and the *Keep Going* inspiration wall |

Switch between them with the floating **Work / Play** toggle.

## Editing content

- **Professional info:** `src/data/professional.js` (experience, projects, skills, links)
- **Play mode text:** `src/data/hobbies.js` (journey lessons, whispers, quotes, character details).
- **Play mode images** (none are bundled; add your own):
  - `src/assets/games/{rift,rivals,facility}/` are scene images for each game's journey stops and the hero montage.
  - `src/assets/characters/` holds character art named `<game>__<Name>.png`, e.g. `rift__Ahri.png`. These appear in the Party character select.
  - `src/assets/inspiration/` holds Keep Going wall images. Quote cards are sprinkled between them.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build to dist/
npm run lint
```

No UI framework: all animations are hand-written CSS + `requestAnimationFrame`, and respect `prefers-reduced-motion`.
