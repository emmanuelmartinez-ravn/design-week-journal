# IA to schema, from memory.

Without looking at Vello's screens, sketch a simple site map for the Requester role: top-level sections and what lives under each. Then, beside it, draft the tables you'd expect - entities, key columns, and the foreign keys that connect them. Mark where the IA structure and your schema agree and where they'd diverge.

---

users id, name, email, role, verified_status neighborhood_id → neighborhoods.id (primary/home neighborhood)
neighborhoods id, name, geo_scope —
user_neighborhoods id, status (joined/pending/rejected) user_id → users.id; neighborhood_id → neighborhoods.id
addresses id, label, street, city user_id → users.id
provider_profiles id, category, bio, rating_avg user_id → users.id
services id, category, description, price, photos provider_id → provider_profiles.id
requests id, status, created_at, scheduled_at requester_id → users.id; service_id → services.id; accepted_quote_id → quotes.id
quotes id, price, availability, status request_id → requests.id; provider_id → provider_profiles.id
conversations id, created_at requester_id → users.id; provider_id → provider_profiles.id; request_id → requests.id (nullable)
messages id, body, sent_at conversation_id → conversations.id; sender_id → users.id
payment_methods id, type, last4, is_default user_id → users.id
payments id, amount, status, paid_at request_id → requests.id; payer_id → users.id; payment_method_id → payment_methods.id
reviews id, rating, comment, created_at request_id → requests.id; reviewer_id → users.id; reviewee_id → provider_profiles.id
notifications id, type, read_at user_id → users.id; request_id → requests.id (nullable)

Original lacks: payments, notifications, messaging, quotes

# Break a happy path → derive the API states.

Generate a deliberately naive flow, then turn everything it skips into a state-and-response contract.

Prompt
Give me the simplest possible happy-path flow for a Vello requester
booking a provider: just the screens where everything goes right, no
edge cases. Keep it to 5-6 steps.
On your own, list every state and branch it ignores - empty, error, loading, permission, cancellation, timeout, "provider unavailable" - aim for 8+. For each, write the API response (status + shape) and the UI state it drives. Then ask Claude for its list and compare.

---

## Happy path

| State                    | Trigger                                    | API status               | UI                                                    |
| ------------------------ | ------------------------------------------ | ------------------------ | ----------------------------------------------------- |
| Home — success           | App opens, providers fetched               | `200 OK`                 | Page — provider/service list rendered                 |
| Service detail — success | Taps a provider/service card               | `200 OK`                 | Page — full service info, ratings, price              |
| New booking form — idle  | Taps "Request"                             | — (no call yet)          | Page — empty form ready for input                     |
| New booking — submitted  | Submits valid form                         | `201 Created`            | Page — redirects to booking detail (status: pending)  |
| Booking — accepted       | Provider responds, requester accepts quote | `200 OK` (PATCH accept)  | Page — booking detail updates, "Pay now" CTA appears  |
| Payment — success        | Confirms payment                           | `200 OK` / `201 Created` | Modal — processing overlay, then success confirmation |
| Rating — submitted       | Submits rating/review                      | `201 Created`            | Modal — rating sheet closes, confirmation toast       |

## Empty (no data yet)

| State                           | Trigger                                 | API status                     | UI                                                                 |
| ------------------------------- | --------------------------------------- | ------------------------------ | ------------------------------------------------------------------ |
| Home — empty                    | App opens, no providers in neighborhood | `200 OK` `{providers: []}`     | Page — empty-state illustration + CTA (expand radius)              |
| New booking form — empty submit | Submits form with no fields filled      | `422 Unprocessable Entity`     | Inline — validation errors on each required field, form stays open |
| Booking — no response           | Provider doesn't respond within window  | `200 OK` `{status: "expired"}` | Page — banner "No response yet," option to cancel or re-post       |

## Loading (waiting)

| State                    | Trigger                              | API status  | UI                                                |
| ------------------------ | ------------------------------------ | ----------- | ------------------------------------------------- |
| Home — loading           | App opens, fetch in progress         | _(pending)_ | Page — skeleton/spinner over card list            |
| Service detail — loading | Taps card, fetch in progress         | _(pending)_ | Page — skeleton/spinner in place of content       |
| Messages — loading       | Opens thread, fetching history       | _(pending)_ | Panel — spinner inside chat panel, input disabled |
| Payment — loading        | Confirms payment, awaiting processor | _(pending)_ | Modal — blocking spinner overlay, no dismiss      |

## Error (something failed)

