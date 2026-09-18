import { PracticeDivider } from "../PracticeDivider";

const prompt = `Give me the simplest possible happy-path flow for a Vello requester
booking a provider: just the screens where everything goes right, no
edge cases. Keep it to 5-6 steps.
On your own, list every state and branch it ignores - empty, error, loading,
permission, cancellation, timeout, "provider unavailable" - aim for 8+. For
each, write the API response (status + shape) and the UI state it drives.
Then ask Claude for its list and compare.`;

const categories = [
  {
    title: "Happy path",
    variant: "success",
    states: [
      {
        state: "Home — success",
        trigger: "App opens, providers fetched",
        api: "200 OK",
        ui: "Page — provider/service list rendered",
      },
      {
        state: "Service detail — success",
        trigger: "Taps a provider/service card",
        api: "200 OK",
        ui: "Page — full service info, ratings, price",
      },
      {
        state: "New booking form — idle",
        trigger: 'Taps "Request"',
        api: "—",
        ui: "Page — empty form ready for input",
      },
      {
        state: "New booking — submitted",
        trigger: "Submits valid form",
        api: "201 Created",
        ui: "Page — redirects to booking detail (status: pending)",
      },
      {
        state: "Booking — accepted",
        trigger: "Provider responds, requester accepts quote",
        api: "200 OK",
        ui: 'Page — booking detail updates, "Pay now" CTA appears',
      },
      {
        state: "Payment — success",
        trigger: "Confirms payment",
        api: "200 OK / 201 Created",
        ui: "Modal — processing overlay, then success confirmation",
      },
      {
        state: "Rating — submitted",
        trigger: "Submits rating/review",
        api: "201 Created",
        ui: "Modal — rating sheet closes, confirmation toast",
      },
    ],
  },
  {
    title: "Empty (no data yet)",
    variant: "neutral",
    states: [
      {
        state: "Home — empty",
        trigger: "App opens, no providers in neighborhood",
        api: "200 OK",
        ui: "Page — empty-state illustration + CTA (expand radius)",
      },
      {
        state: "New booking form — empty submit",
        trigger: "Submits form with no fields filled",
        api: "422 Unprocessable Entity",
        ui: "Inline — validation errors on each required field, form stays open",
      },
      {
        state: "Booking — no response",
        trigger: "Provider doesn't respond within window",
        api: "200 OK",
        ui: 'Page — banner "No response yet," option to cancel or re-post',
      },
    ],
  },
  {
    title: "Loading (waiting)",
    variant: "info",
    states: [
      {
        state: "Home — loading",
        trigger: "App opens, fetch in progress",
        api: "—",
        ui: "Page — skeleton/spinner over card list",
      },
      {
        state: "Service detail — loading",
        trigger: "Taps card, fetch in progress",
        api: "—",
        ui: "Page — skeleton/spinner in place of content",
      },
      {
        state: "Messages — loading",
        trigger: "Opens thread, fetching history",
        api: "—",
        ui: "Panel — spinner inside chat panel, input disabled",
      },
      {
        state: "Payment — loading",
        trigger: "Confirms payment, awaiting processor",
        api: "—",
        ui: "Modal — blocking spinner overlay, no dismiss",
      },
    ],
  },
  {
    title: "Error (something failed)",
    variant: "danger",
    states: [
      {
        state: "Home — error",
        trigger: "Provider fetch fails",
        api: "500 Internal Server Error",
        ui: "Page — error message + retry button, no cards shown",
      },
      {
        state: "Service detail — error",
        trigger: "Detail fetch fails",
        api: "500 Internal Server Error",
        ui: "Page — error message + retry button",
      },
      {
        state: "New booking form — error",
        trigger: "Submits invalid data",
        api: "422 Unprocessable Entity",
        ui: "Inline — field-level errors, form stays open, no navigation",
      },
      {
        state: "Messages — error",
        trigger: "Send or load fails",
        api: "500 Internal Server Error",
        ui: "Panel — inline error banner in chat, retry option per failed message",
      },
      {
        state: "Payment — error",
        trigger: "Card declined / processor fails",
        api: "402 Payment Required",
        ui: "Modal — error message, not charged, retry or change method",
      },
      {
        state: "Rating — error",
        trigger: "Rating submission fails",
        api: "500 Internal Server Error",
        ui: "Modal — error message, sheet stays open, retry enabled",
      },
    ],
  },
  {
    title: "Partial (some data)",
    variant: "warning",
    states: [
      {
        state: "Home — partial",
        trigger: "Provider data missing fields (e.g. photos)",
        api: "200 OK",
        ui: "Page — cards render with placeholder image/fallback text",
      },
      {
        state: "Service detail — partial",
        trigger: "Provider info incomplete",
        api: "200 OK",
        ui: 'Page — missing fields show "Not provided" placeholder',
      },
      {
        state: "New booking form — partial submit",
        trigger: "Submits with some required fields missing",
        api: "422 Unprocessable Entity",
        ui: "Inline — same as error state; field-level errors, form stays open",
      },
      {
        state: "Messages — partial",
        trigger: "Some messages fail to persist, gaps in history",
        api: "200 OK",
        ui: 'Panel — failed messages marked "not sent," rest of thread intact',
      },
      {
        state: "Rating — partial",
        trigger: "Submits rating only, or review only",
        api: "201 Created",
        ui: "Modal — accepted as valid, confirmation shown",
      },
    ],
  },
  {
    title: "Cancellation / mid-flow disruption",
    variant: "accent",
    states: [
      {
        state: "Booking — cancelled by requester (pre-accept)",
        trigger: "Requester cancels before any provider accepts",
        api: "200 OK",
        ui: "Page — booking marked cancelled, returns to Home",
      },
      {
        state: "Booking — cancelled by provider (post-accept)",
        trigger: "Provider cancels/goes unavailable after accepting",
        api: "200 OK",
        ui: "Banner — booking detail shows cancellation reason, routed back to Service detail / browse",
      },
      {
        state: "Quote — expired mid-review",
        trigger: "Requester takes too long to accept, quote times out",
        api: "200 OK",
        ui: "Page — quote marked expired, prompt to request again",
      },
      {
        state: "Payment — abandoned by requester",
        trigger: "Requester backs out of checkout before confirming",
        api: "—",
        ui: 'Modal — closes without charge, booking stays in "accepted, unpaid" state',
      },
      {
        state: "Payment — session expired mid-checkout",
        trigger: "Auth token expires between accepting quote and paying",
        api: "401 Unauthorized",
        ui: "Redirect — to Login, then deep-links back into Payment on success",
      },
      {
        state: "Payment — cancelled post-charge (refund)",
        trigger: "Requester or provider cancels after payment succeeded",
        api: "200 OK",
        ui: "Page — booking marked cancelled/refunded, transaction history updated",
      },
      {
        state: "Messages — thread closed on cancellation",
        trigger: "Booking cancelled while a chat thread is open",
        api: "200 OK",
        ui: 'Panel — thread shows "This booking was cancelled" banner, input disabled',
      },
    ],
  },
];

function CategorySection({ title, variant, states }) {
  return (
    <>
      <h3 className="v-h3 practice-doc__section">{title}</h3>
      <table className="practice-table" data-variant={variant}>
        <thead>
          <tr>
            <th>State</th>
            <th>Trigger</th>
            <th>API</th>
            <th>UI</th>
          </tr>
        </thead>
        <tbody>
          {states.map((s) => (
            <tr key={s.state}>
              <td>
                <strong>{s.state}</strong>
              </td>
              <td>{s.trigger}</td>
              <td>
                <code className="v-mono">{s.api}</code>
              </td>
              <td>{s.ui}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function Wednesday3_2() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 3.2</p>
      <h2 className="v-h2">Break a happy path → derive the API states</h2>
      <p className="v-body practice-doc__intro">
        Generate a deliberately naive flow, then turn everything it skips
        into a state-and-response contract.
      </p>

      <p className="v-eyebrow practice-doc__label">Prompt</p>
      <pre className="practice-code">{prompt}</pre>

      <PracticeDivider />

      {categories.map((category) => (
        <CategorySection key={category.title} {...category} />
      ))}
    </div>
  );
}
