# Generating or regenerating a Vello component

Guardrails for the moment you're asked to build a screen or component from
a reference export, not just write journal copy about one. Token and
component rules already live in `.claude/rules/design-system.md` — this
file doesn't repeat them, it adds what that file doesn't cover: the
hardcode ban as an enforcement checklist, the accessibility floor, Vello's
product bet, and the gate before you call anything done.

## Banned hardcoded values

Before treating a component as finished, grep your own diff for:

- Any `#`/`rgb(`/`rgba(` literal, or an inline `style={{...}}`. Zero
  tolerance — a token or a shared class covers it, or it's a genuine
  one-off (say so, don't silently hardcode).
- A raw ramp token (`--green-700`, `--coral-100`, etc.) where a semantic
  alias resolves to the same value. Ramp tokens are for the rare case
  where no semantic alias fits — not a default.
- A pixel value that lands exactly on an existing spacing/radius/type step
  but was typed as a number instead of `var(--space-*)` /
  `var(--radius-*)` / `var(--text-*)`. Same visual result, but it stops
  tracking the token if the scale ever changes.

## Accessibility floor

- **Semantic HTML over div soup.** A repeating, self-contained content
  unit (a card, a list row) gets a real element or an accessible name —
  `as="article"` plus `aria-label`, not an anonymous `<div>`.
- **No false affordances.** If it looks tappable (cursor, chevron, hover),
  it must be reachable and operable by keyboard. If it's a static
  illustration with no real action behind it, don't dress it up as
  interactive — no `interactive` prop, no invented `onClick`.
- **ARIA only where a native semantic doesn't already cover it.** Decorative
  glyphs get `aria-hidden`; anything conveying information a sighted user
  gets for free (an icon-only status, a star rating) gets an `aria-label`
  — and nothing gets ARIA it doesn't need.
- **Contrast (AA)** — check every new color pairing you introduce. A
  failure that's baked into a vendored component (can't edit
  `src/design-system/components/`) gets *named* as a known exception, not
  silently shipped and not silently "fixed" by picking an off-token color.

## Vello's bet: trust scales locally

Vello's stated v1 position (see `MondayDemo.jsx`'s two documented
pushbacks) is that a global star-rating average reads as "anonymous
platform," which is exactly what Vello is against — trust should come
from neighbor-adjacency (who around you actually vouches for this
person), not an aggregate score. When a component you're building
surfaces trust/reputation, that's a flag to raise, not a silent redesign:
name the tension if the reference screen you're matching still shows a
bare aggregate rating. Fidelity to the reference wins for *this* pass;
the product note goes in the write-up, not into a component that no
longer matches what you were asked to reproduce.

## Before declaring it done

Render the component and compare it against the reference screen
directly — side by side, not from memory. Every property in the spec
sheet needs an outcome: exact match, a named rounding to the nearest
token step, or a flagged gap. "Looks close" is not a stopping point;
walking the spec sheet line by line is.
