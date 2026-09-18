import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const checks = [
  {
    label: "Contrast",
    detail: "body text vs background — compute the ratio; pass or fail?",
  },
  {
    label: "Touch targets",
    detail:
      "are tappable elements plausibly 44pt+ (and at least 24×24 CSS px)? Flag any too small.",
  },
  {
    label: "Color-alone",
    detail: "is any meaning carried only by color (e.g., a red-only error)?",
  },
  {
    label: "Semantics",
    detail:
      "if this were your code, would it be a button or a div-with-onClick? Would focus order and labels be correct?",
  },
];

const contrastFailures = [
  { component: "Badge `warning`", pair: "amber-700 on amber-100", ratio: "2.84:1" },
  { component: "Badge `accent`", pair: "coral-700 on coral-100", ratio: "4.10:1" },
  {
    component: "Badge `neutral`, VerifiedBadge `unverified`, Tabs count pill",
    pair: "ink-500 on ink-100",
    ratio: "4.32:1",
  },
  { component: "Button `accent`", pair: "white on coral-500", ratio: "3.22:1" },
  { component: "BottomNav count badge", pair: "white on coral-500", ratio: "3.22:1" },
  { component: "Input placeholder text", pair: "ink-400 on white", ratio: "3.30:1" },
  { component: "Input error hint text", pair: "red-600 on white", ratio: "4.38:1" },
  {
    component: "Card `tappable` chevron icon",
    pair: "ink-400 on ink-100",
    ratio: "2.82:1",
  },
  {
    component: "Rating stars, filled and empty",
    pair: "amber-500 / ink-200 on white",
    ratio: "1.80:1 / 1.47:1",
  },
  {
    component: "Focus ring, default and error variant",
    pair: "translucent green/coral haze on white",
    ratio: "~1.5:1 / ~1.4:1",
  },
];

const touchTargets = [
  "Button `sm` (36px), IconButton `sm` (34×34), Tag chip (~36px tall), EmptyState secondary link (~32px tall) — all clear the 24×24 CSS px minimum but sit under the 44pt target.",
  "Button `md`/`lg` (46/54px), IconButton `md`/`lg` (44/52px), Tabs (~47px tall), BottomNav item (~52px tall) — all meet 44pt+.",
  "Tag's remove (\"x\") icon — 16×16px with no extra padding — fails even the 24×24 minimum. It's its own nested click target (separate `stopPropagation` handler), not just decoration.",
  "Checkbox's visual box (22×22) and Switch's track (46×28 height) are under 24×24/44pt on their own — only acceptable because both are wrapped in a `<label>` that extends the real hit area across any adjacent label text. An icon-only Checkbox/Switch with no label text would fail outright.",
];

const colorAlone = [
  {
    component: "VerifiedMark / VerifiedBadge",
    verdict: "Passes",
    variant: "success",
    detail:
      "explicitly designed against this: distinct shape per status (shield, star, dashed clock, hollow circle) plus color plus a text label.",
  },
  {
    component: "Rating stars",
    verdict: "Passes, with a caveat",
    variant: "warning",
    detail:
      "filled vs. empty is color-only in the star row itself (same shape, just amber vs. ink-200), but the component backs it up with a numeric value and an `aria-label` (\"X out of Y stars\"), so the component as a whole isn't color-alone even though that one visual cue is.",
  },
  {
    component: "Input error state",
    verdict: "Passes",
    variant: "success",
    detail:
      "border and hint text turn red, but the hint is replaced with an actual error message string, so the meaning rides on text, not color.",
  },
  {
    component: "Badge",
    verdict: "Latent risk",
    variant: "warning",
    detail:
      "every real usage pairs color with a text label, but the component's API doesn't enforce that — a `dot`-only badge with no children would be a pure color status dot.",
  },
];

