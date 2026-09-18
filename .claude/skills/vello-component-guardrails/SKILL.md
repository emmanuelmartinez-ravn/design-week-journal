---
name: vello-component-guardrails
description: Guardrails for building or regenerating a Vello component or screen from a reference export — bans hardcoded values, enforces the accessibility floor, and gates completion on a diff against the reference. Use when the user asks to build, generate, or regenerate a component/screen from a design export, spec sheet, or screenshot.
---

Token, component, and voice rules live in `.claude/rules/design-system.md`;
the fuller guardrail (banned values, a11y floor, Vello's trust bet) lives in
`.claude/rules/component-generation.md`. This skill doesn't restate either —
it's the sequence that applies them and the gate that catches what they miss.

## Steps

1. **Build with tokens only.** Every color, spacing, radius, and type value
   traces to a token or an existing shared class — no `style={{...}}`, no
   `#hex`/`rgb()`, no raw ramp token where a semantic alias resolves to the
   same value. Done when a grep for those three patterns in your diff comes
   back empty.

2. **Meet the accessibility floor.** Semantic element (or `as`/`aria-label`)
   over an anonymous `<div>`; no false affordance (a hover/tap cue with
   nothing keyboard-reachable behind it); ARIA only where a native semantic
   doesn't already cover it. Done when every interactive-looking element is
   either genuinely operable or stripped of the cue that implied it was.

3. **Flag the trust-scales-locally tension.** If what you're building
   surfaces a trust or reputation signal, check it against Vello's stated
   bet against anonymous aggregate ratings. Don't silently redesign the
   component to match the bet — name the tension in your write-up if the
   reference itself still shows a bare aggregate. Done when this step is
   either not applicable, or the tension is written down somewhere the
   reader will see it.

4. **Diff against the reference.** Render the component and go through the
   reference property by property — every one, not just the ones that
   look off. Each gets an outcome: exact match, rounded to the nearest
   token step, or a flagged gap with the reason. Done when every property
   has one of those three outcomes and none were silently skipped because
   they "looked close enough."
