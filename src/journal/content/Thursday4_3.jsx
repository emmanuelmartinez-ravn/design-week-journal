import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const prompt = `Here is the Vello design system (its color, type, and spacing tokens)
and one screen. List every visual value on the screen - colors, font
sizes, spacings - and for each, tell me whether it matches a defined
token or is a one-off that breaks the system. Flag the off-system values
as consistency risks, and suggest the token each should map to.`;

const findings = [
  {
    topic: "Border width",
    verdict: "Missing",
    variant: "danger",
    detail:
      "A hairline border width (commonly ~1.5px) tends to repeat across nearly every interactive component, but token sets often never promote it to a dedicated variable. It stays a hardcoded magic number instead of a token, even though it's reused everywhere.",
  },
  {
    topic: "Component-internal spacing on compact elements (status pills, chips, small badges)",
    verdict: "Adoption gap",
    variant: "warning",
    detail:
      "Usually not a missing token so much as an adoption gap: the component's own padding/gap/dot-size values are hardcoded pixels with no reference to the spacing scale at all, even though the scale exists and could cover them.",
  },
  {
    topic: "Intermediate type sizes",
    verdict: "Missing",
    variant: "danger",
    detail:
      "A type scale that jumps from one step straight to the next (e.g. 12px to 14px) with nothing between leaves no token to reach for when a design lands in between, so components hardcode an odd in-between size instead.",
  },
];

export function Thursday4_3() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 4.3</p>
      <h2 className="v-h2">Token or hardcode?</h2>
      <p className="v-body practice-doc__intro">
        Build intuition for design-system consistency. Give Claude the Vello
        design system reference and one screen. List every visual value on
        the screen — colors, font sizes, spacings — and for each, tell
        whether it matches a defined token or is a one-off that breaks the
        system. Flag the off-system values as consistency risks, and suggest
        the token each should map to.
      </p>

      <p className="v-eyebrow practice-doc__label">Prompt</p>
      <pre className="practice-code">{prompt}</pre>

      <PracticeDivider />

      <p className="v-eyebrow practice-doc__label">
        Which tokens are actually missing, in general
      </p>
      <div className="practice-qa-list">
        {findings.map((f) => (
          <div className="practice-qa-item" key={f.topic}>
            <p className="practice-qa-item__question">
              <strong>{f.topic}</strong>{" "}
              <Badge variant={f.variant}>{f.verdict}</Badge>
            </p>
            <p className="v-body-sm v-muted">{f.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
