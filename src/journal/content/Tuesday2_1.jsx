import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const questions = [
  {
    text: "Why do requesters drop off before completing a booking?",
    paradigm: "Quantitative",
    method: "Analytics",
    impact: "Event to log",
  },
  {
    text: "What percentage of providers respond within an hour?",
    paradigm: "Quantitative",
    method: "Analytics",
    impact: "None",
  },
  {
    text: "Can a first-time admin figure out how to approve a provider?",
    paradigm: "Qualitative",
    method: "Usability test",
    impact: "Event to log",
  },
  {
    text: 'What does "trust" actually mean to a Vello requester?',
    paradigm: "Qualitative",
    method: "Interview",
    impact: "None",
  },
  {
    text: "Which neighborhoods have the most unmet demand?",
    paradigm: "Quantitative",
    method: "Analytics",
    impact: "Event to log",
  },
  {
    text: "Is our new onboarding flow easier than the old one?",
    paradigm: "Quantitative",
    method: "Survey",
    impact: "None",
  },
];

const paradigms = [
  {
    paradigm: "Quantitative",
    why: "Tracked by numerical metrics.",
  },
  {
    paradigm: "Qualitative",
    why: "Descriptive: tracks experiences and behaviours.",
  },
];

function paradigmVariant(paradigm) {
  return paradigm === "Qualitative" ? "brand" : "info";
}

export function Tuesday2_1() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 2.1</p>
      <h2 className="v-h2">Match the method to the question</h2>
      <p className="v-body practice-doc__intro">
        For each Vello question, decide whether you'd reach for{" "}
        <strong>qualitative</strong> or <strong>quantitative</strong> research
        first, and name the method (interview, survey, usability test,
        analytics). Then add: which answer would change something you'd
        build — a schema field, an event to log, an endpoint?
      </p>
      <PracticeDivider />
      <p className="v-eyebrow practice-doc__label">Matched methods</p>
      <ol className="practice-list">
        {questions.map((q) => (
          <li key={q.text}>
            <span className="practice-list__text">
              {q.text}
              <br />
              <span className="v-mono v-eyebrow">{q.method}</span>
            </span>
            <Badge className="practice-list__badge" variant={paradigmVariant(q.paradigm)}>
              {q.paradigm}
            </Badge>
            <Badge
              className="practice-list__badge"
              variant={q.impact === "None" ? "neutral" : "accent"}
            >
              {q.impact}
            </Badge>
          </li>
        ))}
      </ol>

      <h3 className="v-h3 practice-doc__section">
        What separates the two
      </h3>
      <ul className="practice-phase-list">
        {paradigms.map((p) => (
          <li key={p.paradigm}>
            <Badge
              className="practice-phase-list__phase"
              variant={paradigmVariant(p.paradigm)}
            >
              {p.paradigm}
            </Badge>
            <span className="practice-phase-list__text">{p.why}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
