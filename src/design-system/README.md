# Vello design system (vendored)

This directory is a **vendored copy** of the Vello design system's React source,
pulled from the live docs site on 2026-09-17:

https://vello-design-system.vercel.app/

There is no npm package for Vello — the upstream project ships plain source
files meant to be copied into a consuming app (same idea as shadcn/ui). This
copy is that: real `.jsx` component sources with a normal `import React from
'react'`, no CDN globals, no build step of their own.

## What's here

- `styles.css` — global entry point, `@import`s everything in `tokens/`. Linked once from `src/main.jsx`.
- `tokens/` — color, typography, spacing/radii/shadow/motion, and font-loading CSS custom properties.
- `components/` — all 16 components, grouped the same way upstream groups them (`buttons/`, `cards/`, `display/`, `feedback/`, `forms/`, `navigation/`). Each component keeps its `.prompt.md` (usage + variants) alongside it.
- `assets/` — brand SVGs (sprout mark, app icon, wordmark).
- `index.js` — barrel export so app code can do `import { Button, Tabs } from '../design-system'`.

## Using it

```jsx
import { Button, EmptyState } from '../design-system';

<Button variant="primary" size="lg">Book Maya</Button>
```

Icons: components accept an icon as a React node (`leadingIcon={...}`). This
project uses the `lucide-react` npm package instead of upstream's CDN
`<script src="unpkg.com/lucide">` approach, since we have a real bundler:

```jsx
import { CalendarCheck } from 'lucide-react';
<Button leadingIcon={<CalendarCheck size={18} />}>Book now</Button>
```

## Re-syncing from upstream

Upstream has no version/changelog beyond the live site. To pick up changes,
re-fetch the files this folder mirrors (`styles.css`, `tokens/*.css`,
`components/**/*.jsx`, `components/**/*.prompt.md`, `assets/*.svg`) from the
URL above and diff before overwriting — do not hand-edit vendored component
files; if a local change is needed, wrap the component instead.

Full guidance for working with these components lives in
`.claude/rules/design-system.md` at the project root.
