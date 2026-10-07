import { Badge } from "../../design-system";
import { categoryVariant } from "../categoryVariant";
import { PracticeDivider } from "../PracticeDivider";

const decisions = [
  {
    text: "Vello charges providers a flat monthly fee instead of per-booking commission.",
    category: "Product",
    impact: "Endpoint",
  },
  {
    text: 'The "Book now" button is persimmon, not forest green.',
    category: "Visual",
    impact: "None",
  },
  {
    text: "A requester must verify their address before they can post a need.",
    category: "UX",
    impact: "Data model",
  },
  {
    text: "Provider availability shows as a weekly calendar, not a list.",
    category: "UI",
    impact: "Data model",
  },
  {
    text: "Vello launches with dog-walking only, then expands.",
    category: "Product",
    // Kept on the page so the correction stays visible.
    firstAttempt: "UX",
    relabelWhy: "Which services Vello launches with is a scope decision, not how someone gets a task done.",
    impact: "Route",
  },
  {
    text: "Rating stars use the amber color from the design system.",
    category: "Visual",
    impact: "None",
  },
  {
    text: "After booking, the user lands on a confirmation screen, not back on the feed.",
    category: "UX",
    impact: "Route",
  },
  {
    text: "The admin verification queue sorts oldest-first.",
    category: "UI",
    impact: "Endpoint",
  },
  {
    text: "Body text is set in Hanken Grotesk at 17px.",
    category: "Visual",
    impact: "None",
  },
  {
    text: "Vello requires a real-name profile, not a username.",
    category: "Product",
    impact: "Data model",
  },
];

// Ordered top to bottom: each layer works inside what the one above decided.
const layers = [
  {
    category: "Product",
    why: "Decides what Vello is and why it exists: who it serves, what it offers, how it makes money.",
  },
  {
    category: "UX",
    why: "Decides how someone gets a task done within what Product set: the steps, their order, and the gates between them.",
  },
  {
    category: "UI",
    why: "Decides how one screen is laid out to support that path: which components, in what arrangement.",
  },
  {
    category: "Visual",
    why: "Decides how the UI looks: colour, type, spacing.",
  },
];

export function Monday1_1() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 1.1</p>
      <h2 className="v-h2">
        Sort the decisions — and flag the ones that hit your code
      </h2>
      <p className="v-body practice-doc__intro">
        Label each decision <strong>Product</strong>, <strong>UX</strong>,{" "}
        <strong>UI</strong>, or <strong>Visual</strong>. Then add a second mark:
        which ones would change a <strong>data model</strong>,{" "}
        <strong>an endpoint</strong>, or <strong>a route</strong> you'd have to
        build?
      </p>
      <PracticeDivider />
      <p className="v-eyebrow practice-doc__label">Sorted decisions</p>
      <ol className="practice-list">
        {decisions.map((d) => (
          <li key={d.text}>
            <span className="practice-list__text">
              {d.text}
              {d.firstAttempt && (
                <>
                  <br />
                  <span className="v-body-sm v-muted">
                    <strong>Relabelled:</strong> first attempt was{" "}
                    <s>{d.firstAttempt}</s>, now {d.category}. {d.relabelWhy}
                  </span>
                </>
              )}
            </span>
            <Badge className="practice-list__badge" variant={categoryVariant(d.category)}>
              {d.category}
            </Badge>
            <Badge
              className="practice-list__badge"
              variant={d.impact === "None" ? "neutral" : "info"}
            >
              {d.impact}
            </Badge>
          </li>
        ))}
      </ol>

      <h3 className="v-h3 practice-doc__section">
        What separates the four, from Product down to Visual
      </h3>
      <ul className="practice-phase-list">
        {layers.map((layer) => (
          <li key={layer.category}>
            <Badge
              className="practice-phase-list__phase"
              variant={categoryVariant(layer.category)}
            >
              {layer.category}
            </Badge>
            <span className="practice-phase-list__text">{layer.why}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
