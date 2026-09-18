import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const MISSING_AT_FIRST_LOOK = ["Payments", "Notifications", "Messaging", "Quotes", "Account"];

const tables = [
  {
    name: "users",
    columns: ["id", "name", "email", "role", "verified_status"],
    foreignKeys: [
      { column: "neighborhood_id", ref: "neighborhoods.id", note: "primary/home neighborhood" },
    ],
  },
  {
    name: "neighborhoods",
    columns: ["id", "name", "geo_scope"],
  },
  {
    name: "user_neighborhoods",
    columns: ["id", "status (joined/pending/rejected)"],
    foreignKeys: [
      { column: "user_id", ref: "users.id" },
      { column: "neighborhood_id", ref: "neighborhoods.id" },
    ],
  },
  {
    name: "addresses",
    columns: ["id", "label", "street", "city"],
    foreignKeys: [{ column: "user_id", ref: "users.id" }],
  },
  {
    name: "provider_profiles",
    columns: ["id", "category", "bio", "rating_avg"],
    foreignKeys: [{ column: "user_id", ref: "users.id" }],
  },
  {
    name: "services",
    columns: ["id", "category", "description", "price", "photos"],
    foreignKeys: [{ column: "provider_id", ref: "provider_profiles.id" }],
  },
  {
    name: "requests",
    columns: ["id", "status", "created_at", "scheduled_at"],
    foreignKeys: [
      { column: "requester_id", ref: "users.id" },
      { column: "service_id", ref: "services.id" },
      { column: "accepted_quote_id", ref: "quotes.id" },
    ],
  },
  {
    name: "quotes",
    columns: ["id", "price", "availability", "status"],
    foreignKeys: [
      { column: "request_id", ref: "requests.id" },
      { column: "provider_id", ref: "provider_profiles.id" },
    ],
    added: true,
  },
  {
    name: "conversations",
    columns: ["id", "created_at"],
    foreignKeys: [
      { column: "requester_id", ref: "users.id" },
      { column: "provider_id", ref: "provider_profiles.id" },
      { column: "request_id", ref: "requests.id", note: "nullable" },
    ],
    added: true,
  },
  {
    name: "messages",
    columns: ["id", "body", "sent_at"],
    foreignKeys: [
      { column: "conversation_id", ref: "conversations.id" },
      { column: "sender_id", ref: "users.id" },
    ],
    added: true,
  },
  {
    name: "payment_methods",
    columns: ["id", "type", "last4", "is_default"],
    foreignKeys: [{ column: "user_id", ref: "users.id" }],
    added: true,
  },
  {
    name: "payments",
    columns: ["id", "amount", "status", "paid_at"],
    foreignKeys: [
      { column: "request_id", ref: "requests.id" },
      { column: "payer_id", ref: "users.id" },
      { column: "payment_method_id", ref: "payment_methods.id" },
    ],
    added: true,
  },
  {
    name: "reviews",
    columns: ["id", "rating", "comment", "created_at"],
    foreignKeys: [
      { column: "request_id", ref: "requests.id" },
      { column: "reviewer_id", ref: "users.id" },
      { column: "reviewee_id", ref: "provider_profiles.id" },
    ],
  },
  {
    name: "notifications",
    columns: ["id", "type", "read_at"],
    foreignKeys: [
      { column: "user_id", ref: "users.id" },
      { column: "request_id", ref: "requests.id", note: "nullable" },
    ],
    added: true,
  },
];

export function Wednesday3_1() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 3.1</p>
      <h2 className="v-h2">IA to schema, from memory</h2>
      <p className="v-body practice-doc__intro">
        Without looking at Vello's screens, sketch a simple site map for the
        Requester role — top-level sections and what lives under each. Then,
        beside it, draft the tables you'd expect: entities, key columns, and
        the foreign keys that connect them. Mark where the IA structure and
        the schema agree and where they diverge.
      </p>

      <PracticeDivider />

      <div className="practice-callout">
        <span className="v-eyebrow">Original lacks</span>
        <div className="practice-callout__badges">
          {MISSING_AT_FIRST_LOOK.map((feature) => (
            <Badge key={feature} variant="accent">
              {feature}
            </Badge>
          ))}
        </div>
        <span className="v-body">
          — missing from the site map on first look, then added to the schema
          to agree with the IA diagram.
        </span>
      </div>

      <div className="practice-two-col">
        <div className="practice-two-col__col">
          <p className="v-eyebrow practice-doc__label">Site map, from memory</p>
          <img
            className="practice-two-col__image"
            src="/Sitemap.png"
            alt="Requester-role site map sketched from memory, before checking Vello's actual screens"
          />
        </div>

        <div className="practice-two-col__col">
          <p className="v-eyebrow practice-doc__label">Schema, from memory</p>
          <div className="practice-schema-list">
            {tables.map((table) => (
              <div className="practice-schema-table" key={table.name}>
                <div className="practice-schema-table__header">
                  <Badge variant={table.added ? "accent" : "brand"}>{table.name}</Badge>
                </div>
                <p className="v-mono practice-schema-table__columns">
                  {table.columns.join(", ")}
                </p>
                {table.foreignKeys?.map((fk) => (
                  <p className="v-mono practice-schema-table__fk" key={fk.column}>
                    {fk.column} → {fk.ref}
                    {fk.note && ` (${fk.note})`}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
