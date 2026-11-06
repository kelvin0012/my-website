/** Abstract per-game marks (original shapes, not game logos). */
export function GameGlyph({ game }) {
  if (game === 'rift') return (
    <svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="6">
      <path d="M50 8 86 29v42L50 92 14 71V29Z" /><circle cx="50" cy="50" r="12" /></g></svg>
  );
  if (game === 'rivals') return (
    <svg viewBox="0 0 100 100" aria-hidden="true"><path fill="currentColor" d="M50 4 60 32 90 18 72 46 98 54 68 62 80 92 52 74 34 96 36 64 4 60 30 44 14 16 42 30Z" /></svg>
  );
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="7">
      <circle cx="50" cy="50" r="38" /><circle cx="50" cy="50" r="7" fill="currentColor" />
      <path d="M50 40V18M41 55 22 66M59 55l19 11" strokeWidth="11" strokeLinecap="round" /></g></svg>
  );
}
