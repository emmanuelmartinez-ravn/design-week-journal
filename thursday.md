# Rank the hierarchy - and find the tokens behind it.

Open Vello's polished home screen. Note the first three things your eye lands on, in order, and name the mechanism for each (scale, weight, color, position, spacing). Then ask: which of those cues is driven by a design-system **token** (a type scale, a color role) versus a one-off? Where prominence and importance disagree, that's a hierarchy note.

---

## Your Open Request Card

1. Scale: Occupies at least 1/3 of the screen
2. Weight: Uses semibold weight
3. Position: Is centered on the screen
4. Spacing: Has more padding and doesn't share space with other elements

Tokens behind: Size, Text weight, Padding, Margin, Text colors

## Provider card (Maya Rivera example)

1. Scale: Occupies at least 1/3 of the screen
2. Weight: Uses semibold weight
3. Color: Has the biggest image in screen

Tokens behind: Size, Text weight, Role colors, Text colors
One-off: "from $24 / walk" text

## Plus "+" Button (Main action)

1. Scale: Is the biggest button
2. Position: Is in the Nav Bar and centered
3. Color: Is the primary color

Tokens behind: Size, Role colors

# Run the accessibility checks - including semantics.

Take one Vello screen and run four concrete checks. For contrast, paste the two hex values to Claude and ask it to compute the ratio and whether it passes 4.5:1.

**Contrast**: body text vs background - compute the ratio; pass or fail?
**Touch targets**: are tappable elements plausibly 44pt+ (and at least 24×24 CSS px)? Flag any too small.
**Color-alone**: is any meaning carried only by color (e.g., a red-only error)?
**Semantics**: if this were your code, would it be a button or a div-with-onClick? Would focus order and labels be correct?

---

1. Contrast:

Checked every foreground/background pair actually used across the vendored `src/design-system` components against WCAG AA (4.5:1 text, 3:1 large text/non-text UI). Components that fail:

- Badge `warning` (amber-700 on amber-100) — 2.84:1
- Badge `accent` (coral-700 on coral-100) — 4.10:1
- Badge `neutral`, VerifiedBadge `unverified`, Tabs count pill (ink-500 on ink-100) — 4.32:1
- Button `accent` (white on coral-500) — 3.22:1
- BottomNav count badge (white on coral-500) — 3.22:1
- Input placeholder text (ink-400 on white) — 3.30:1
- Input error hint text (red-600 on white) — 4.38:1
- Card `tappable` chevron icon (ink-400 on ink-100) — 2.82:1
- Rating stars, filled and empty (amber-500 / ink-200 on white) — 1.80:1 / 1.47:1
- Focus ring, default and error variant (translucent green/coral haze on white) — ~1.5:1 / ~1.4:1

Everything else passes 4.5:1

2. Touch targets:

- Button `sm` (36px), IconButton `sm` (34×34), Tag chip (~36px tall), EmptyState secondary link (~32px tall) — all clear the 24×24 CSS px minimum but sit under the 44pt target.
- Button `md`/`lg` (46/54px), IconButton `md`/`lg` (44/52px), Tabs (~47px tall), BottomNav item (~52px tall) — all meet 44pt+.
- Tag's remove ("x") icon — 16×16px with no extra padding — fails even the 24×24 minimum. It's its own nested click target (separate `stopPropagation` handler), not just decoration.
- Checkbox's visual box (22×22) and Switch's track (46×28 height) are under 24×24/44pt on their own — only acceptable because both are wrapped in a `<label>` that extends the real hit area across any adjacent label text. An icon-only Checkbox/Switch with no label text would fail outright.

3. Color-alone:

