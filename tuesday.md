# Match the method to the question.

For each Vello question, decide whether you'd reach for qualitative or quantitative research first, and name the method (interview, survey, usability test, analytics). Then add: which answer would change something you'd build - a schema field, an event to log, an endpoint?

1. Why do requesters drop off before completing a booking? _Quantitative_, _Analytics_, _Event to log_
2. What percentage of providers respond within an hour? _Quantitative_, _Analytics_, _None_
3. Can a first-time admin figure out how to approve a provider? _Qualitative_, _Usability test_, _Event to log_
4. What does "trust" actually mean to a Vello requester? _Qualitative_, _Interview_, _None_
5. Which neighborhoods have the most unmet demand? _Quantitative_, _Analytics_, _Event to log_
6. Is our new onboarding flow easier than the old one? _Quantitative_, _Survey_, _None_

---

# Spot the leading question.

Interview quality lives or dies on question wording. Train your ear for it.

Prompt
Here are 6 user-interview questions for Vello. For each, tell me whether
it's well-formed or flawed (leading, hypothetical, double-barreled, or
yes/no), and rewrite the flawed ones. Questions: "Would you use an app
that finds local help?" / "Tell me about the last time you needed help
around the house." / "Don't you think trust is important?" / "How do you
find and pay providers today?" / "What frustrates you about TaskRabbit?"
/ "Would you pay more for a verified neighbor?"

Write your own verdicts first, then compare. Where you disagree, decide who's right and why.

1. "Would you use an app that finds local help?" (Me: yes/no, leading, hypothetical)
2. "Tell me about the last time you needed help around the house." (Me: well-formed)
3. "Don't you think trust is important?" (Me: yes/no, leading)
4. "How do you find and pay providers today?" (Me: well-formed) (Claude: double-barreled)
5. "What frustrates you about TaskRabbit?" (Me: well-formed) (Claude: leading)
   - Presumes you've already used TaskRabbit
6. "Would you pay more for a verified neighbor?" (Me: hypothetical, yes/no)

Rewrites

1. "How do you currently find help when you need it?"
2. "Tell me about the last time you needed help around the house."
3. "What factors are important to you when deciding whether to hire a service?"
4. "How do you find providers today?"
5. "How do you pay providers today?"
6. "What has your experience with TaskRabbit been like?"
7. "How do you decide how much to pay for local services?"

# Audit a synthesis - and extract the entities it implies.

The core skill of the day in miniature. Have Claude synthesize, then try to break it - and pull out the data the themes imply.

Load two or three Vello interview transcripts into Claude.
Ask for the top three themes with supporting quotes and participant IDs.
Pick the theme Claude sounds most confident about and demand the receipts; then ask what objects/attributes the theme implies the system must store.
Audit prompt
For the theme you ranked #1, list every verbatim quote that supports it,
with participant ID and roughly where it appears. Then list any evidence
that contradicts or complicates it. Finally, name the data entities and
attributes this theme implies Vello must model (e.g., a "verification"
on a Provider). If the real support is thinner than your summary, say so.

---

Themes selected:

1. Trust flows through known intermediaries, not platform signals
   Participants sidestepped ratings/certifications in favor of a personal vouch from someone they already trust
2. Trust requirements scale sharply with stakes
   Participants draw a hard line between low-stakes, transactional jobs and anything involving a key or a child
3. The real pain point is reliability and price transparency
   When asked what actually goes wrong, participants consistently pointed to no-shows and unclear pricing rather than safety incidents.

Quotes supporting #1:
P01: "But if you gave me the choice between a man with a certificate who I've never seen before and a man with no certificate who Priya has used for two years, I'm taking Priya's man. Every time. I don't think the certificate is telling me what I actually want to know."
P02: "Denise has known her for four years. She's not going to put her name on someone who's going to rob me... It's a person taking responsibility, that's not the same as a company saying trust us."
P03 Daughter: "I try. But I don't live here, so I'm asking in a group for an area I don't live in, which is a bit odd. Mostly I just search and read reviews and go with a gut feeling. And then I worry about it."

