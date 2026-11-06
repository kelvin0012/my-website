/**
 * PLAY MODE CONTENT
 * =================
 * Images are NOT bundled. Drop your own into these folders and they're picked up automatically:
 *
 *   src/assets/games/rift/       League of Legends scenes  (used by League lessons, in file-name order)
 *   src/assets/games/rivals/     Marvel Rivals scenes
 *   src/assets/games/facility/   SCP: Secret Laboratory scenes
 *   src/assets/characters/       Character art. Name files  <game>__<Character Name>.png
 *                                e.g.  rift__Ahri.png   rivals__Spider-Man.webp   facility__SCP-173.jpg
 *   src/assets/inspiration/      Keep Going wall images
 *
 * Anything without an image simply doesn't render an image. No placeholders ship to production.
 */

export const player = {
  tag: 'KELVIN',
  title: 'Player Two',
  level: 24,
  tagline: 'My three current favourite games, one individual. Everything I learned from 5-9, I took to 9-5.',
};

/** Game palettes. The page background cross-fades between these as you scroll. */
export const games = {
  rift: { name: 'League of Legends', short: 'LoL', a: '#c8aa6e', b: '#0ac8b9', bg: '#010a13', font: 'Cinzel' },
  rivals: { name: 'Marvel Rivals', short: 'Rivals', a: '#ffe14d', b: '#e62429', bg: '#170708', font: 'Bangers' },
  facility: { name: 'SCP: Secret Laboratory', short: 'SCP:SL', a: '#ffb000', b: '#ff3b30', bg: '#0a0b0c', font: 'Share Tech Mono' },
};

/**
 * The journey: one continuous run. Each stop pairs a game mechanic with what it taught me
 * and where it shows up in my work (all work examples are from my actual roles).
 * `widget` adds an interactive mini-mechanic: kit | keycard | comic | terminal | roles
 */
export const lessons = [
  {
    game: 'rift',
    skill: 'Prioritisation',
    title: 'Macro over mechanics',
    mechanic: 'Wave states, objective timers, knowing when to rotate and when to recall. Games are won by timing, not by flashy plays.',
    work: 'In Platform Engineering I applied the same timing logic to infrastructure: off-hours scaling with KRO and KEDA scales non-production workloads to zero, so Karpenter can reclaim the idle nodes.',
    tags: ['KEDA', 'KRO', 'Karpenter', 'Cost optimisation'],
  },
  {
    game: 'facility',
    skill: 'Security',
    title: 'Keycards & clearance',
    mechanic: 'Every door in the facility checks your keycard. A janitor card does not open the armoury, and that is the whole point.',
    work: 'Remediating legacy IAM roles at Optus was exactly this: least-privilege AWS IAM roles with explicit permission boundaries. Each role gets the doors it needs and no more.',
    tags: ['AWS IAM', 'Least privilege', 'Permission boundaries'],
    widget: 'keycard',
  },
  {
    game: 'rivals',
    skill: 'Collaboration',
    title: 'Team-ups',
    mechanic: 'Some heroes unlock new abilities only when they are on the same team. The comp is stronger than any single pick.',
    work: 'On the Optus iOS app, design, QA and engineering shipped together through rigorous code reviews and CI/CD. The team-up is the feature.',
    tags: ['Swift', 'Code review', 'CI/CD'],
    widget: 'comic',
  },
  {
    game: 'rift',
    skill: 'Visibility',
    title: 'Vision wins games',
    mechanic: 'Wards light up the map. Without vision you are guessing; with it, the whole team plays from the same information.',
    work: 'Migrating critical infrastructure manifests into a centralised GitOps config registry and retiring legacy ArgoCD apps means every environment is described in one place everyone can see.',
    tags: ['GitOps', 'ArgoCD', 'Single source of truth'],
  },
  {
    game: 'facility',
    skill: 'Communication',
    title: 'Proximity chat',
    mechanic: 'You hear whoever is nearby, friend or threat, and have seconds to work out what they want. Reading intent is survival.',
    work: 'In the AI rotation I built conversational AI playbooks and routing/roaming agents whose whole job is to interpret a customer’s intent and send them to the right place.',
    tags: ['Conversational AI', 'Intent routing', 'LLM prompts'],
    widget: 'terminal',
  },
  {
    game: 'rivals',
    skill: 'Versatility',
    title: 'Vanguard · Duelist · Strategist',
    mechanic: 'Every comp needs someone to hold the line, someone to make plays and someone to keep the team alive. Good players can flex.',
    work: 'Three graduate rotations, three roles: AI engineering, mobile iOS and platform engineering. Different kits, same teamwork.',
    tags: ['AI', 'iOS', 'Platform'],
    widget: 'roles',
  },
  {
    game: 'rift',
    skill: 'Adaptability',
    title: 'Read the patch notes',
    mechanic: 'The game is patched about every two weeks. What was strong yesterday might be gone tomorrow, so you keep learning or you fall behind.',
    work: 'New rotation, new language: Kotlin for provisioning workflows, Swift for iOS, CEL for scaling rules. Picking up new tools fast also got us to the finals of the Optus × GitHub Copilot Hack-AI-thon.',
    tags: ['Kotlin', 'Swift', 'CEL', 'GitHub Copilot'],
    widget: 'kit',
  },
  {
    game: 'facility',
    skill: 'Resourcefulness',
    title: 'Start as Class-D',
    mechanic: 'You spawn in a cell with nothing. You find a keycard, then a better one, then a way out. Every round starts from zero.',
    work: 'Each rotation starts the same way: new codebase, new team, new domain. Find the first keycard, learn the map, and ship something real.',
    tags: ['Onboarding', 'Learning fast'],
  },
  {
    game: 'rivals',
    skill: 'Building fast',
    title: 'Destructible maps',
    mechanic: 'If a wall is in the way, the wall is temporary. Maps change mid-fight and the best teams adapt on the fly.',
    work: 'Hackathons are the same energy: an AI Slack summariser at Atlassian × UNIHACK, TripMama at the Accenture bootcamp, and now helping organise UNIHACK for the next wave of builders.',
    tags: ['UNIHACK', 'Hackathons', 'Prototyping'],
  },
];

