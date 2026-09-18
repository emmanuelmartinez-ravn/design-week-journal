# React/JS conventions

- **Plain JavaScript, not TypeScript.** `.jsx` for anything with markup,
  `.js` for plain data/logic. Don't introduce TypeScript, `.tsx`, or type
  packages — the vendored Vello `.d.ts` files were intentionally left out of
  `src/design-system/` for this reason; each component's `.prompt.md` is the
  prop reference instead.
- **Function components + hooks only.** No class components.
- **No CSS framework.** Styling is Vello tokens (`var(--...)`) plus small
  component-scoped CSS files when a Vello primitive doesn't already cover
  the layout (see `src/index.css` for the pattern — app-level layout only,
  never redefine brand colors/spacing there).
- **Keep it small.** This is a course journal, not a product. Don't add
  routing, global state, data fetching, or a component library beyond Vello
  unless the journal's actual needs outgrow `useState` in `App.jsx`.
- **Package manager: npm.** `package-lock.json` is the lockfile; don't
  introduce yarn/pnpm lockfiles alongside it.
