import { Avatar, Badge, Card, Rating } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const auditFindings = [
  {
    topic: "Container (background, border, radius)",
    verdict: "Exact match",
    variant: "success",
  },
  {
    topic: "Container padding (observed 15px)",
    verdict: "Rounded",
    variant: "warning",
    detail:
      'Card only ships padding steps of 14/20/28px. Used padding="sm" (14px), the nearest step — same gap the spec sheet already flagged as unresolved, now visible in a real prop.',
  },
  {
    topic: "Name type size (observed 17px)",
    verdict: "Rounded",
    variant: "warning",
    detail:
      "No token sits at 17px (the scale runs 16/18/20). Used --text-md (18px), the nearer step, instead of inventing a new size.",
  },
  {
    topic: "Avatar size (observed 64×64)",
    verdict: "Exact match",
    variant: "success",
  },
  {
    topic: "Rating stars + numeric value",
    verdict: "Exact match",
    variant: "success",
  },
  {
    topic: "Tap affordance (chevron)",
    verdict: "Exact match",
    variant: "success",
  },
  {
    topic: "Walk-time chip colors",
    verdict: "Fixed",
    variant: "success",
    detail:
      "Started on raw ramp tokens (--green-700 on --green-50), since no Badge variant pairs those exact shades. Swapped to the semantic aliases that resolve to the same text color and the nearest tint — --text-brand (green-700, exact) and --success-tint (green-100, one step darker than the observed green-50) — trading a barely-visible tint shift for zero raw-ramp references. The exact --green-50 has no alias, which the 5.1 spec flags as a missing token.",
  },
];

function FindingCard({ topic, verdict, variant, detail }) {
  return (
    <div className="practice-qa-item">
      <p className="practice-qa-item__question">
        <strong>{topic}</strong> <Badge variant={variant}>{verdict}</Badge>
      </p>
      {detail && <p className="v-body-sm v-muted">{detail}</p>}
    </div>
  );
}

export function Friday5_2() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 5.2</p>
      <h2 className="v-h2">Generate, then audit for token fidelity</h2>
      <p className="v-body practice-doc__intro">
        Take the screen export, the design system, and the spec sheet from
        5.1, and rebuild the component from them. Then audit the result
        against the spec: did it reference tokens or hardcode hex values?
        Did it preserve spacing and states, or round everything to the
        nearest step? Did it invent a hover state nobody specified? Fix at
        least one thing it got wrong.
      </p>

      <PracticeDivider />

      <div className="practice-two-col__col practice-doc__intro">
        <p className="v-eyebrow practice-doc__label">
          Reference — Vello screen export
        </p>
        <img
          className="practice-spec-image"
          src="/ProviderCard.png"
          alt="Vello's provider card component, showing Maya Rivera's avatar, name, availability pill, bio, price, walk-time chip, and rating stars"
        />
      </div>

      <div className="practice-two-col__col">
        <p className="v-eyebrow practice-doc__label">
          Rebuild — from the spec sheet
        </p>
        <Card
          as="article"
          aria-label="Maya Rivera, dog walker and pet sitter"
          tappable
          padding="sm"
          className="friday-provider-mock"
        >
          <div className="friday-provider-mock__top">
            <Avatar name="Maya Rivera" size="lg" verified />
            <div className="friday-provider-mock__body">
              <div className="friday-provider-mock__toprow">
                <span className="friday-provider-mock__name">Maya Rivera</span>
                <Badge variant="accent" size="sm" dot>
                  Available
                </Badge>
              </div>
              <p className="friday-provider-mock__bio">
                Dog walker & pet sitter, just up on 4th Ave.
              </p>
              <div className="friday-provider-mock__pricerow">
                <span className="friday-provider-mock__pricelabel">from</span>
                <span className="friday-provider-mock__price">$24</span>
                <span className="friday-provider-mock__pricelabel">/ walk</span>
              </div>
              <div className="friday-provider-mock__metarow">
                <span className="friday-provider-mock__walkchip">6 min walk</span>
                <Rating value={4.9} size="sm" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <h3 className="v-h3 practice-doc__section">Token-fidelity audit</h3>
      <p className="v-body practice-doc__intro">
        Every color, radius, spacing, and font in the rebuild traces to a
        CSS variable — zero hardcoded hex values anywhere in the markup.
        Where the rebuild still had to make a call, here's what happened:
      </p>
      <div className="practice-qa-list">
        {auditFindings.map((f) => (
          <FindingCard key={f.topic} {...f} />
        ))}
      </div>
    </div>
  );
}
