import { PracticeDivider } from "../PracticeDivider";

const prompt = `Draft a user flow for [task] in Vello as a flowchart. Include every
screen, user decision, and system state - loading, error, empty, success.
Mark assumptions with [ASSUMPTION] so I can verify them against the brief.
Then turn it into a state table (state -> trigger -> API status -> UI) and
a list of endpoints with their states.`;

const assumptions = [
  {
    assumption:
      "Form loading fetches categories/providers — the brief doesn't say whether the request form is pre-populated with category/provider data or just free text.",
    response:
      "The brief contains some categories as Cleaning, Handyman, etc. These don't exist in the mocked schema, so they should be added to the schema.",
  },
  {
    assumption:
      'A "match check" happens right after posting — assuming the system checks for nearby providers immediately and can show an empty state before the request even goes live. Equally plausible a request just posts and providers respond (or don\'t) with no explicit "no matches" screen.',
    response:
      'The brief doesn\'t contain a "match check" step, after posting the request it just posts and providers respond, this could be a feature in a future iteration.',
  },
  {
    assumption:
      "Not diagrammed, but worth flagging: a permission-denied branch (e.g. unverified account trying to post) isn't shown — the brief only mentions verification for providers, not requesters, so it's left out rather than assumed. Confirm before adding.",
    response:
      "The brief doesn't contain a permission-denied system yet, since it only contains a single view from user perspective, but it should be considered in the future.",
  },
];

const stateRows = [
  {
    state: "Loading (form)",
    trigger: 'User taps "New request"',
    api: "—",
    ui: "Skeleton/spinner on form fields",
  },
  {
    state: "Idle (form)",
    trigger: "Categories loaded",
    api: "200 OK",
    ui: "Form fields interactive",
  },
  {
    state: "Validating",
    trigger: "User taps submit",
    api: "—",
    ui: "Inline errors if invalid, else proceeds",
  },
  {
    state: "Loading (submit)",
    trigger: "Valid form submitted",
    api: "—",
    ui: "Submit button spinner, form locked",
  },
  {
    state: "Error (submit)",
    trigger: "Request rejected/failed",
    api: "422 Unprocessable Entity / 500 Internal Server Error",
    ui: "Error banner, form preserved, retry enabled",
  },
  {
    state: "Empty (matches)",
    trigger: "Request created, 0 providers nearby",
    api: "201 Created",
    ui: 'Empty state: "No providers nearby yet"',
  },
  {
    state: "Success",
    trigger: "Request created, ≥1 match possible",
    api: "201 Created",
    ui: "Confirmation toast/screen",
  },
  {
    state: "Pending",
    trigger: "Redirected after success",
    api: "200 OK",
    ui: 'Status "Awaiting responses"',
  },
];

const endpointRows = [
  {
    endpoint: "/categories (or /providers/nearby)",
    method: "GET",
    states: "200 OK · 500 Internal Server Error · 200 OK (empty)",
  },
  {
    endpoint: "/requests",
    method: "POST",
    states:
      "201 Created · 422 Unprocessable Entity · 401 Unauthorized · 500 Internal Server Error",
  },
  {
    endpoint: "/requests/:id",
    method: "GET",
    states: "200 OK · 404 Not Found · 500 Internal Server Error",
  },
  {
    endpoint: "/requests/:id/matches",
    method: "GET",
    states: "200 OK · 200 OK (empty)",
    note: "only if match-check is real [ASSUMPTION]",
  },
];

export function WednesdayDemo() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Demo</p>
      <h2 className="v-h2">
        Draft the "post a request" flow — then stress-test the unhappy paths
      </h2>
      <ol className="practice-doc__list">
        <li>
          Pick one Vello core task: post a request, respond as a provider, or
          verify a provider as admin. <strong>Chosen: post a request.</strong>{" "}
          It's a core part of the requester's flow in the app, so it has to
          be clear enough for requesters to fill in completely in a short
          time. That leads to fewer abandoned requests.
        </li>
        <li>
          Ask Claude to draft the full user flow as a diagram artifact —
          every screen, decision point, and system state, with assumptions
          marked.
        </li>
        <li>
          Stress-test it: "what if the provider never responds?", "where can
          the requester cancel?", "what does the admin see if verification
          fails?" Make Claude revise until the unhappy paths are covered.
        </li>
        <li>
          Translate the revised flow into a state table per screen and a list
          of endpoints with their response states. Name one gap between the
          flow and Vello's current screens.
        </li>
      </ol>

      <p className="v-eyebrow practice-doc__label">Starter prompt</p>
      <pre className="practice-code">{prompt}</pre>

      <PracticeDivider />

      <p className="v-eyebrow practice-doc__label">
        Flow diagram — posting a request
      </p>
      <img
        className="practice-flow-image"
        src="/post_request_flow_v2.png"
        alt="Flowchart for posting a request in Vello, covering the happy path and unhappy branches (validation error, request error, empty match state)"
      />
      <p className="v-body v-muted practice-doc__intro">
        Legend: blue = screen, amber = loading, gray = decision, red = error,
        purple = empty, green = success/terminal.
      </p>

      <h3 className="v-h3 practice-doc__section">
        Assumptions to verify against the brief
      </h3>
      <div className="practice-qa-list">
        {assumptions.map((a) => (
          <div className="practice-qa-item" key={a.assumption}>
            <p className="practice-qa-item__question">
              <strong>Assumption:</strong> {a.assumption}
            </p>
            <p className="practice-qa-item__question">
              <strong>Response:</strong> {a.response}
            </p>
          </div>
        ))}
      </div>

      <h3 className="v-h3 practice-doc__section">State table</h3>
      <table className="practice-table">
        <thead>
          <tr>
            <th>State</th>
            <th>Trigger</th>
            <th>API</th>
            <th>UI</th>
          </tr>
        </thead>
        <tbody>
          {stateRows.map((s) => (
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

      <h3 className="v-h3 practice-doc__section">Endpoints and states</h3>
      <table className="practice-table">
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Method</th>
            <th>States returned</th>
          </tr>
        </thead>
        <tbody>
          {endpointRows.map((e) => (
            <tr key={e.endpoint}>
              <td>
                <code className="v-mono">{e.endpoint}</code>
              </td>
              <td>
                <code className="v-mono">{e.method}</code>
              </td>
              <td>
                {e.states}
                {e.note && (
                  <>
                    <br />
                    <span className="v-body-sm v-muted">{e.note}</span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
