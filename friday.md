# Spec it without an inspect panel.

Open the Vello home screen export next to the design system. Pick one component - the provider card is a good one. Write the spec yourself: for every visual property (background, text color, type family and size, weight, spacing, corner radius, the walk-time chip, the rating stars) name the value you observe and the token it should map to. Where you can't resolve a value to a token, don't guess. Mark it unresolved and write the question you'd ask the designer.

---

Provider card — component spec

## 1. Container

| Property      | Computed value        | Token                      |
| ------------- | --------------------- | -------------------------- |
| background    | `#FFFFFF`             | `--surface-card`           |
| border        | `1.5px solid #E5E4D6` | `--border-default`         |
| corner radius | `20px`                | `--radius-lg`              |
| padding       | `15px`                | none — `--space-4` is 16px |

---

## 2. Avatar

| Property      | Computed value | Token           |
| ------------- | -------------- | --------------- |
| size          | `64 × 64px`    | none —          |
| corner radius | `999px`        | `--radius-pill` |

---

## 3. Name

| Property    | Computed value      | Token                          |
| ----------- | ------------------- | ------------------------------ |
| type family | Bricolage Grotesque | `--font-display`               |
| type size   | `17px`              | none — scale runs 16 / 18 / 20 |
| weight      | `700`               | `--fw-bold`                    |
| colour      | `#1B1C18`           | `--text-strong`                |

---

## 4. Availability pill

| Property      | Computed value | Token           |
| ------------- | -------------- | --------------- |
| type family   | Hanken Grotesk | `--font-sans`   |
| type size     | `12px`         | `--text-xs`     |
| weight        | `600`          | `--fw-semibold` |
| text colour   | `#C5421F`      | `--coral-700`   |
| background    | `#FCE3D9`      | `--coral-100`   |
| corner radius | `999px`        | `--radius-pill` |

---

## 5. Bio line

| Property  | Computed value | Token                      |
| --------- | -------------- | -------------------------- |
| type size | `13.5px`       | none — `--text-sm` is 14px |
| colour    | `#3D3F37`      | `--text-body`              |

---

## 6. Price

| Property    | Computed value | Token           |
| ----------- | -------------- | --------------- |
| type family | JetBrains Mono | `--font-mono`   |
| type size   | `14px`         | `--text-sm`     |
| weight      | `600`          | `--fw-semibold` |
| colour      | `#1B1C18`      | `--text-strong` |

---

## 7. Walk-time chip

| Property      | Computed value | Token           |
| ------------- | -------------- | --------------- |
| type family   | JetBrains Mono | `--font-mono`   |
| type size     | `12px`         | `--text-xs`     |
| weight        | `600`          | `--fw-semibold` |
| text colour   | `#466621`      | `--green-700`   |
| background    | `#F5F8EC`      | `--green-50`    |
| corner radius | `999px`        | `--radius-pill` |

---

## 8. Rating stars

| Property      | Computed value                              | Token                                           |
| ------------- | ------------------------------------------- | ----------------------------------------------- |
| star size     | `1em`                                       | `--text-sm`                                     |
| filled colour | `#F4B740`                                   | `--amber-500`                                   |
| empty colour  | `#D6D6C6`                                   | `--ink-200`                                     |
| numeric value | JetBrains Mono 600, `#1B1C18`, tabular-nums | `--font-mono`, `--fw-semibold`, `--text-strong` |

---

## 9. Tap affordance

| Property      | Computed value                          | Token           |
| ------------- | --------------------------------------- | --------------- |
| size          | `26 × 26px`                             | none            |
| position      | `absolute`, `top: 14px` / `right: 14px` | none            |
| corner radius | `999px`                                 | `--radius-pill` |
| icon colour   | `#8D8F80`                               | `--ink-400`     |
| background    | `#EFEEE1`                               | `--ink-100`     |

# Generate, then audit for token fidelity.

Give Claude the screen export, the design system, and your spec sheet, and have it generate the component. Claude Code if you have it, a Claude artifact if you don't - the audit is identical either way. Then audit the output against your spec: did it reference tokens or hardcode hex values? Did it preserve spacing and states, or round everything to the nearest 8? Did it invent a hover state nobody specified? Fix at least one thing it got wrong.

---

# Accessibility audit of a generated Vello screen.

Run the component you just generated, or the request-detail screen your mentor shares, through the web.dev and APG lens: semantic HTML vs div soup, keyboard focus order, contrast (AA), form labels, and correct ARIA only where needed. Fix the highest-severity issue.

---

# Turn the design system into guardrails.

Translate Vello's design-system rules and the "trust scales locally" bet into a reusable guardrail - a CLAUDE.md, a Skill, or the custom instructions on a Claude project, whichever you have: which tokens to use, banned hardcoded values, the a11y baseline, and a "compare the render against the reference screen before declaring it done" step. Then regenerate Practice 5.2's component with it active and see if drift drops.

---

# DEMO

Implement one Vello component end-to-end with AI assistance, then prove it's faithful to the system. The deliverable is the component plus a short design fidelity audit: where the AI honored the design system, where it drifted, where it failed accessibility, and how you corrected each. Present it on Demo day.
