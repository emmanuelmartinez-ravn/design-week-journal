1. Sort the decisions - and flag the ones that hit your code.

Below are ten decisions a team might make about Vello. Label each one **Product**, **UX**, **UI**, or **Visual**. Then add a second mark: which ones would change a **data model**, **an endpoint**, or **a route** you'd have to build?

1. Vello charges providers a flat monthly fee instead of per-booking commission. _Product_, _Endpoint_
2. The "Book now" button is persimmon, not forest green. _Visual_, _None_
3. A requester must verify their address before they can post a need. _UX_, _Data model_
4. Provider availability shows as a weekly calendar, not a list. _UI_, _Data model_
5. Vello launches with dog-walking only, then expands. _UX_, _Route_
6. Rating stars use the amber color from the design system. _Visual_, _None_
7. After booking, the user lands on a confirmation screen, not back on the feed. _UX_, _Route_
8. The admin verification queue sorts oldest-first. _UI_, _Endpoint_
9. Body text is set in Hanken Grotesk at 17px. _Visual_, _None_
10. Vello requires a real-name profile, not a username. _Product_, _Data model_

11. Teach the vocabulary back.

The fastest way to find out whether you understand the four terms is to be quizzed on edge cases. Use Claude as a tutor that tests you, not one that lectures you.

Prompt

```
I'm an engineer learning the difference between product design, UX, UI,
and visual design. Quiz me: give me 8 realistic decisions about a
hyperlocal services app, one at a time. After each answer, tell me if
I'm right, correct me, and explain the boundary case. For each, also say
whether the decision would change a data model or an API contract. Don't
give answers up front. Make a few deliberately ambiguous.
```

# Quiz Recap — Your First-Attempt Answers

Question: The team debates whether users should see a provider's reviews and rating BEFORE they can tap "Request booking," versus showing the request form first with reviews one tap away in a secondary tab.
Correct answer: UX
Your answer: UX
Question: Choosing a specific color palette (muted blues/greens, high contrast) intended to signal trust and safety for in-home service providers.
Correct answer: Visual Design
Your answer: Visual Design
Question: Deciding whether to make tipping a first-class feature (its own screen, prompted at job completion) versus not supporting it at all.
Correct answer: Product Design
Your answer: Product Design
Question: Deciding whether the "Book Now" action is a floating action button (FAB) or a sticky bottom bar.
Correct answer: UI
Your answer: UI
Question: Deciding whether unverified users can browse providers freely, versus requiring phone verification before they can see any provider profiles.
Correct answer: Product Design
Your answer: Product Design
Question: On a provider profile card, deciding that name and rating get large bold text, while distance and price get smaller, lighter text — i.e., setting the visual hierarchy.
Correct answer: UI
Your answer: Visual Design
Question: Deciding whether customers can message providers directly in-app with free text, versus only submitting structured request forms (fixed fields, no open chat).
Correct answer: Product Design
Your answer: UX
Question: Choosing whether service-category icons are outlined or filled style.
Correct answer: Visual Design
Your answer: Visual Design

3. Find your touchpoints.

Map where an engineer can improve a design before it's drawn. Be concrete - make Claude give specifics tied to a real artifact, not platitudes like "communicate early."

Prompt
I'm an engineer. Walk through a standard 5-phase design process
(discover, define, architect, design, validate). For each phase, name
one specific contribution an engineer can make that measurably improves
the design work - and one common way engineers accidentally make design
harder. Tie each to a real artifact: a schema, an endpoint, a token, a
feasibility constraint. No generic advice.

- Chosed Generic contribution

Define

Improves it: Draft a rough schema for the core entity being discussed, even informally. Writing out Booking { requester_id, provider_id, status, ??? } and hitting the ??? (what happens with multi-provider jobs? group bookings?) forces the team to resolve ambiguity that prose requirements paper over.
Makes it harder: Silently resolving that ambiguity yourself instead of surfacing it — e.g., deciding provider_id is a single foreign key because it's simpler to build, without telling product/design that this permanently rules out multi-provider bookings. The scope decision gets baked into the data model before anyone chose it on purpose.

