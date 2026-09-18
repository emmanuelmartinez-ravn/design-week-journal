# Nerder Design Week Journal

A daily journal (Monday–Friday) documenting practice exercises for a design
course. It's a React app built on the **Vello design system**
([vello-design-system.vercel.app](https://vello-design-system.vercel.app/))
— a fictional design system for a hyperlocal services marketplace, used
here purely as practice material for the course.

Each day breaks down into numbered practices (e.g. Monday's 1.1, 1.2, 1.3)
plus a Demo, reached through two levels of tabs: pick a day, then pick a
practice within it.

## Stack

- Vite + React 19, plain JavaScript (no TypeScript).
- No router, no state library — the app is small enough not to need one.
- Vello design system, vendored (not npm-installed).
- [`lucide-react`](https://lucide.dev/) for icons.

## Getting started

```sh
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Project structure

- `src/design-system/` — vendored copy of Vello's React components, tokens,
  and styles. Treated as third-party code: not hand-edited. See
  `src/design-system/README.md` for provenance and how to re-sync.
- `src/journal/` — the app itself: the day/practice list (`days.js`), the
  mapping from a practice to its write-up component
  (`practiceContent.js`), and the per-day entry view (`JournalEntry.jsx`).
- `src/journal/content/` — one component per written practice.
- `src/App.jsx` — top-level shell: day tabs + the active day's entry.
- `monday.md`, `tuesday.md`, `wednesday.md`, `thursday.md`, `friday.md` —
  raw notes from the course, predating this app. Legacy source material;
  most of it has since been migrated into `src/journal/content/`.

## Conventions

Contributor-facing conventions (token usage, component list, brand voice,
project structure) live in `.claude/rules/` and are summarized for AI
assistants in `CLAUDE.md`.
