---
name: ui-consistency-audit
description: Design-drift audit across this app's rendered screens — flags where token usage, component choices, spacing rhythm, or copy/voice diverge from the rest of the app or from the vendored Vello design system. Use when the user asks to check UI/design consistency across pages, or review a new/changed screen against the established pattern before merging.
---

This app has no router — every "screen" is a day × practice pair reached
through the two levels of `Tabs` in `src/App.jsx` (the day list in
`src/journal/days.js`, each day's `practices` array). A screen with no
`src/journal/practiceContent.js` entry renders a bare `EmptyState` and isn't
worth auditing — only compare screens that have real content.

The system's own rules — tokens, components, voice — live in
`.claude/rules/design-system.md`. This skill doesn't restate them; it checks
the rendered app against them.

## Steps

1. **Enumerate screens.** List every day/practice pair that has an entry in
   `practiceContent.js`. Done when every populated practice is on the list,
   not just the ones that looked interesting.

2. **Render each one.** Use the `run` skill to launch the dev server and
   drive a headless browser to each screen (day tab → practice tab),
   capturing a screenshot per screen. If no renderer is available in this
   environment, stop and say so — findings here depend on seeing the page,
   not guessing from JSX. Done when a screenshot exists for every screen
   from step 1.

3. **Compare every screen against baseline, on every dimension.** Baseline
   priority: `.claude/rules/design-system.md` first; where it's silent, the
   pattern the *other* screens agree on. A screen matching neither is drift.
   Two screens disagreeing with each other while neither contradicts the
   system are both drift candidates — flag the disagreement, don't pick a
   winner.
   - **Token usage** — a hardcoded color/spacing/radius/font where a token
     applies; a raw ramp value (`--green-600`) where a semantic alias exists
     (`--brand-primary`); the same semantic role pulling different tokens on
     different screens.
   - **Component reuse** — a pattern (empty state, badge/tag, card, divider)
     built with raw markup on one screen and the design-system component on
     another; the same component given inconsistent props for the same
     semantic role (e.g. a `Badge` variant chosen differently for one meaning).
   - **Spacing rhythm** — padding/margin off the 4px scale; structurally
     identical containers spaced differently; misaligned lists/grids that
     share a structure elsewhere.
   - **Copy & voice** — casing drift (Title Case vs sentence case), one
     concept named two different things, tone drift from the brand-voice
     rules.
   Done when every rendered screen has been checked against all four
   dimensions, not just the one an obvious diff jumps out on.

4. **Report.** Group findings by dimension. Each finding: which screens,
   what the drift is, which side is the baseline and why. A dimension with
   no drift gets stated as clean, not omitted — silence reads as unchecked.
   Done when every finding from step 3 appears exactly once and all four
   dimensions are accounted for.
