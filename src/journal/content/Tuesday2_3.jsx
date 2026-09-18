import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const auditPrompt = `For the theme you ranked #1, list every verbatim quote that supports it,
with participant ID and roughly where it appears. Then list any evidence
that contradicts or complicates it. Finally, name the data entities and
attributes this theme implies Vello must model (e.g., a "verification"
on a Provider). If the real support is thinner than your summary, say so.`;

const themes = [
  {
    title: "Trust flows through known intermediaries, not platform signals",
    detail:
      "Participants sidestepped ratings/certifications in favor of a personal vouch from someone they already trust.",
  },
  {
    title: "Trust requirements scale sharply with stakes",
    detail:
      "Participants draw a hard line between low-stakes, transactional jobs and anything involving a key or a child.",
  },
  {
    title: "The real pain point is reliability and price transparency",
    detail:
      "When asked what actually goes wrong, participants consistently pointed to no-shows and unclear pricing rather than safety incidents.",
  },
];

const quotes = [
  {
    participant: "P01",
    text: "But if you gave me the choice between a man with a certificate who I've never seen before and a man with no certificate who Priya has used for two years, I'm taking Priya's man. Every time. I don't think the certificate is telling me what I actually want to know.",
  },
  {
    participant: "P02",
    text: "Denise has known her for four years. She's not going to put her name on someone who's going to rob me... It's a person taking responsibility, that's not the same as a company saying trust us.",
  },
  {
    participant: "P03 Daughter",
    text: "I try. But I don't live here, so I'm asking in a group for an area I don't live in, which is a bit odd. Mostly I just search and read reviews and go with a gut feeling. And then I worry about it.",
  },
];

const entities = [
  {
    name: "Provider",
    attributes: [
      { name: "known_by_requesters", type: "[RequesterID]" },
      {
        name: "verification_status",
        type: "formal check, e.g. background check/ID",
      },
    ],
  },
  {
    name: "VouchOrEndorsement",
    detail: "join entity between Requester and Provider",
    attributes: [
      { name: "voucher_id, provider_id", type: "RequesterID, ProviderID" },
      { name: "relationship_strength / tenure", type: "duration, e.g. months known" },
      { name: "usage_count", type: "integer" },
      { name: "usage_recency / is_ongoing", type: "timestamp, boolean" },
    ],
  },
  {
    name: "Requester–Requester relationship graph",
    detail: "or Requester–Voucher",
    attributes: [
      { name: "mutual_recognition", type: "boolean" },
      { name: "network_density", type: "float, 0–1" },
    ],
  },
  {
    name: "Booking / JobHistory",
    detail:
      'linked to specific Requester + Provider, queryable by "which of my trusted contacts used this provider" rather than global aggregate rating',
  },
];

export function Tuesday2_3() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 2.3</p>
      <h2 className="v-h2">
        Audit a synthesis — and extract the entities it implies
      </h2>
      <p className="v-body practice-doc__intro">
        The core skill of the day in miniature. Have Claude synthesize, then try
        to break it — and pull out the data the themes imply. Load two or three
        Vello interview transcripts into Claude, ask for the top three themes
        with supporting quotes and participant IDs, then pick the theme Claude
        sounds most confident about and demand the receipts. Finally, ask what
        objects/attributes that theme implies the system must store.
      </p>

      <p className="v-eyebrow practice-doc__label">Audit prompt</p>
      <pre className="practice-code">{auditPrompt}</pre>

      <PracticeDivider />

      <p className="v-eyebrow practice-doc__label">Themes selected</p>
      <ol className="practice-list">
        {themes.map((t, i) => (
          <li key={t.title}>
            <span className="practice-list__text">
              {t.title}
              <br />
              <span className="v-mono v-eyebrow">{t.detail}</span>
            </span>
            <Badge
              className="practice-list__badge"
              variant={i === 0 ? "brand" : "neutral"}
            >
              #{i + 1}
            </Badge>
          </li>
        ))}
      </ol>

      <h3 className="v-h3 practice-doc__section">
        Receipts for theme #1 <Badge variant="brand">{themes[0].title}</Badge>
      </h3>
      <ul className="practice-doc__list">
        {quotes.map((q) => (
          <li key={q.participant}>
            <Badge variant="neutral" className="practice-list__badge">
              {q.participant}
            </Badge>{" "}
            "{q.text}"
          </li>
        ))}
      </ul>

      <h3 className="v-h3 practice-doc__section">
        Data entities this theme implies
      </h3>
      {entities.map((entity) => (
        <div key={entity.name}>
          <p className="v-body practice-doc__intro">
            <Badge variant="accent">{entity.name}</Badge>
            {entity.detail && <> — {entity.detail}</>}
          </p>
          {entity.attributes && (
            <ul className="practice-doc__list">
              {entity.attributes.map((a) => (
                <li key={a.name}>
                  <code className="v-mono">{a.name}</code>
                  {a.type && ` (${a.type})`}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
