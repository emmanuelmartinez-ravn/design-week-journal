# Working with the Vello design system

Source of truth: https://vello-design-system.vercel.app/ (docs at `/docs/index.html`).
Vendored copy: `src/design-system/` (see its own `README.md` for provenance
and re-sync instructions).

Vello has **no npm package** — it ships as copyable component source, the
same model as shadcn/ui. Never `npm install` a package named "vello" or
similar; the components already live in this repo.

## Importing

```jsx
import { Button, Card, EmptyState, Tabs } from '../design-system';
```

Everything is a named export from `src/design-system/index.js`. Don't import
directly from `components/**/*.jsx` paths in app code — go through the
barrel so the vendor internals can move without breaking callers.

## Icons

Components take icons as React nodes (`leadingIcon`, `icon`, etc.), not
strings. Use `lucide-react` (already a dependency) instead of upstream's
CDN `<script src="unpkg.com/lucide">` + `data-lucide` approach — that's a
docs-site-only pattern for a build-less demo page, not for a bundled app.

```jsx
import { CalendarCheck } from 'lucide-react';
<Button leadingIcon={<CalendarCheck size={18} />}>Book now</Button>
```

Lucide is the standard icon set for this brand; don't introduce a second
icon library.

## Tokens — always use them, never hardcode

Colors, spacing, radii, shadows, motion, and type are CSS custom properties
from `src/design-system/tokens/*.css`, loaded once via
`src/design-system/styles.css` (imported in `src/main.jsx`). Reference the
**semantic aliases** in app code, not the raw ramps:

- Surfaces: `--color-bg`, `--surface-card`, `--surface-sunken`
- Text: `--text-strong`, `--text-body`, `--text-muted`, `--text-brand`
- Brand actions: `--brand-primary`, `--brand-primary-hover`, `--accent`
- Borders: `--border-default`, `--border-strong`, `--border-focus`
- Spacing: `--space-1` … `--space-32` (4px base rhythm)
- Radii: `--radius-md` (inputs), `--radius-lg` (cards), `--radius-pill` (chips/CTAs)
- Type: `--font-display` (Bricolage Grotesque, headings), `--font-sans`
  (Hanken Grotesk, body/UI), `--font-mono` (JetBrains Mono, prices/dates/data)

Raw ramps (`--green-600`, `--ink-700`, etc.) exist for one-off needs only —
prefer the semantic name.

## Components available

`Button`, `IconButton`, `Input`, `Checkbox`, `Switch`, `Avatar`, `Badge`,
`Tag`, `Rating`, `VerifiedMark`/`VerifiedBadge`, `Card`, `ProviderCard`,
`Tabs`, `BottomNav`, `ScrollRow`, `EmptyState`.

Each has a `.prompt.md` next to its source in `src/design-system/components/`
with usage examples and variant/prop notes — read that before using an
unfamiliar component rather than guessing props.

## Brand voice (applies to any copy you write in the app)

Warm, plain-spoken neighbor, not a marketplace — this is Vello's in-character
voice, and the journal UI should stay consistent with it for anything that
isn't your own journal content:
- Sentence case everywhere (never Title Case buttons/headings).
- Second person ("you"), first person plural for Vello ("we").
- Concrete over generic — real numbers, real specifics.
- No emoji in UI copy. Sparing em dashes/exclamations, not marketing throat-clearing.

## Do / don't

- Do use `--brand-primary` (olive) for the main action on a screen; reserve
  `--accent` (persimmon) for one secondary/urgent moment, not every button.
- Do use `Card`'s `tappable` prop for whole-card-tap surfaces that don't
  already have an explicit button (e.g. `ProviderCard` skips it — it has one).
- Don't add a second design system, a CSS framework (Tailwind, MUI, etc.), or
  inline hex colors — everything goes through Vello tokens and components.
- Don't edit files under `src/design-system/components/`; if a component
  needs different behavior, wrap it in `src/journal/` instead.
