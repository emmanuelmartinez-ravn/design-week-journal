import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const prompt = `Here is Vello's product brief. Act as a senior product designer at an
agency. Map the end-to-end design process for Vello v1: phases, key
decisions per phase, and artifacts produced. For each phase, name one
concrete thing an engineer can contribute before design starts, and one
design decision that forces a data-model or API decision. Be specific to
Vello - its hyperlocal scope, three roles, and trust model.`;

const contributions = [
  {
    phase: "Discover",
    contribution: "Spike neighborhood boundary options (shape/size)",
  },
  { phase: "Define", contribution: "Propose role model" },
  {
    phase: "Architect",
    contribution: "Messaging real-time strategy, draft ERD / flow diagrams",
  },
  {
    phase: "Design",
    contribution: "Benchmark asset weights, geo-permission flows",
  },
  { phase: "Validate", contribution: "Instrument analytics pre-testing" },
];

export function MondayDemo() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Demo</p>
      <h2 className="v-h2">
        Map design's role on Vello — and where engineering plugs in
      </h2>
      <p className="v-body practice-doc__intro">
        Apply all three concepts to the product you'll use all week.
      </p>
      <ol className="practice-doc__list">
        <li>
          Open the Vello project in Claude and read the product brief in full if
          you haven't.
        </li>
        <li>
          Ask Claude to map the end-to-end design process for Vello v1 — phases,
          key decisions, and the artifacts each produces.
        </li>
        <li>
          Challenge it at least twice. Where is it generic? Where does Vello's
          hyperlocal, three-role, trust-based nature change the process?
        </li>
        <li>
          For each phase, pin down one concrete thing engineering could
          contribute — and which design decision implies a data-model or API
          decision.
        </li>
      </ol>

      <p className="v-eyebrow practice-doc__label">Starter prompt</p>
      <pre className="practice-code">{prompt}</pre>

      <PracticeDivider />
      <p className="v-eyebrow practice-doc__label">Reflection</p>

      <h3 className="v-h3 practice-doc__section">Design owns</h3>
      <ul className="practice-doc__list">
        <li>The trust experience</li>
        <li>Logic on role changing and actions</li>
        <li>The design system as source of truth</li>
        <li>Avoid technically-valid defaults that are wrong for Vello's bet</li>
      </ul>

      <h3 className="v-h3 practice-doc__section">Engineering contributes</h3>
      <ul className="practice-phase-list">
        {contributions.map((c) => (
          <li key={c.phase}>
            <Badge className="practice-phase-list__phase" variant="brand">
              {c.phase}
            </Badge>
            <span className="practice-phase-list__text">{c.contribution}</span>
          </li>
        ))}
      </ul>
      <p className="v-body v-muted">
        Shows up early enough to shape the brief, not late enough to gut it.
      </p>

      <h3 className="v-h3 practice-doc__section">
        Reframe: a design decision that's a system decision
      </h3>
      <p className="v-body practice-doc__intro">
        <strong>ProviderCard hierarchy</strong> (badge vs. rating vs. "trusted
        by 3 neighbors") looks like a card variant. It's actually a choice
        between a trust <em>graph</em> (adjacency by building/block) and a trust{" "}
        <em>average</em> — a foundational data primitive, not a screen. Move it
        to a co-owned Architect-phase call, before pixels.
      </p>

      <h3 className="v-h3 practice-doc__section">Two documented pushbacks</h3>
      <ol className="practice-doc__list">
        <li>
          <strong>No default full-visibility for Admin.</strong> Seeing every
          booking reads as surveillance, not the resident's actual role. Default
          to flagged-only visibility, full access gated behind an open dispute.
        </li>
        <li>
          <strong>No global star-rating average as v1's trust signal.</strong>{" "}
          That's the anonymous-platform feeling Vello is against. Ship
          neighbor-adjacency data instead, even at higher cost — a "v2 trust
          upgrade" won't get prioritized later.
        </li>
      </ol>
    </div>
  );
}
