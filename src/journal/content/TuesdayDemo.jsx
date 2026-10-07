import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const prompt = `Synthesize these interview transcripts. For each theme: a name, how many
participants mentioned it, 2 verbatim quotes with participant ID, and any
contradicting evidence. Separate what users SAID from what you INFER. Do
not invent quotes. Rank themes by how well the evidence supports them. At
the end, list the data entities/attributes the verified themes imply.`;

// `why` is the one-sentence reason each attribute is worth storing,
// traced back to the theme or participant it came from.
const entities = [
  {
    name: "Relationship",
    detail: "provider_id, requester_id",
    attributes: [
      {
        name: "access_state",
        type: "enum (see Home access states below)",
        why: "The key handover is the trust threshold in Theme 1, and \"never had a key\" and \"had it taken back\" mean different things.",
      },
      {
        name: "access_type",
        type: "enum (key, code, none)",
        why: "Participants talk about the key itself, but a door code crosses the same threshold in a different form.",
      },
      {
        name: "date_access_granted",
        type: "date",
        why: "Set against when the relationship started, it shows how long trust took to build.",
      },
      {
        name: "visit_count_at_time_of_access_grant",
        type: "integer",
        why: "It captures P04's \"key at the fourth visit\" pattern, and a zero here captures P02's vouch-only case.",
      },
      {
        name: "supervision_required",
        type: "boolean",
        why: "It separates supervised visits (P03's case, inferred) from unsupervised access, where the threshold actually applies.",
      },
      {
        name: "service_category",
        type: "enum (recurring in-home, one-off/on-site trade)",
        why: "P05's 22 years without a key show the threshold only applies to recurring in-home work.",
      },
    ],
  },
  {
    name: "Person / Requester",
    attributes: [
      {
        name: "has_known_local_vouch",
        type: "boolean",
        why: "It's the variable that decides whether ratings get trusted or dismissed in Theme 2.",
      },
      {
        name: "booking_on_behalf_of",
        type: "nullable RequesterID (beneficiary_id)",
        why: "D's reliance on reviews comes from booking outside her own network, for her mother.",
      },
    ],
  },
  {
    name: "Review record",
    attributes: [
      {
        name: "rating_value",
        type: "number",
        why: "People with no vouch (D, P01's sitter) still book on reviews, so the rating can't be dropped.",
      },
      {
        name: "dispute_state",
        type: "enum (see Review dispute states below)",
        why: "P04's dispute went nowhere, and a dispute needs states that end somewhere, kept separate from the rating itself.",
      },
    ],
  },
  {
    name: "Booking / JobHistory",
    detail: "requester_id, provider_id (from the loud-but-shallow finding)",
    attributes: [
      {
        name: "status",
        type: "enum (see Booking states below)",
        why: "No-shows are what actually goes wrong (P01), so they need to be recorded as their own outcome, not lost among cancellations.",
      },
      {
        name: "confirmed_window",
        type: "start/end datetime",
        why: "P03 waited through a two-hour window, and you can't tell a no-show from a late arrival without one.",
      },
      {
        name: "quoted_amount",
        type: "money",
        why: "The price surprise starts with what was promised before the visit (P02's £400 boiler).",
      },
      {
        name: "final_amount",
        type: "money",
        why: "The gap between quote and final price is D's \"stupid number on the doorstep\", and it can only be seen if both are stored.",
      },
    ],
  },
];

const problemStatements = [
  {
    source: "From Theme 1",
    who: "Requesters about to give a provider unsupervised access to their home or children, for recurring in-home services like cleaning, dog-walking or sitting.",
    what: "They have no shared signal for when a provider has earned that access, so each household improvises its own threshold: a few trial visits (P04), a friend's vouch (P02), or whoever is free when they're stuck (P01).",
    why: "That handover is the point where trust actually gets tested (P01, P02, P04), and under pressure the threshold drops rather than holds.",
  },
  {
    source: "From Theme 2",
    who: "Requesters booking outside their own network: D booking for her mother, P01 needing a sitter at short notice.",
    what: "They fall back on star ratings they don't believe, because every provider looks the same at 4.8 or five stars (P01, P02).",
    why: "Without a local vouch, reviews are the only signal they have, so they book on it anyway and then worry about it (D).",
  },
];

