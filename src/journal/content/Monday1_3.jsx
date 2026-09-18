import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const prompt = `I'm an engineer. Walk through a standard 5-phase design process
(discover, define, architect, design, validate). For each phase, name
one specific contribution an engineer can make that measurably improves
the design work - and one common way engineers accidentally make design
harder. Tie each to a real artifact: a schema, an endpoint, a token, a
feasibility constraint. No generic advice.`;

const schema = `Booking {
  id
  requester_id -> User
  provider_id -> User
  status
  total_amount
  ???
}`;

export function Monday1_3() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 1.3</p>
      <h2 className="v-h2">Find your touchpoints</h2>
      <p className="v-body practice-doc__intro">
        Map where an engineer can improve a design before it's drawn. Be
        concrete — make Claude give specifics tied to a real artifact, not
        platitudes like "communicate early."
      </p>

      <p className="v-eyebrow practice-doc__label">Prompt</p>
      <pre className="practice-code">{prompt}</pre>

      <p className="v-body practice-doc__intro">
        Then push back: pick the most generic contribution and reply "that's too
        vague — give me a concrete example with a specific artifact." Make it
        earn the answer.
      </p>

      <PracticeDivider />
      <p className="v-eyebrow practice-doc__label">Chosen touchpoint</p>

      <h3 className="v-h3 practice-doc__section">
        Generic contribution <Badge variant="brand">Define</Badge>
      </h3>
      <p className="v-body practice-doc__intro">
        <strong>Improves it:</strong> Draft a rough schema for the core entity
        being discussed, even informally. Writing out{" "}
        <code className="v-mono">
          Booking {"{"} requester_id, provider_id, status, ??? {"}"}
        </code>{" "}
        and hitting the <code className="v-mono">???</code> (what happens with
        multi-provider jobs? group bookings?) forces the team to resolve
        ambiguity that prose requirements paper over.
      </p>
      <p className="v-body practice-doc__intro">
        <strong>Makes it harder:</strong> Silently resolving that ambiguity
        yourself instead of surfacing it — e.g., deciding{" "}
        <code className="v-mono">provider_id</code> is a single foreign key
        because it's simpler to build, without telling product/design that this
        permanently rules out multi-provider bookings. The scope decision gets
        baked into the data model before anyone chose it on purpose.
      </p>

      <h3 className="v-h3 practice-doc__section">
        Response after asking for an example
      </h3>
      <p className="v-body practice-doc__intro">
        Scenario: Product has written a requirement: "Users should be able to
        book a service and split the cost with a roommate."
      </p>

      <p className="v-eyebrow practice-doc__label">
        The artifact — a draft schema
      </p>
      <pre className="practice-code">{schema}</pre>

      <p className="v-body practice-doc__intro">
        The engineer's contribution: Instead of nodding along to "split the
        cost," draft the schema and try to place "split with a roommate" into
        it. You immediately hit a fork that prose glossed over:
      </p>
      <ul className="practice-doc__list">
        <li>
          <strong>Option A:</strong> Booking has one{" "}
          <code className="v-mono">payer_id</code>, and splitting is handled
          outside the booking entirely — a separate{" "}
          <code className="v-mono">
            PaymentSplit {"{"} booking_id, user_id, amount_owed {"}"}
          </code>{" "}
          table, with the roommate never touching the booking record itself.
        </li>
        <li>
          <strong>Option B:</strong> Booking itself becomes multi-payer —{" "}
          <code className="v-mono">
            payers: [{"{"}user_id, amount{"}"}]
          </code>{" "}
          — meaning every downstream thing that assumes "a booking has one
          payer" (refunds, cancellation policy, notifications, the{" "}
          <code className="v-mono">total_amount</code> field itself) now needs
          to handle a list.
        </li>
      </ul>
      <p className="v-body practice-doc__intro">
        These are wildly different amounts of work, and they imply different UX:
        Option A means the roommate is invisible to the booking flow (just gets
        a payment request afterward); Option B means the roommate needs their
        own view into the booking, its status, maybe cancellation rights.
      </p>
      <p className="v-body practice-doc__intro">
        <strong>Why this belongs in Define, not Architect:</strong> The
        requirement "split the cost" sounds like one sentence of scope, but it's
        actually a decision about who has standing on a booking — whether a
        non-requester can see, dispute, or cancel it. That's a product/UX
        decision (does the roommate need an account? a notification?
        cancellation rights?), not just a backend implementation detail.
        Surfacing it via the schema fork forces product to actually decide that
        before anyone designs a screen for it, rather than the engineer quietly
        picking Option A because it's less work and the roommate feature
        silently becoming "just a payment request" with no say for the roommate
        at all.
      </p>
    </div>
  );
}
