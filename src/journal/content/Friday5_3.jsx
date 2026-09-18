import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const findings = [
  {
    topic: "Semantic HTML vs div soup",
    verdict: "Fixed",
    variant: "success",
    detail:
      'The rebuild rendered as a generic Card `<div>` — classic div soup for a self-contained provider summary, with no way for assistive tech to identify it as one unit. Fixed in place: `<Card as="article" aria-label="Maya Rivera, dog walker and pet sitter">`. Zero visual change, real landmark now.',
  },
  {
    topic: "Keyboard focus order",
    verdict: "Pass",
    variant: "success",
    detail:
      "Nothing in the card is focusable, and nothing pretends to be — no stray tabIndex, no click handler without a matching role and key handler. That's correct for a static illustration. If this becomes a real tap-through card later, it needs an actual focusable control (a button or link), not just the decorative chevron.",
  },
  {
    topic: "Contrast (AA)",
    verdict: "Fail",
    variant: "danger",
    detail:
      'Three gaps, all inherited from vendored components, none fixable without editing them: the "Available" badge (`Badge variant="accent"`, coral-700 on coral-100) measures 4.10:1, under the 4.5:1 text minimum; Rating\'s filled/empty stars (amber-500 / ink-200 on white) measure 1.80:1 / 1.47:1, under the 3:1 non-text minimum; Card\'s tap-affordance chevron (ink-400 on ink-100) measures 2.82:1, also under 3:1. Same gaps already surfaced project-wide.',
  },
  {
    topic: "Form labels",
    verdict: "N/A",
    variant: "neutral",
    detail: "No form controls in this component.",
  },
  {
    topic: "ARIA — only where needed",
    verdict: "Pass",
    variant: "success",
    detail:
      'Every decorative or non-text piece already carries the right ARIA and nothing more: Card\'s chevron is `aria-hidden`, Avatar\'s fallback initials carry an `aria-label`, the verified mark is `role="img"` with its own `aria-label`, and Rating\'s star row is summarized with an `aria-label` ("X out of Y stars"). Nothing reaches for ARIA where a native semantic already covers it.',
  },
];

export function Friday5_3() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 5.3</p>
      <h2 className="v-h2">Accessibility audit of a generated Vello screen</h2>
      <p className="v-body practice-doc__intro">
        Run the component you just generated through the web.dev and APG
        lens: semantic HTML vs div soup, keyboard focus order, contrast
        (AA), form labels, and correct ARIA only where needed. Fix the
        highest-severity issue.
      </p>

      <PracticeDivider />

      <p className="v-eyebrow practice-doc__label">
        Audited: the 5.2 provider-card rebuild
      </p>
      <div className="practice-qa-list">
        {findings.map((f) => (
          <div className="practice-qa-item" key={f.topic}>
            <p className="practice-qa-item__question">
              <strong>{f.topic}</strong> <Badge variant={f.variant}>{f.verdict}</Badge>
            </p>
            <p className="v-body-sm v-muted">{f.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