// Each lifecycle lists the values of one enum field in the entity
// list above. `basis` keeps the brief's SAID vs INFER split per state.
const stateMachines = [
  {
    name: "Home access",
    entity: "Relationship",
    field: "access_state",
    flow: "none → on_trial → granted → revoked",
    states: [
      {
        state: "none",
        reachedWhen: "Default when a relationship starts.",
        basis: "inferred",
        evidence: "Starting point implied by every key story.",
      },
      {
        state: "on_trial",
        reachedWhen: "Provider has started visiting without a key; visits are being counted.",
        basis: "said",
        evidence: 'P04: "They leave me the key at the fourth [visit]."',
      },
      {
        state: "granted",
        reachedWhen: "Requester hands over a key or code after the trial visits.",
        basis: "said",
        evidence: 'P04: "The key is the moment."',
      },
      {
        state: "revoked",
        reachedWhen: "Access is taken back after something goes wrong.",
        basis: "inferred",
        evidence: "No participant describes it. Needed so a lost key doesn't read the same as never having had one.",
      },
      {
        state: "not_applicable",
        reachedWhen: "One-off or on-site trades where the requester is home for the visit.",
        basis: "said",
        evidence: 'P05: "Nobody\'s ever asked me for anything else. In twenty-two years, nobody."',
      },
    ],
  },
  {
    name: "Review dispute",
    entity: "Review record",
    field: "dispute_state",
    flow: "published → disputed → upheld | amended | removed",
    states: [
      {
        state: "published",
        reachedWhen: "Review is live on the provider's profile.",
        basis: "inferred",
        evidence: "Default state of any review.",
      },
      {
        state: "disputed",
        reachedWhen: "Provider challenges the review.",
        basis: "said",
        evidence:
          'P04: "There\'s a button, I pressed it, nothing happened." Today a dispute enters this state and never leaves it.',
      },
      {
        state: "upheld",
        reachedWhen: "Dispute reviewed; the review stays as written.",
        basis: "inferred",
        evidence: "A resolved outcome has to exist for disputed to be a real state, not a dead end.",
      },
      {
        state: "amended",
        reachedWhen: "Provider and requester resolve it; the review is updated to reflect the fix.",
        basis: "said",
        evidence: 'P05: "There\'s no room to just say sorry and fix it."',
      },
      {
        state: "removed",
        reachedWhen: "Dispute reviewed; the review is taken down as unfair.",
        basis: "inferred",
        evidence: "The outcome P04 was asking for. Not described as having happened.",
      },
    ],
  },
  {
    name: "Booking (reliability and price)",
    entity: "Booking / JobHistory",
    field: "status",
    note: "Comes from the loud-but-shallow finding, not Themes 1 or 2.",
    flow: "requested → quoted → confirmed → completed | no_show | cancelled  (side path: quoted → repriced on site)",
    states: [
      {
        state: "requested",
        reachedWhen: "Requester posts the job.",
        basis: "inferred",
        evidence: "Entry point of the post-a-request flow.",
      },
      {
        state: "quoted",
        reachedWhen: "Provider gives a price before the visit.",
        basis: "said",
        evidence: "P04 wants the platform fee up front; P05 on quoting.",
      },
      {
        state: "confirmed",
        reachedWhen: "Requester accepts the quote and a time window.",
        basis: "said",
        evidence: "P03 waiting through a two-hour window for the shower man.",
      },
      {
        state: "repriced_on_site",
        reachedWhen: "Final price on the day differs from the quote.",
        basis: "said",
        evidence:
          'D: "All the checking in the world doesn\'t stop someone quoting a stupid number on the doorstep."',
      },
      {
        state: "completed",
        reachedWhen: "Job done; feeds usage_count for the relationship.",
        basis: "inferred",
        evidence: "Needed for P01's \"used him eleven times\" signal.",
      },
      {
        state: "no_show",
        reachedWhen: "Provider doesn't arrive in the confirmed window.",
        basis: "said",
        evidence:
          'P01: "The thing that actually goes wrong is people don\'t show up."',
      },
      {
        state: "cancelled",
        reachedWhen: "Either side calls it off before the visit.",
        basis: "inferred",
        evidence: "Kept separate from no_show so reliability only counts the unannounced misses.",
      },
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
        <strong>Contradicting evidence:</strong>
      </p>
      <ul className="practice-doc__list">
        <li>
          <Badge variant="neutral" className="practice-list__badge">P02</Badge>{" "}
          Marta got a key with no checks and no trial visits: "Nothing,
          really... Denise vouched for her. That's the check." The threshold
          was crossed by a vouch, not by P04's "fourth visit" pattern.
        </li>
        <li>
          <Badge variant="neutral" className="practice-list__badge">P01</Badge>{" "}
          Booked a sitter they'd never met, off an app, for the kids: "When
          you're stuck you'll do the thing you said you wouldn't do." Under
          pressure, the line moves.
        </li>
        <li>
          <Badge variant="neutral" className="practice-list__badge">P01</Badge>{" "}
          The line sits at children as much as at keys: "someone in my house,
          someone with my kids, completely different question." The threshold
          is closer to unsupervised access to home or children than to the
          key itself.
        </li>
      </ul>
      <p className="v-body practice-doc__intro">
        <strong>Qualification</strong> (not a contradiction, a scope limit):
        P05 (22 years, handyman/repair work) reports never being given a key
        or asked for anything beyond occasional insurance proof — "Insurance,
        sometimes, for bigger jobs. Nobody's ever asked me for anything else.
        In twenty-two years, nobody." <em>Inferred, not said:</em> P03 may
        never grant a key because she is home for every visit. She mentions
        waiting in for the shower man, but keys never come up. This suggests the "key moment" is
        specific to ongoing, unsupervised, in-home services (cleaning,
        dog-walking, sitting) rather than a universal marker of trust across
        all provider types.
      </p>

      <h3 className="v-h3 practice-doc__section">
        Theme 2 <Badge variant="brand">Star ratings and reviews are considered untrustworthy</Badge>
      </h3>
      <p className="v-body practice-doc__intro">
        <strong>Mentioned by:</strong> 2/6 (P01, P02). Revised down from 3/6:
        the original P04 quote was miscategorized (see below).
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
      </ul>
      <p className="v-body practice-doc__intro">
        <strong>Related but distinct finding</strong> (not part of this
        theme): P04, a provider, describes the review dispute process as
        broken — "There's a button, I pressed it, nothing happened." That's a
        claim about having no recourse against an unfair review, not about
        whether ratings carry signal. P05 backs it: "there's no room to just
        say sorry and fix it."
      </p>
      <p className="v-body practice-doc__intro">
        <strong>Contradicting evidence:</strong> D (P03's daughter, booking on
        her behalf) actually relies on reviews as her working method, despite
        misgivings — "I just search and read reviews and go with a gut
        feeling. And then I worry about it." This indicates the "reviews are
        useless" position may be conditional: held by people who have a known
        local alternative (P01, P02), and abandoned by necessity when no such
        alternative exists (D, booking outside her own area for her mother).
        P01 fits the same pattern: the app-booked sitter was chosen "based on
        reviews, and she was great." Reviews got used, and worked, once there
        was no vouch to lean on.
      </p>

      <h3 className="v-h3 practice-doc__section">
        Loud but shallow <Badge variant="warning">Safety and vetting</Badge>
      </h3>
      <p className="v-body practice-doc__intro">
        <strong>Loud:</strong> P02 is emphatic — "It's the wild west... That
        should be illegal" — and closes with "Proper vetting. Real checks."
      </p>
      <p className="v-body practice-doc__intro">
        <strong>Shallow:</strong> P02's own behavior contradicts it. Marta got
        a key with no check, and P02's actual November problem was "Not
        safety... I just had no way to know if I was being had." Others say
        the same:
      </p>
      <ul className="practice-doc__list">
        <li>
          <Badge variant="neutral" className="practice-list__badge">P01</Badge>{" "}
          "Everyone talks about safety... the thing that actually goes wrong
          is people don't show up."
        </li>
        <li>
          <Badge variant="neutral" className="practice-list__badge">P05</Badge>{" "}
          Checks "doesn't tell you anything about whether the man can
          plaster."
        </li>
        <li>
          <Badge variant="neutral" className="practice-list__badge">D</Badge>{" "}
          "All the checking in the world doesn't stop someone quoting a stupid
          number on the doorstep."
        </li>
      </ul>
      <p className="v-body practice-doc__intro">
        <strong>What's underneath:</strong> reliability (P01, P04, P05, P03's
        two-hour window) and price transparency (P02's £400 boiler, D's "£400
        for an £80 job," P06, P04 wanting the platform fee up front). This is
        the theme my own notes ranked third — "the real pain point is
        reliability and price transparency."
      </p>

      <h3 className="v-h3 practice-doc__section">Problem statements</h3>
      <p className="v-body practice-doc__intro">
        One per theme, in who / what / why form, with no solution in them.
      </p>
      {problemStatements.map((statement) => (
        <div key={statement.source}>
          <p className="v-body practice-doc__intro">
            <Badge variant="brand">{statement.source}</Badge>
          </p>
          <ul className="practice-doc__list">
            <li>
              <strong>Who:</strong> {statement.who}
            </li>
            <li>
              <strong>What:</strong> {statement.what}
            </li>
            <li>
              <strong>Why:</strong> {statement.why}
            </li>
          </ul>
        </div>
      ))}

      <h3 className="v-h3 practice-doc__section">
        Data entities/attributes implied by the themes
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
                <br />
                <span className="v-body-sm v-muted">{a.why}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h3 className="v-h3 practice-doc__section">States implied by the themes</h3>
      {stateMachines.map((machine) => (
        <div key={machine.name}>
          <p className="v-body practice-doc__intro">
            <Badge variant="accent">{machine.name}</Badge> on{" "}
            {machine.entity}: values of{" "}
            <code className="v-mono">{machine.field}</code>.
            {machine.note && <> {machine.note}</>}
          </p>
          <p className="v-body practice-doc__intro">
            <code className="v-mono">{machine.flow}</code>
          </p>
          <table className="practice-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Reached when</th>
                <th>Evidence</th>
              </tr>
            </thead>
            <tbody>
              {machine.states.map((s) => (
                <tr key={s.state}>
                  <td>
                    <code className="v-mono">{s.state}</code>
                  </td>
                  <td>{s.reachedWhen}</td>
                  <td>
                    <Badge variant={s.basis === "said" ? "success" : "warning"}>
                      {s.basis === "said" ? "Said" : "Inferred"}
                    </Badge>{" "}
                    {s.evidence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
