# Nerder Design Week Journal

A daily journal (Monday–Friday) documenting practice exercises for a design
course. It's a React app built on the **Vello design system**
(https://vello-design-system.vercel.app/) — a fictional design system for a
hyperlocal services marketplace, used here purely as the practice material
for the course.

## Stack

- Vite + React 19, plain JavaScript (no TypeScript).
- No router, no state library — this app is small enough not to need one.
- Vello design system, vendored (not npm-installed — see below).
- `lucide-react` for icons.

## Run it

```sh
npm install
npm run dev
```

## Structure

- `src/design-system/` — vendored copy of Vello's React components, tokens,
  and styles. Treat as third-party code: don't hand-edit it, see
  `src/design-system/README.md` for provenance and how to re-sync.
- `src/journal/` — the app itself: the list of days and the per-day entry view.
- `src/App.jsx` — top-level shell: day tabs + the active day's entry.
- `monday.md`, `tuesday.md`, `wednesday.md`, `thursday.md` — raw notes from
  the course, predating this app. **Legacy / not wired into the app**, except
  where content has been explicitly migrated into `src/journal/content/` (see
  `.claude/rules/project-structure.md`). Don't migrate the rest on your own
  initiative — only when the user asks.

## Rules

Detailed conventions live in `.claude/rules/`:

@.claude/rules/design-system.md
@.claude/rules/project-structure.md
@.claude/rules/react-conventions.md
@.claude/rules/component-generation.md