- Response after asking for an example:

Scenario: Product has written a requirement: "Users should be able to book a service and split the cost with a roommate."

The artifact — a draft schema:

Booking {
id
requester_id -> User
provider_id -> User
status
total_amount
???
}
The engineer's contribution: Instead of nodding along to "split the cost," draft the schema and try to place "split with a roommate" into it. You immediately hit a fork that prose glossed over:

Option A: Booking has one payer_id, and splitting is handled outside the booking entirely — a separate PaymentSplit { booking_id, user_id, amount_owed } table, with the roommate never touching the booking record itself.
Option B: Booking itself becomes multi-payer — payers: [{user_id, amount}] — meaning every downstream thing that assumes "a booking has one payer" (refunds, cancellation policy, notifications, the total_amount field itself) now needs to handle a list.

These are wildly different amounts of work, and they imply different UX: Option A means the roommate is invisible to the booking flow (just gets a payment request afterward); Option B means the roommate needs their own view into the booking, its status, maybe cancellation rights.

Why this belongs in Define, not Architect: The requirement "split the cost" sounds like one sentence of scope, but it's actually a decision about who has standing on a booking — whether a non-requester can see, dispute, or cancel it. That's a product/UX decision (does the roommate need an account? a notification? cancellation rights?), not just a backend implementation detail. Surfacing it via the schema fork forces product to actually decide that before anyone designs a screen for it, rather than the engineer quietly picking Option A because it's less work and the roommate feature silently becoming "just a payment request" with no say for the roommate at all.

- Final response should be a table with

phase → contribution → failure mode

# DEMO

Map design's role on Vello - and where engineering plugs in.
Apply all three concepts to the product you'll use all week.

Open the Vello project in Claude and read the product brief in full if you haven't.
Ask Claude to map the end-to-end design process for Vello v1 - phases, key decisions, and the artifacts each produces.
Challenge it at least twice. Where is it generic? Where does Vello's hyperlocal, three-role, trust-based nature change the process?
For each phase, pin down one concrete thing engineering could contribute - and which design decision implies a data-model or API decision.
Starter prompt
Here is Vello's product brief. Act as a senior product designer at an
agency. Map the end-to-end design process for Vello v1: phases, key
decisions per phase, and artifacts produced. For each phase, name one
concrete thing an engineer can contribute before design starts, and one
design decision that forces a data-model or API decision. Be specific to
Vello - its hyperlocal scope, three roles, and trust model.

## Design owns

- The trust experience
- Logic on role changing and actions
- The design system as source of truth
- Avoid technically-valid defaults that are wrong for Vello's bet

## Engineering contributes

| Phase     | Contribution                                            |
| --------- | ------------------------------------------------------- |
| Discover  | Spike neighborhood boundary options (shape/size)        |
| Define    | Propose role model                                      |
| Architect | Messaging real-time strategy, draft ERD / flow diagrams |
| Design    | Benchmark asset weights, geo-permission flows           |
| Validate  | Instrument analytics pre-testing                        |

Shows up early enough to shape the brief, not late enough to gut it.

## Reframe: a design decision that's a system decision

**ProviderCard hierarchy** (badge vs. rating vs. "trusted by 3 neighbors") looks like a card variant. It's actually a choice between a trust _graph_ (adjacency by building/block) and a trust _average_ — a foundational data primitive, not a screen. Move it to a co-owned Architect-phase call, before pixels.

## Two documented pushbacks

1. **No default full-visibility for Admin.** Seeing every booking reads as surveillance, not the resident's actual role. Default to flagged-only visibility, full access gated behind an open dispute.
2. **No global star-rating average as v1's trust signal.** That's the anonymous-platform feeling Vello is against. Ship neighbor-adjacency data instead, even at higher cost — a "v2 trust upgrade" won't get prioritized later.