const semantics = [
  {
    component: "Card (`interactive` / `tappable`)",
    verdict: "Fails",
    variant: "danger",
    detail:
      'renders as a plain `<div>` by default: no `role="button"`, no `tabIndex`, no Enter/Space key handler. Classic div-with-onClick — a mouse user sees `cursor: pointer`, a keyboard user can\'t reach it at all (missing from focus order), a screen reader announces nothing actionable. Should be `as="button"`, or `role="button"` + `tabIndex={0}` + a key handler.',
  },
  {
    component: "Tag in static mode (`interactive={false}`)",
    verdict: "Fails",
    variant: "danger",
    detail:
      "the inverse problem: still a real `<button>` even when it's meant to be a non-interactive display chip, so it's needlessly focusable and announced as a control that does nothing. Should render a `<span>` when static.",
  },
  {
    component: "Input",
    verdict: "Fails",
    variant: "danger",
    detail:
      'label is correctly wired via `htmlFor`/`id`, but the hint/error `<span>` has no `aria-describedby` pointing back to the input, so a screen-reader user tabbing in won\'t hear the hint or error automatically.',
  },
  {
    component: "Tabs",
    verdict: "Partial",
    variant: "warning",
    detail:
      'has the right `role="tablist"`/`role="tab"`/`aria-selected`, but is missing `aria-controls` + a matching `role="tabpanel"` on the content region, and has no roving-tabindex/arrow-key navigation — operable, but incomplete against the full WAI-ARIA Tabs Pattern.',
  },
  {
    component: "Button, IconButton, Checkbox, Switch, BottomNav, EmptyState's secondary action",
    verdict: "Pass",
    variant: "success",
    detail:
      "all real native elements with correct roles and keyboard operability out of the box (IconButton also enforces an `aria-label`).",
  },
  {
    component: "ProviderCard",
    verdict: "UX smell",
    variant: "warning",
    detail:
      "the outer card shows `cursor: pointer` via its `interactive` class but never actually gets an `onClick`/role/tabIndex; the real action lives on the inner `Button`. A false affordance rather than an a11y violation.",
  },
];

export function Thursday4_2() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 4.2</p>
      <h2 className="v-h2">Run the accessibility checks — including semantics</h2>
      <p className="v-body practice-doc__intro">
        Take one Vello screen and run four concrete checks. For contrast,
        paste the two hex values to Claude and ask it to compute the ratio
        and whether it passes 4.5:1.
      </p>
      <ul className="practice-doc__list">
        {checks.map((c) => (
          <li key={c.label}>
            <strong>{c.label}:</strong> {c.detail}
          </li>
        ))}
      </ul>

      <PracticeDivider />

      <h3 className="v-h3 practice-doc__section">1. Contrast</h3>
      <p className="v-body practice-doc__intro">
        Checked every foreground/background pair actually used across the
        vendored <code className="v-mono">src/design-system</code> components
        against WCAG AA (4.5:1 text, 3:1 large text/non-text UI). Components
        that fail:
      </p>
      <table className="practice-table" data-variant="danger">
        <thead>
          <tr>
            <th>Component</th>
            <th>Pair</th>
            <th>Ratio</th>
          </tr>
        </thead>
        <tbody>
          {contrastFailures.map((f) => (
            <tr key={f.component}>
              <td>{f.component}</td>
              <td>
                <span className="v-mono">{f.pair}</span>
              </td>
              <td>
                <code className="v-mono">{f.ratio}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="v-body practice-doc__intro">
        Everything else passes 4.5:1.
      </p>

      <h3 className="v-h3 practice-doc__section">2. Touch targets</h3>
      <ul className="practice-doc__list">
        {touchTargets.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <h3 className="v-h3 practice-doc__section">3. Color-alone</h3>
      <div className="practice-qa-list">
        {colorAlone.map((c) => (
          <div className="practice-qa-item" key={c.component}>
            <p className="practice-qa-item__question">
              <strong>{c.component}</strong>{" "}
              <Badge variant={c.variant}>{c.verdict}</Badge>
            </p>
            <p className="v-body-sm v-muted">{c.detail}</p>
          </div>
        ))}
      </div>

      <h3 className="v-h3 practice-doc__section">4. Semantics</h3>
      <p className="v-body practice-doc__intro">
        Evaluated against WCAG 4.1.2 (Name, Role, Value), 2.1.1 (Keyboard),
        2.4.3 (Focus Order), 2.4.7 (Focus Visible), and 3.3.2 (Labels).
      </p>
      <div className="practice-qa-list">
        {semantics.map((s) => (
          <div className="practice-qa-item" key={s.component}>
            <p className="practice-qa-item__question">
              <strong>{s.component}</strong>{" "}
              <Badge variant={s.variant}>{s.verdict}</Badge>
            </p>
            <p className="v-body-sm v-muted">{s.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
