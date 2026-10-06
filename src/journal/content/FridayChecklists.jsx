import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

// Each item points back to the practice it was learned in, so the
// checklist is traceable to the week's work rather than generic advice.
const handoffItems = [
  {
    source: "5.1",
    text: "Every visual value maps to a semantic token, or is marked unresolved with a question for the designer. No guessing.",
  },
  {
    source: "5.2",
    text: "Values that fall between token steps are rounded to the nearest step, and the rounding is written down (e.g. 15px padding → Card padding=\"sm\", 14px).",
  },
  {
    source: "5.4",
    text: "No hex/rgb literals, no inline styles, and no raw ramp token (--green-700) where a semantic alias covers it.",
  },
  {
    source: "Wed",
    text: "Every state the flow can reach is specified (loading, empty, error, success), each with its API status and what the UI shows.",
  },
  {
    source: "Wed",
    text: "Assumptions are marked and checked against the brief before anyone builds on them.",
  },
  {
    source: "Demo",
    text: "A component the system doesn't have (Textarea) is flagged as missing and built from the nearest component's tokens, not faked.",
  },
  {
    source: "Demo",
    text: "A gap baked into a vendored component (BottomNav's hardcoded badge color) is named as a known exception, not patched.",
  },
  {
    source: "5.3",
    text: "Accessibility floor: semantic element for each self-contained unit, every field has a real label, anything that looks tappable is keyboard-operable, AA contrast is checked, ARIA only where native semantics don't cover it.",
  },
  {
    source: "5.4",
    text: "The render is compared side by side with the reference, and every spec row ends as an exact match, a named rounding, or a flagged gap.",
  },
];

const supportItems = [
  {
    phase: "Discover",
    source: "Tue",
    text: "Turn verified research themes into the entities and attributes they imply, so the data model starts from what users said, not from what was easy to store.",
  },
  {
    phase: "Define",
    source: "1.3",
    text: "Draft a rough schema against each new requirement and surface the open forks (the ??? fields) to product, instead of quietly picking the cheaper option.",
  },
  {
    phase: "Architect",
    source: "3.3",
    text: "Put the site map next to the schema and flag where UX structure and data model disagree.",
  },
  {
    phase: "Architect",
    source: "Wed",
    text: "Write the flow's state table (state → trigger → API status → UI) and the endpoint list, so missing states show up before design does.",
  },
  {
    phase: "Design",
    source: "4.2",
    text: "Audit the components a screen is built from for accessibility (labels, aria-describedby, contrast, target size) before they spread into new screens.",
  },
  {
    phase: "Design",
    source: "4.3",
    text: "Check the screen's values against the token set and report the gaps the system is missing, so the fix lands in the system rather than in one screen.",
  },
  {
    phase: "Validate",
    source: "5.1",
    text: "Spec the design without an inspect panel and send the designer questions, not guesses.",
  },
  {
    phase: "Validate",
    source: "5.4",
    text: "Encode the design system's rules as guardrails (CLAUDE.md, rules, a skill) so AI-generated code stays on-system by default.",
  },
];

export function FridayChecklists() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Close of week</p>
      <h2 className="v-h2">Handoff and design-support checklists</h2>
      <p className="v-body practice-doc__intro">
        Assemble the week into two checklists: a handoff checklist, and an
        engineering design-support checklist — the concrete list of what
        engineering can do to make design work better, grown from your
        Monday touchpoints.
      </p>

      <PracticeDivider />

      <h3 className="v-h3 practice-doc__section">Handoff checklist</h3>
      <p className="v-body practice-doc__intro">
        What has to be true before a Vello component counts as handed off.
        Each item names the practice it came from.
      </p>
      <ul className="practice-phase-list">
        {handoffItems.map((item) => (
          <li key={item.text}>
            <Badge variant="neutral" className="practice-phase-list__phase">
              {item.source}
            </Badge>
            <span className="practice-phase-list__text">{item.text}</span>
          </li>
        ))}
      </ul>

      <h3 className="v-h3 practice-doc__section">
        Engineering design-support checklist
      </h3>
      <p className="v-body practice-doc__intro">
        One or more contributions per design phase, starting from the
        Define touchpoint in Practice 1.3 and filled in with what the rest
        of the week actually did.
      </p>
      <ul className="practice-phase-list">
        {supportItems.map((item) => (
          <li key={item.text}>
            <Badge variant="brand" className="practice-phase-list__phase">
              {item.phase}
            </Badge>
            <span className="practice-phase-list__text">
              {item.text}{" "}
              <span className="v-muted">({item.source})</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