/** Optional details for characters, keyed by "<game>__<Name>" file stem. */
export const characterInfo = {
  // 'rift__Ahri': { role: 'Mage · Mid', line: 'My comfort pick when I need to carry.' },
  // 'rivals__Spider-Man': { role: 'Duelist', line: 'Mobility first, questions later.' },
  // 'facility__SCP-173': { role: 'SCP', line: 'Do not blink.' },
};

/** Little sparks of inspiration scattered through the journey. */
export const whispers = [
  'Every pro was once in bronze.',
  'Respawn. Adjust. Re-queue.',
  'GG is the start of the next queue.',
  'You miss every ult you don’t press.',
  'Fall seven times, stand up eight.',
  'Nobody escapes the facility on their first try.',
  'The comp is stronger than the pick.',
  'Keep going. The map reveals itself as you walk it.',
];

/** Keep Going wall. Images come from src/assets/inspiration/; captions keyed by file stem. */
export const imageCaptions = {
  // 'my-image-name': 'caption shown on hover',
};

/** Text-only inspiration cards woven between the images. Styles: hex | comic | terminal | plain | neon */
export const quotes = [
  { text: 'Respawn is not a punishment. It is a second attempt with more information.', by: '', style: 'neon' },
  { text: 'It does not matter how slowly you go as long as you do not stop.', by: 'Confucius', style: 'hex' },
  { text: 'Every pro was once in bronze.', by: '', style: 'comic' },
  { text: '> run attempt_47.exe\n> status: still going', by: 'build log', style: 'terminal' },
  { text: 'The expert in anything was once a beginner.', by: 'Helen Hayes', style: 'plain' },
  { text: 'Fall seven times, stand up eight.', by: 'Japanese proverb', style: 'comic' },
  { text: '> containment breach detected\n> it was just self-doubt\n> re-containing...', by: 'Site-K', style: 'terminal' },
  { text: 'The best time to plant a tree was 20 years ago. The second best time is now.', by: 'Proverb', style: 'hex' },
];
