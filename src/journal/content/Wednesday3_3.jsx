import { PracticeDivider } from "../PracticeDivider";

const prompt = `Based on Vello's product brief, list the 6-8 core "objects" in the
product. For each, give its key attributes and its relationships to the
other objects. Then show the same set as a simple relational data model.
Flag any place where the UX structure and the data model might disagree.
Check the relationships against the brief yourself. Does a Booking belong
to one Request or many? Can a Provider serve more than one Neighborhood?
Where the brief is silent, note it as an open question.`;

const rows = [
  {
    table: "users",
    keyColumns: "id, name, role, verified_status",
    foreignKeys: "neighborhood_id → neighborhoods.id",
  },
  {
    table: "neighborhoods",
    keyColumns: "id, name, geo_scope",
    foreignKeys: "—",
  },
  {
    table: "provider_profiles",
    keyColumns: "id, category, bio, rating_avg",
    foreignKeys: "user_id → users.id; neighborhood_id → neighborhoods.id",
  },
  {
    table: "services",
    keyColumns: "id, category, description, base_price",
    foreignKeys: "provider_id → provider_profiles.id",
  },
  {
    table: "bookings",
    keyColumns: "id, status, scheduled_at",
    foreignKeys:
      "requester_id → users.id; service_id → services.id; accepted_quote_id → quotes.id",
  },
  {
    table: "quotes",
    keyColumns: "id, price, availability, status",
    foreignKeys: "booking_id → bookings.id; provider_id → provider_profiles.id",
  },
  {
    table: "messages",
    keyColumns: "id, body, sent_at",
    foreignKeys: "booking_id → bookings.id; sender_id → users.id",
  },
  {
    table: "payments",
    keyColumns: "id, amount, status",
    foreignKeys: "booking_id → bookings.id; payer_id → users.id",
  },
  {
    table: "reviews",
    keyColumns: "id, rating, comment",
    foreignKeys:
      "booking_id → bookings.id; reviewer_id → users.id; reviewee_id → provider_profiles.id",
  },
];

export function Wednesday3_3() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 3.3</p>
      <h2 className="v-h2">Objects to tables</h2>
      <p className="v-body practice-doc__intro">
        Make the IA-to-data-model bridge concrete.
      </p>

      <p className="v-eyebrow practice-doc__label">Prompt</p>
      <pre className="practice-code">{prompt}</pre>

      <PracticeDivider />

      <p className="v-eyebrow practice-doc__label">Relational model</p>
      <table className="practice-table">
        <thead>
          <tr>
            <th>Table</th>
            <th>Key columns</th>
            <th>Foreign keys</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.table}>
              <td>
                <code className="v-mono">{row.table}</code>
              </td>
              <td>
                <span className="v-mono">{row.keyColumns}</span>
              </td>
              <td>
                <span className="v-mono">{row.foreignKeys}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="v-h3 practice-doc__section">
        Where UX structure and data model disagree
      </h3>
      <p className="v-body practice-doc__intro">
        <strong>
          Messages scoped by <code className="v-mono">booking_id</code>, but
          the IA nested chat under "Pending bookings" specifically.
        </strong>{" "}
        The schema has no concept of "pending" vs. "accepted" chat — a{" "}
        <code className="v-mono">messages</code> row just belongs to a
        booking, full stop. If a requester should be able to message a
        provider after the job is complete (to ask a follow-up, dispute
        something), the IA placement wouldn't support that, but the schema
        would.
      </p>
    </div>
  );
}