- VerifiedMark/VerifiedBadge — explicitly designed against this: distinct shape per status (shield, star, dashed clock, hollow circle) plus color plus a text label. Passes by design.
- Rating stars — filled vs. empty is color-only in the star row itself (same shape, just amber vs. ink-200), but the component backs it up with a numeric value and an `aria-label` ("X out of Y stars"), so the component as a whole isn't color-alone even though that one visual cue is.
- Input error state — border and hint text turn red, but the hint is replaced with an actual error message string, so the meaning rides on text, not color.
- Badge — every real usage in this app pairs color with a text label, but the component's API doesn't enforce that (a `dot`-only badge with no children would be a pure color status dot). Latent risk, not a current failure.
- My Wednesday 3.1 schema-table badges — `accent` vs `brand` is the _only_ signal distinguishing tables "added to agree with the IA diagram" from originally-planned ones inside that list; no icon or suffix marks it on the badge itself. This is a real color-alone instance in my own content (the callout above names the features in text, but it isn't co-located with each badge).

4. Semantics (WCAG 4.1.2 Name/Role/Value, 2.1.1 Keyboard, 2.4.3 Focus Order, 2.4.7 Focus Visible, 3.3.2 Labels):

- Card (`interactive`/`tappable`) — renders as a plain `<div>` by default: no `role="button"`, no `tabIndex`, no Enter/Space key handler. Classic div-with-onClick: a mouse user sees `cursor: pointer`, a keyboard user can't reach it at all (missing from focus order), a screen reader announces nothing actionable. Should be `as="button"`, or `role="button"` + `tabIndex={0}` + a key handler. **Fails.**
- Tag in static mode (`interactive={false}`) — the inverse problem: still a real `<button>` even when it's meant to be a non-interactive display chip, so it's needlessly focusable and announced as a control that does nothing. Should render a `<span>` when static. **Fails.**
- Input — label is correctly wired via `htmlFor`/`id`, but the hint/error `<span>` has no `aria-describedby` pointing back to the input, so a screen-reader user tabbing in won't hear the hint or error automatically. **Fails.**
- Tabs — has the right `role="tablist"`/`role="tab"`/`aria-selected`, but is missing `aria-controls` + a matching `role="tabpanel"` on the content region, and has no roving-tabindex/arrow-key navigation. **Partial** — operable, but incomplete against the full WAI-ARIA Tabs Pattern.
- Button, IconButton (enforces `aria-label`), Checkbox, Switch, BottomNav, EmptyState's secondary action — all real native elements with correct roles and keyboard operability out of the box. **Pass.**
- ProviderCard — the outer card shows `cursor: pointer` via its `interactive` class but never actually gets an `onClick`/role/tabIndex; the real action lives on the inner `Button`. A false affordance (UX smell) rather than an a11y violation.

# Token or hardcode?

Build intuition for design-system consistency. Give Claude the Vello design system reference and one screen.

Prompt
Here is the Vello design system (its color, type, and spacing tokens)
and one screen. List every visual value on the screen - colors, font
sizes, spacings - and for each, tell me whether it matches a defined
token or is a one-off that breaks the system. Flag the off-system values
as consistency risks, and suggest the token each should map to.

---

Which tokens are actually missing, in general:

- **Border width — genuinely missing.** A hairline border width (commonly ~1.5px) tends to repeat across nearly every interactive component, but token sets often never promote it to a `--border-width-*` variable. It stays a hardcoded magic number instead of a token, even though it's reused everywhere.
- **Component-internal spacing on compact elements (status pills, chips, small badges)** — usually not a missing token so much as an adoption gap: the component's own padding/gap/dot-size values are hardcoded pixels with no reference to the spacing scale at all, even though the scale exists and could cover them.
- **Intermediate type sizes** — a type scale that jumps from one step straight to the next (e.g. 12px to 14px) with nothing between leaves no token to reach for when a design lands in between, so components hardcode an odd in-between size instead.

# DEMO

Audit a Vello component: token fidelity + accessibility.
Your mentor assigns you a Vello screen or component that contains planted issues.
First pass, no AI: note hierarchy, token consistency, and accessibility problems using today's vocabulary. This pass comes first.
Second pass: give Claude the screen and the design system; ask for a structured critique - hierarchy, token consistency, accessibility (contrast, targets, focus, semantics), and missing states.
Compare: what did Claude catch that you missed? What did it miss or get confidently wrong? Resolve every disagreement against the standard or the system.
Starter prompt
Critique this Vello screen against the attached design system. Structure
it as: 1) visual hierarchy, 2) consistency with design-system tokens, 3) accessibility (contrast ratios, touch targets, focus, semantics), 4) missing UI states. For each issue: severity, the evidence, and the
principle or standard it violates. Do not soften findings.

---

Chosen Screen: Post a request form

1. First Pass (No AI)
   - Visual hierarchy fails:
     - none

   - Token consistency fails:
     - Errors is using wrong color (should be --red-600 but uses --red-700)

   - Accessibility fails:
     - Landmarks regions are missing (For example: Post a request header isn't inside a `<header>`)
     - Missing headers
     - Input placeholders contrast ratio fail
     - Chips are small below 24x24px
     - No form element
   - Missing UI states:
     - No unsaved state

2. Second Pass (Claude)
   - Visual hierarchy fails:
     - Groups without weights
     - Budget "per ..." initializes even if a category is not selected
     - Budget and Anything else legends share same styles but they have different purposes

   - Token consistency fails:
     - Spacing off the 4px rhythm
     - There is not a textarea component so it uses input styles
     - AppBar title is using a wrong size

   - Accessibility fails:
     - Contrast ratios fail
     - The legends have no margins
     - Cancel button is smaller than 24x24px
     - Focus is on border, should be on ring
     - Errors miss role="alert"
     - Visible labels doesn't have accessible names
     - Radio behavior chips are exposed to unrelated
   - Missing UI states:
     - No error recovery
     - No submitting state
     - Tab bar shouldn't be available during the task
     - Validation only triggers on submit
     - Indication of which block before submitting
     - Missing attachments on Anything else?
   -
