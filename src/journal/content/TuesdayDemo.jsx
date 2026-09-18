import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const prompt = `Synthesize these interview transcripts. For each theme: a name, how many
participants mentioned it, 2 verbatim quotes with participant ID, and any
contradicting evidence. Separate what users SAID from what you INFER. Do
not invent quotes. Rank themes by how well the evidence supports them. At
the end, list the data entities/attributes the verified themes imply.`;

const entities = [
  {
    name: "Relationship",
    detail: "provider_id, requester_id",
    attributes: [
      { name: "access_granted", type: "boolean" },
      { name: "access_type", type: "enum (key, code, none)" },
      { name: "date_access_granted", type: "date" },
      { name: "visit_count_at_time_of_access_grant", type: "integer" },
      { name: "supervision_required", type: "boolean" },
      {
        name: "service_category",
        type: "enum (recurring in-home, one-off/on-site trade)",
      },
    ],
  },
  {
    name: "Person / Requester",
    attributes: [
      { name: "has_known_local_vouch", type: "boolean" },
      { name: "booking_on_behalf_of", type: "nullable RequesterID (beneficiary_id)" },
    ],
  },
  {
    name: "Review record",
    attributes: [
      { name: "rating_value", type: "number" },
      { name: "is_disputed", type: "boolean" },
      { name: "dispute_outcome", type: "string" },
    ],
  },
];

export function TuesdayDemo() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Demo</p>
      <h2 className="v-h2">
        Synthesize Vello's research, then defend it — and list the entities it
        implies
      </h2>
      <ol className="practice-doc__list">
        <li>Load the full set of Vello interview transcripts into Claude.</li>
        <li>
          Ask for a thematic synthesis: named themes, how many participants
          raised each, supporting quotes with IDs, and contradictions.
        </li>
        <li>
          Audit at least two themes back to verbatim evidence. Correct
          anything overstated. Flag the loud-but-shallow theme if you find
          one.
        </li>
        <li>
          Turn the verified themes into two problem statements (who / what /
          why, no solutions) and a short list of the data entities and states
          they imply.
        </li>
      </ol>

      <p className="v-eyebrow practice-doc__label">Starter prompt</p>
      <pre className="practice-code">{prompt}</pre>

      <PracticeDivider />
      <p className="v-eyebrow practice-doc__label">Audited synthesis</p>

      <h3 className="v-h3 practice-doc__section">
        Theme 1 <Badge variant="brand">Handing over a house key marks the real trust threshold</Badge>
      </h3>
      <p className="v-body practice-doc__intro">
        <strong>Mentioned by:</strong> 3/6 (P01, P02, P04)
      </p>
      <ul className="practice-doc__list">
        <li>
          <Badge variant="neutral" className="practice-list__badge">P01</Badge>{" "}
          "Everything else, the price, the schedule, all of that is
          negotiable, but somebody's got a key."
        </li>
        <li>
          <Badge variant="neutral" className="practice-list__badge">P02</Badge>{" "}
          "And Marta's got a key now, so, yeah... But it is different."
        </li>
        <li>
          <Badge variant="neutral" className="practice-list__badge">P04</Badge>{" "}
          "They leave me the key at the fourth [visit]. You can always tell.
          The key is the moment."
        </li>
      </ul>
      <p className="v-body practice-doc__intro">
        <strong>Contradicting evidence:</strong> None found.
      </p>
      <p className="v-body practice-doc__intro">
        <strong>Qualification</strong> (not a contradiction, a scope limit):
        P05 (22 years, handyman/repair work) reports never being given a key
        or asked for anything beyond occasional insurance proof — "Insurance,
        sometimes, for bigger jobs. Nobody's ever asked me for anything else.
        In twenty-two years, nobody." P03 also never grants a key, but because
        she is present for every visit. This suggests the "key moment" is
        specific to ongoing, unsupervised, in-home services (cleaning,
        dog-walking, sitting) rather than a universal marker of trust across
        all provider types.
      </p>

      <h3 className="v-h3 practice-doc__section">
        Theme 2 <Badge variant="brand">Star ratings and reviews are considered untrustworthy</Badge>
      </h3>
      <p className="v-body practice-doc__intro">
        <strong>Mentioned by:</strong> 3/6 (P01, P02, P04)
      </p>
      <ul className="practice-doc__list">
        <li>
          <Badge variant="neutral" className="practice-list__badge">P01</Badge>{" "}
          "Stars are meaningless, everyone's four point eight."
        </li>
        <li>
          <Badge variant="neutral" className="practice-list__badge">P02</Badge>{" "}
          "Everyone's five stars... either everyone's brilliant or nobody
          leaves the bad ones."
        </li>
        <li>
          <Badge variant="neutral" className="practice-list__badge">P04</Badge>{" "}
          "There's a button, I pressed it, nothing happened."
        </li>
      </ul>
      <p className="v-body practice-doc__intro">
        <strong>Contradicting evidence:</strong> D (P03's daughter, booking on
        her behalf) actually relies on reviews as her working method, despite
        misgivings — "I just search and read reviews and go with a gut
        feeling. And then I worry about it." This indicates the "reviews are
        useless" position may be conditional: held by people who have a known
        local alternative (P01, P02), and abandoned by necessity when no such
        alternative exists (D, booking outside her own area for her mother).
      </p>

      <h3 className="v-h3 practice-doc__section">
        Data entities/attributes implied by these two verified themes
      </h3>
      {entities.map((entity) => (
        <div key={entity.name}>
          <p className="v-body practice-doc__intro">
            <Badge variant="accent">{entity.name}</Badge>
            {entity.detail && <> — {entity.detail}</>}
          </p>
          <ul className="practice-doc__list">
            {entity.attributes.map((a) => (
              <li key={a.name}>
                <code className="v-mono">{a.name}</code> ({a.type})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
