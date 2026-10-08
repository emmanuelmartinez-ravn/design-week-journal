# Fixes applied from the Design Week feedback review

Source review: `feedback-review.md` (written against commit `700220e`).
Fixes landed on branch `friday-checklists` in `f239bc1`, `6510e04`,
`3f6062d` and `b2d931f`. Feedback point numbers (#1–#6) refer to the review.

Tabs with no changes are left out: Monday 1.2 and Demo; Tuesday 2.3;
Wednesday 3.1, 3.2 and 3.3; Thursday 4.2; Friday 5.3 and 5.4.

---

## Monday

### 1.1 (`Monday1_1.jsx`)

- **#6 Why:** new "What separates the four, from Product down to Visual"
  list, with one line on what each layer decides.
- **Relabel:** dog-walking launch scope changed from UX to Product. The
  first attempt stays on the page, struck through, with a "Relabelled" note
  explaining the change.

### 1.3 (`Monday1_3.jsx`)

- **#2 Checklist seed:** new five-phase table, phase → my contribution → my
  failure mode, for Discover, Define, Architect, Design and Validate. This
  feeds the Friday engineering design-support checklist.

---

## Tuesday

### 2.1 (`Tuesday2_1.jsx`)

- **#6 Why:** new "What separates the two" list: quantitative tracks
  numerical metrics, qualitative tracks experiences and behaviors.
- **Relabel:** the drop-off question is now Qualitative / usability test
  (was Quantitative / analytics). The onboarding comparison uses a usability
  test instead of a survey.

### 2.2 (`Tuesday2_2.jsx`)

- **#6 Why:** a "Who's right" verdict on each disputed question (the
  double-barreled find/pay question; the leading TaskRabbit question).

### Demo (`TuesdayDemo.jsx`)

- **#5b Theme 1 contradictions:** "None found" replaced with three, each
  backed by a transcript quote:
  - P02's key was handed over on a vouch alone ("Denise vouched for her").
  - P01 booked an unknown sitter under pressure.
  - P01 draws the line at children as much as at keys.
- **#5b P03:** "never grants a key" is now marked *Inferred, not said*.
- **#5b Theme 2:** P04's dispute quote moved out into a separate "related but
  distinct finding" (no recourse against unfair reviews, backed by P05). The
  count is revised from 3/6 to 2/6. Added P01's "based on reviews, and she
  was great" as a further contradiction.
- **#5b Loud but shallow: safety and vetting:** new section. P02's loud ask
  for vetting is set against their own behavior and against P01, P05 and D.
  It names what's underneath: reliability and price transparency (the
  Theme 3 from `tuesday.md`, and the likely "lost correction" in #3).
- **#1 Problem statements:** new section with one who / what / why statement
  per verified theme, no solutions in them.
- **#1 States:** new "States implied by the themes" section. Each state is
  tagged Said or Inferred and comes with its evidence:
  - Home access: `none → on_trial → granted → revoked` (+ `not_applicable`)
  - Review dispute: `published → disputed → upheld | amended | removed`
  - Booking: `requested → quoted → confirmed → completed | no_show |
    cancelled` (side path `repriced_on_site`)
- **#1 Entities aligned with states:** `access_granted` became
  `access_state`, and `is_disputed` + `dispute_outcome` became
  `dispute_state`. New **Booking / JobHistory** entity (`status`,
  `confirmed_window`, `quoted_amount`, `final_amount`) from the
  loud-but-shallow finding.
- **#6 Why:** every entity attribute gets a one-line reason. For example,
  `visit_count_at_time_of_access_grant` captures P04's fourth-visit
  pattern, and a zero captures P02's vouch.

---

## Wednesday

### Demo (`WednesdayDemo.jsx`)

- **#6 Why:** reason for choosing "post a request": it's core to the
  requester flow and has to be quick to fill in completely.

---

## Thursday

### 4.1 (`Thursday4_1.jsx`)

- **#6 Why:** a "Why #1" line: the top element outranks the provider card
  on position (centered on screen vs. at the bottom).

### 4.3 (`Thursday4_3.jsx`)

- **#4 Rewritten around Vello:** the title changed from "...in general" to
  "Which tokens are missing on Vello's home screen (provider card)".
- Each finding now has **Observed / Closest Vello token / Why it matters**
  (#6):
  - Border width: 1.5px hardcoded in Card, ProviderCard and Tag; Vello has
    no border-width token.
  - Chip and pill spacing: the paddings and gaps in Badge and Tag (9, 5, 7
    and 14px) sit off the spacing scale.
  - Type sizes: name 17px, bio 13.5px, Badge md 13px; the scale has no
    matching steps.
  - **New:** card padding drift. The screen uses 15px, ProviderCard 16px,
    and Card 14, 20 or 28px.

### Demo (`ThursdayDemo.jsx`)

- **#6 Why:** "Why the second pass found more": Claude checked each value
  on the screen against the token definitions.

---

## Friday

### 5.1 (`Friday5_1.jsx`)

- **#5a Designer questions:** an "Ask the designer" line under every
  unresolved row (6 in total): container padding, avatar size, name size,
  bio size, tap affordance size and tap affordance position.
- **#5a Semantic aliases over ramp tokens**, used where the alias resolves
  to the same value: `--coral-100` → `--accent-tint`, `--green-700` →
  `--text-brand`, `--amber-500` → `--rating`, `--ink-400` →
  `--text-subtle`, `--ink-100` → `--surface-sunken`.
- **#5a Needs alias:** the rows kept on the ramp (`--coral-700`,
  `--green-50`, `--ink-200`) get a badge and a note on which alias Vello is
  missing.
- **#6 Why:** a reason on every resolved row, especially the close calls
  (e.g. why `--surface-card` over the other aliases that resolve to
  `#FFFFFF`).
- Walk-time chip tint cross-referenced with the 5.2 build
  (`--success-tint`).

### 5.2 (`Friday5_2.jsx`)

- Tint note aligned with 5.1 (the same `--success-tint` reasoning).

### Demo (`FridayDemo.jsx`, `src/index.css`)

- The Messages badge on BottomNav now uses `--brand-primary`, set by a
  scoped className override, so the vendored component stays unedited. The
  finding changed from "Gap found" to "Fixed".

### Checklists (`FridayChecklists.jsx`): new tab

- **#2:** the tab is new, registered in `days.js` and `practiceContent.js`.
- **Handoff checklist:** 9 items, each tagged with its source practice:
  - every value is a token or comes with a designer question
  - roundings are written down, and the designer picks when two steps tie
  - no hardcoded values
  - every state is specified, and assumptions are checked
  - missing components are flagged
  - vendored gaps are fixed from outside the component
  - the accessibility floor is met
  - the render is compared side by side with the reference
- **Engineering design-support checklist:** one item per phase, seeded from
  the Monday 1.3 table and written to avoid that row's failure mode. More
  items grew from Tuesday, 3.3, Wednesday, 4.2, 4.3, 5.1 and 5.4.
