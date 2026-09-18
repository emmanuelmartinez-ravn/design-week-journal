# Project structure & the journal itself

## Purpose

This app is a personal journal for a design course, one entry per weekday
(Monday–Friday). The content is the user's own practice notes and reflections
— not a Vello product feature. Don't invent course content; only the user
knows what they practiced each day.

## Legacy notes files

`monday.md`, `tuesday.md`, `wednesday.md`, `thursday.md` at the repo root are
the user's original working notes, predating this app. Treat them as source
material to migrate from **only when the user points at one and asks** (as
happened for Monday's practice 1.1) — don't proactively migrate the rest,
and don't delete/"clean up" these files.

## Days and practices

Each weekday breaks down into numbered **practices** (e.g. Monday has
1.1, 1.2, 1.3) — one exercise from the course per practice.

- `src/journal/days.js` — the day list; each day has `id`, `label`, and a
  `practices` array (`{ id, label }`). A day with an empty `practices` array
  renders a single day-level empty state (see `JournalEntry.jsx`) — that's
  the state for a day whose practice breakdown isn't known yet. **Ask the
  user for a day's practice numbers before inventing them** — don't guess
  counts for Tuesday–Friday the way Monday's 1.1/1.2/1.3 were given explicitly.
- `src/journal/practiceContent.js` — maps a practice `id` to the component
  that renders its write-up. A practice with no entry here falls back to a
  per-practice empty state automatically — you don't need a placeholder
  component for practices that don't have content yet.
- `src/journal/content/` — one component per *written* practice (e.g.
  `Monday1_1.jsx`). Name new files `<Day><PracticeNumber>.jsx` following that
  example. Render the exercise content using design-system primitives where
  it fits (e.g. `Badge` for classification labels) rather than plain
  unstyled HTML — this is a chance to practice using Vello, not just a text dump.
- `src/App.jsx` holds the two levels of `Tabs` state (active day, active
  practice) and resets the practice selection to the new day's first
  practice on day change.
- `src/journal/PracticeDivider.jsx` — shared `<hr>` marking where a
  practice's question/prompt ends and the written answer begins. Every
  practice component should use it at that boundary, once — it's the
  consistent signal across 1.1/1.2/1.3 that a reader has moved from "here's
  the exercise" to "here's what I answered."

## Scaffolding caution

`npm create vite@latest . -- --overwrite` **wipes the entire target
directory**, not just conflicting files — it already destroyed the four
notes files above once this session (recovered from VS Code local history).
Never re-run a Vite/CRA scaffold command with an overwrite/force flag
against this directory; if the project needs re-scaffolding, do it in an
empty temp dir and copy files in by hand instead.
