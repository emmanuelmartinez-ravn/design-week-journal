import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const prompt = `Here is the Vello design system (its color, type, and spacing tokens)
and one screen. List every visual value on the screen - colors, font
sizes, spacings - and for each, tell me whether it matches a defined
token or is a one-off that breaks the system. Flag the off-system values
as consistency risks, and suggest the token each should map to.`;

// Observed values come from the provider card on the home screen (measured
// in Friday 5.1) and from Vello's own component source.
const findings = [
  {
    topic: "Border width",
    verdict: "Missing",
    variant: "danger",
    observed: "1.5px solid on the provider card. Card, ProviderCard and Tag each hardcode the same 1.5px.",
    closest: "None. Vello has border colour tokens (--border-default, --border-strong) but no border-width token.",
    why: "The outlined, flat card is Vello's whole surface style, so this one number sits on every card in the feed. Changing it means finding it in three components and in any app code that copied the card.",
  },
  {
    topic: "Chip and pill spacing (availability pill, walk-time chip)",
    verdict: "Adoption gap",
    variant: "warning",
    observed: "Badge pads 4px 9px (sm) and 6px 12px (md) with a 5px gap; Tag pads 8px 14px with a 7px gap.",
    closest: "--space-1 (4px), --space-2 (8px), --space-3 (12px). The scale exists, but 9, 5, 7 and 14 are off it.",
    why: "The availability pill and walk-time chip are the hyperlocal signals Vello sells on, and they repeat on every card, so off-scale padding multiplies down the feed.",
  },
  {
    topic: "Intermediate type sizes",
    verdict: "Missing",
    variant: "danger",
    observed: "Provider name at 17px, bio at 13.5px. Badge md also uses 13px.",
    closest: "--text-base (16px) or --text-md (18px) for the name; --text-sm (14px) for the bio.",
    why: "The provider's name is the first thing a neighbour scans for. With no step at 17px, every new card built from this screen has to guess between 16 and 18.",
  },
  {
    topic: "Card padding",
    verdict: "Drift",
    variant: "warning",
    observed: "15px on the home screen's provider card. ProviderCard ships 16px; Card ships 14 / 20 / 28px.",
    closest: "--space-4 (16px), or Card padding=\"sm\" (14px). Sent to the designer in Friday 5.1.",
    why: "Three answers for the same card means a ProviderCard and a Card-built card won't line up when they sit next to each other in the feed.",
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
        Which tokens are missing on Vello's home screen (provider card)
      </p>
      <div className="practice-qa-list">
        {findings.map((f) => (
          <div className="practice-qa-item" key={f.topic}>
            <p className="practice-qa-item__question">
              <strong>{f.topic}</strong>{" "}
              <Badge variant={f.variant}>{f.verdict}</Badge>
            </p>
            <p className="v-body-sm">
              <strong>Observed:</strong> {f.observed}
            </p>
            <p className="v-body-sm">
              <strong>Closest Vello token:</strong> {f.closest}
            </p>
            <p className="v-body-sm v-muted">{f.why}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
