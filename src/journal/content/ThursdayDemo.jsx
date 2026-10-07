import { PracticeDivider } from "../PracticeDivider";

const prompt = `Critique this Vello screen against the attached design system. Structure
it as: 1) visual hierarchy, 2) consistency with design-system tokens, 3)
accessibility (contrast ratios, touch targets, focus, semantics), 4)
missing UI states. For each issue: severity, the evidence, and the
principle or standard it violates. Do not soften findings.`;

const firstPass = [
  { category: "Visual hierarchy", items: ["None"] },
  {
    category: "Token consistency",
    items: ["Errors use the wrong color (should be `--red-600`, but uses `--red-700`)"],
  },
  {
    category: "Accessibility",
    items: [
      'Landmark regions are missing (e.g. the "Post a request" header isn\'t inside a `<header>`)',
      "Missing headers",
      "Input placeholder contrast ratio fails",
      "Chips are smaller than 24×24px",
      "No `<form>` element",
    ],
  },
  { category: "Missing UI states", items: ["No unsaved state"] },
];

const secondPass = [
  {
    category: "Visual hierarchy",
    items: [
      "Groups without weights",
      'Budget "per ..." populates even when a category isn\'t selected',
      '"Budget" and "Anything else" legends share the same styling despite serving different purposes',
    ],
  },
  {
    category: "Token consistency",
    items: [
      "Spacing off the 4px rhythm",
      "There's no textarea component, so it borrows input styles",
      "AppBar title uses the wrong size",
    ],
  },
  {
    category: "Accessibility",
    items: [
      "Contrast ratios fail",
      "The legends have no margins",
      "Cancel button is smaller than 24×24px",
      "Focus is indicated on the border, should be on the ring",
      'Errors are missing `role="alert"`',
      "Visible labels don't have accessible names",
      "Radio-behavior chips are exposed to unrelated controls",
    ],
  },
  {
    category: "Missing UI states",
    items: [
      "No error recovery",
      "No submitting state",
      "Tab bar shouldn't be available during the task",
      "Validation only triggers on submit",
      "No indication of which block failed before submitting",
      'Missing attachments on "Anything else?"',
    ],
  },
];

function PassSection({ title, groups }) {
  return (
    <>
      <h3 className="v-h3 practice-doc__section">{title}</h3>
      {groups.map((g) => (
        <div key={g.category}>
          <p className="v-eyebrow practice-doc__label">{g.category}</p>
          <ul className="practice-doc__list">
            {g.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export function ThursdayDemo() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Demo</p>
      <h2 className="v-h2">Audit a Vello component — token fidelity + accessibility</h2>
      <ol className="practice-doc__list">
        <li>
          Your mentor assigns you a Vello screen or component that contains
          planted issues.
        </li>
        <li>
          First pass, no AI: note hierarchy, token consistency, and
          accessibility problems using today's vocabulary. This pass comes
          first.
        </li>
        <li>
          Second pass: give Claude the screen and the design system; ask for
          a structured critique — hierarchy, token consistency,
          accessibility (contrast, targets, focus, semantics), and missing
          states.
        </li>
        <li>
          Compare: what did Claude catch that you missed? What did it miss
          or get confidently wrong? Resolve every disagreement against the
          standard or the system.
        </li>
      </ol>

      <p className="v-eyebrow practice-doc__label">Starter prompt</p>
      <pre className="practice-code">{prompt}</pre>

      <PracticeDivider />

      <p className="v-eyebrow practice-doc__label">
        Chosen screen: post a request form
      </p>
      <img
        className="practice-spec-image"
        src="/PostRequest.png"
        alt="Vello's post-a-request form: category chips, a title input, availability chips, and starting-date chips, each with a validation error shown underneath"
      />

      <PassSection title="1. First pass (no AI)" groups={firstPass} />
      <PassSection title="2. Second pass (Claude)" groups={secondPass} />

      <p className="v-body practice-doc__intro">
        <strong>Why the second pass found more:</strong> Claude can analyze
        the design system's token definitions in more depth, checking each
        value on the screen against them.
      </p>
    </div>
  );
}