| State                    | Trigger                         | API status                  | UI                                                                   |
| ------------------------ | ------------------------------- | --------------------------- | -------------------------------------------------------------------- |
| Home — error             | Provider fetch fails            | `500 Internal Server Error` | Page — error message + retry button, no cards shown                  |
| Service detail — error   | Detail fetch fails              | `500 Internal Server Error` | Page — error message + retry button                                  |
| New booking form — error | Submits invalid data            | `422 Unprocessable Entity`  | Inline — field-level errors, form stays open, no navigation          |
| Messages — error         | Send or load fails              | `500` / network timeout     | Panel — inline error banner in chat, retry option per failed message |
| Payment — error          | Card declined / processor fails | `402 Payment Required`      | Modal — error message, not charged, retry or change method           |
| Rating — error           | Rating submission fails         | `500 Internal Server Error` | Modal — error message, sheet stays open, retry enabled               |

## Partial (some data)

| State                             | Trigger                                        | API status                             | UI                                                                |
| --------------------------------- | ---------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------- |
| Home — partial                    | Provider data missing fields (e.g. photos)     | `200 OK` (nulls present)               | Page — cards render with placeholder image/fallback text          |
| Service detail — partial          | Provider info incomplete                       | `200 OK` (nulls present)               | Page — missing fields show "Not provided" placeholder             |
| New booking form — partial submit | Submits with some required fields missing      | `422 Unprocessable Entity`             | Inline — same as error state; field-level errors, form stays open |
| Messages — partial                | Some messages fail to persist, gaps in history | `200 OK` (partial)                     | Panel — failed messages marked "not sent," rest of thread intact  |
| Rating — partial                  | Submits rating only, or review only            | `201 Created` (optional field allowed) | Modal — accepted as valid, confirmation shown                     |

## Cancellation / mid-flow disruption

| State                                         | Trigger                                               | API status                                                           | UI                                                                                        |
| --------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Booking — cancelled by requester (pre-accept) | Requester cancels before any provider accepts         | `200 OK` (PATCH cancel)                                              | Page — booking marked cancelled, returns to Home                                          |
| Booking — cancelled by provider (post-accept) | Provider cancels/goes unavailable after accepting     | `200 OK` pushed via poll/webhook `{status: "cancelled_by_provider"}` | Banner — booking detail shows cancellation reason, routed back to Service detail / browse |
| Quote — expired mid-review                    | Requester takes too long to accept, quote times out   | `200 OK` `{status: "expired"}`                                       | Page — quote marked expired, prompt to request again                                      |
| Payment — abandoned by requester              | Requester backs out of checkout before confirming     | — (no call made, or `DELETE` on payment intent)                      | Modal — closes without charge, booking stays in "accepted, unpaid" state                  |
| Payment — session expired mid-checkout        | Auth token expires between accepting quote and paying | `401 Unauthorized`                                                   | Redirect — to Login, then deep-links back into Payment on success                         |
| Payment — cancelled post-charge (refund)      | Requester or provider cancels after payment succeeded | `200 OK` (PATCH refund) `{status: "refunded"}`                       | Page — booking marked cancelled/refunded, transaction history updated                     |
| Messages — thread closed on cancellation      | Booking cancelled while a chat thread is open         | `200 OK` pushed event                                                | Panel — thread shows "This booking was cancelled" banner, input disabled                  |

# Objects to tables.

Make the IA-to-data-model bridge concrete.

Prompt
Based on Vello's product brief, list the 6-8 core "objects" in the
product. For each, give its key attributes and its relationships to the
other objects. Then show the same set as a simple relational data model.
Flag any place where the UX structure and the data model might disagree.
Check the relationships against the brief yourself. Does a Booking belong to one Request or many? Can a Provider serve more than one Neighborhood? Where the brief is silent, note it as an open question.

---

## Relational model

| Table               | Key columns                           | Foreign keys                                                                         |
| ------------------- | ------------------------------------- | ------------------------------------------------------------------------------------ |
| `users`             | id, name, role, verified_status       | neighborhood_id → neighborhoods.id                                                   |
| `neighborhoods`     | id, name, geo_scope                   | —                                                                                    |
| `provider_profiles` | id, category, bio, rating_avg         | user_id → users.id; neighborhood_id → neighborhoods.id                               |
| `services`          | id, category, description, base_price | provider_id → provider_profiles.id                                                   |
| `bookings`          | id, status, scheduled_at              | requester_id → users.id; service_id → services.id; accepted_quote_id → quotes.id     |
| `quotes`            | id, price, availability, status       | booking_id → bookings.id; provider_id → provider_profiles.id                         |
| `messages`          | id, body, sent_at                     | booking_id → bookings.id; sender_id → users.id                                       |
| `payments`          | id, amount, status                    | booking_id → bookings.id; payer_id → users.id                                        |
| `reviews`           | id, rating, comment                   | booking_id → bookings.id; reviewer_id → users.id; reviewee_id → provider_profiles.id |