- Data entities/attributes this implies
  Provider
  known_by_requesters: [RequesterID] — explicit list of which specific requesters have hired/vouched for this provider (not an aggregate count)
  verification_status (formal check, e.g. background check/ID) — present but secondary
  VouchOrEndorsement (join entity between Requester and Provider)
  voucher_id, provider_id
  relationship_strength or tenure (e.g., "known 4 years") — P02's data suggests duration/closeness of the voucher's relationship matters, not just existence of a vouch
  usage_count (P01 wants "used him eleven times," not a star average)
  usage_recency/is_ongoing
  Requester–Requester (or Requester–Voucher) relationship graph
  mutual_recognition: boolean — captures P01's "overlap" concept (shared school/shop/paths) rather than raw geographic distance; P02's "three names I actually know" implies a small, explicit trusted-contact list rather than a broad "neighborhood" radius
  network_density per user — P03's household has ~zero edges in this graph, which the model needs to represent as a valid (if degenerate) state, not an error
  Booking/JobHistory
  linked to specific Requester + Provider, queryable by "which of my trusted contacts used this provider" rather than global aggregate rating

# Synthesize Vello's research, then defend it - and list the entities it implies.

Load the full set of Vello interview transcripts into Claude.
Ask for a thematic synthesis: named themes, how many participants raised each, supporting quotes with IDs, and contradictions.
Audit at least two themes back to verbatim evidence. Correct anything overstated. Flag the loud-but-shallow theme if you find one.
Turn the verified themes into two problem statements (who / what / why, no solutions) and a short list of the data entities and states they imply.
Starter prompt
Synthesize these interview transcripts. For each theme: a name, how many
participants mentioned it, 2 verbatim quotes with participant ID, and any
contradicting evidence. Separate what users SAID from what you INFER. Do
not invent quotes. Rank themes by how well the evidence supports them. At
the end, list the data entities/attributes the verified themes imply.

Audited syntesis

Theme 1: Handing over a house key marks the real trust threshold

Mentioned by: 3/6 (P01, P02, P04)

Verbatim quotes:

P01: "Everything else, the price, the schedule, all of that is negotiable, but somebody's got a key."
P02: "And Marta's got a key now, so, yeah... But it is different."
P04: "They leave me the key at the fourth [visit]. You can always tell. The key is the moment."

Contradicting evidence: None found.

Qualification (not a contradiction, a scope limit): P05 (22 years, handyman/repair work) reports never being given a key or asked for anything beyond occasional insurance proof — "Insurance, sometimes, for bigger jobs. Nobody's ever asked me for anything else. In twenty-two years, nobody." P03 also never grants a key, but because she is present for every visit. This suggests the "key moment" is specific to ongoing, unsupervised, in-home services (cleaning, dog-walking, sitting) rather than a universal marker of trust across all provider types.

Theme 2: Star ratings and reviews are considered untrustworthy

Mentioned by: 2/6 (P01, P02) — revised down from 3/6; P04's original quote was miscategorized (it concerns a broken dispute mechanism, not distrust of ratings as a signal)

Verbatim quotes:

P01: "Stars are meaningless, everyone's four point eight."
P02: "Everyone's five stars... either everyone's brilliant or nobody leaves the bad ones."

Contradicting evidence: D (P03's daughter, booking on her behalf) actually relies on reviews as her working method, despite misgivings — "I just search and read reviews and go with a gut feeling. And then I worry about it." This indicates the "reviews are useless" position may be conditional: held by people who have a known local alternative (P01, P02), and abandoned by necessity when no such alternative exists (D, booking outside her own area for her mother).

Related but distinct single-source finding (not part of this theme): P04 describes the review dispute process as broken — "There's a button, I pressed it, nothing happened" — a claim about process fairness, not about whether ratings carry signal.

Data entities/attributes implied by these two verified themes

From Theme 1 (key handover as trust threshold):

Relationship (provider_id, requester_id)
access_granted (bool)
access_type (e.g., key, code, none)
date_access_granted
visit_count_at_time_of_access_grant (P04's "fourth visit" pattern)
supervision_required (bool) — distinguishes P03's supervised-visit case from unsupervised access
service_category (e.g., recurring in-home vs. one-off/on-site trade) — needed to scope when this milestone even applies, per P05's contradiction

From Theme 2 (ratings distrust, conditional on alternatives):

Person/Requester
has_known_local_vouch (bool) — the variable that appears to determine whether ratings are trusted or dismissed
booking_on_behalf_of (nullable, links to beneficiary_id) — needed to capture D's case, since her review-reliance stems from booking outside her own network
Review record
rating_value
is_disputed (bool)
dispute_outcome (kept separate from the rating itself, since this is the process P04 flagged as broken — a distinct data need even though it's not part of the verified theme)
