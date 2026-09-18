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
    category: "UX",
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
            <span className="practice-list__text">{d.text}</span>
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
    </div>
  );
}