## Where UX structure and data model disagree

- **Messages scoped by `booking_id`, but the IA nested chat under "Pending bookings" specifically.** The schema has no concept of "pending" vs. "accepted" chat — a `messages` row just belongs to a booking, full stop. If a requester should be able to message a provider after the job is complete (to ask a follow-up, dispute something), the IA placement wouldn't support that, but the schema would.

# DEMO

Pick one Vello core task: post a request, respond as a provider, or verify a provider as admin.
Ask Claude to draft the full user flow as a diagram artifact - every screen, decision point, and system state, with assumptions marked.
Stress-test it: "what if the provider never responds?", "where can the requester cancel?", "what does the admin see if verification fails?" Make Claude revise until the unhappy paths are covered.
Translate the revised flow into a state table per screen and a list of endpoints with their response states. Name one gap between the flow and Vello's current screens.
Starter prompt
Draft a user flow for [task] in Vello as a flowchart. Include every
screen, user decision, and system state - loading, error, empty, success.
Mark assumptions with [ASSUMPTION] so I can verify them against the brief.
Then turn it into a state table (state -> trigger -> API status -> UI) and
a list of endpoints with their states.

---

Legend: blue = screen, amber = loading, gray = decision, red = error, purple = empty, green = success/terminal.

# Assumptions to verify against the brief

- [ASSUMPTION] Form loading fetches categories/providers — the brief doesn't say whether the request form is pre-populated with category/provider data or just free text.
  - [RESPONSE] The brief contains some categories as Cleaning, Handyman, etc. These doesn't exist in the mocked schema, so they should be added to the schema.
- [ASSUMPTION] A "match check" happens right after posting — assuming the system checks for nearby providers immediately and can show an empty state before the request even goes live. Equally plausible a request just posts and providers respond (or don't) with no explicit "no matches" screen.
  - [RESPONSE] The brief doesn't contain a "match check" step, after posting the request it just posts and providers respond, this could be a feature in a future iteration.
- [ASSUMPTION] Not diagrammed, but worth flagging: a permission-denied branch (e.g. unverified account trying to post) isn't shown — the brief only mentions verification for _providers_, not requesters, so it's left out rather than assumed. Confirm before adding.
  - [RESPONSE] The brief doesn't contain a permission-denied system yet, since it only contains a single view from user perspective, but it should be considered in the future.

# State table

| State            | Trigger                             | API status                | UI                                          |
| ---------------- | ----------------------------------- | ------------------------- | ------------------------------------------- |
| Loading (form)   | User taps "New request"             | `GET /categories` pending | Skeleton/spinner on form fields             |
| Idle (form)      | Categories loaded                   | `200 OK`                  | Form fields interactive                     |
| Validating       | User taps submit                    | — (client-side)           | Inline errors if invalid, else proceeds     |
| Loading (submit) | Valid form submitted                | `POST /requests` pending  | Submit button spinner, form locked          |
| Error (submit)   | Request rejected/failed             | `422` or `500`            | Error banner, form preserved, retry enabled |
| Empty (matches)  | Request created, 0 providers nearby | `201` + `{matches: 0}`    | Empty state: "No providers nearby yet"      |
| Success          | Request created, ≥1 match possible  | `201` + `{matches: n}`    | Confirmation toast/screen                   |
| Pending          | Redirected after success            | `GET /requests/:id`       | Status "Awaiting responses"                 |

# Endpoints and states

| Endpoint                               | Method                                             | States returned                                                                  |
| -------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------- |
| `/categories` (or `/providers/nearby`) | GET                                                | `200` success · `500` error · `200` empty (`[]`)                                 |
| `/requests`                            | POST                                               | `201` created · `422` validation error · `401` unauthorized · `500` server error |
| `/requests/:id`                        | GET                                                | `200` success (status: pending/accepted/etc.) · `404` not found · `500` error    |
| `/requests/:id/matches`                | GET _(only if match-check is real — [ASSUMPTION])_ | `200` with count · `200` empty (`{matches: 0}`)                                  |
