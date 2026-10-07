import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const sections = [
  {
    title: "1. Container",
    rows: [
      { property: "Background", value: "#FFFFFF", token: "--surface-card",
        why: "--white, --surface-raised and --text-inverse also resolve to #FFFFFF; --surface-card is the one named for a card." },
      { property: "Border", value: "1.5px solid #E5E4D6", token: "--border-default",
        why: "#E5E4D6 is --ink-150, and --border-default is the only alias that points to it. The 1.5px width has no token (see Thursday 4.3)." },
      { property: "Corner radius", value: "20px", token: "--radius-lg",
        why: "Exact match, and the scale marks --radius-lg as the card radius." },
      { property: "Padding", value: "15px", token: "none", note: "--space-4 is 16px",
        question: "Should this be 14px (Card's padding=\"sm\") or 16px (--space-4)?" },
    ],
  },
  {
    title: "2. Avatar",
    rows: [
      { property: "Size", value: "64 × 64px", token: "none",
        question: "Should this use the Avatar component's lg size (64px)?" },
      { property: "Corner radius", value: "999px", token: "--radius-pill" },
    ],
  },
  {
    title: "3. Name",
    rows: [
      { property: "Type family", value: "Bricolage Grotesque", token: "--font-display" },
      { property: "Type size", value: "17px", token: "none", note: "scale runs 16 / 18 / 20",
        question: "Should the name be --text-base (16px) or --text-md (18px)? Or is a 17px step missing from the scale?" },
      { property: "Weight", value: "700", token: "--fw-bold",
        why: "Matches --display-weight, which is --fw-bold, for the display face." },
      { property: "Colour", value: "#1B1C18", token: "--text-strong" },
    ],
  },
  {
    title: "4. Availability pill",
    rows: [
      { property: "Type family", value: "Hanken Grotesk", token: "--font-sans" },
      { property: "Type size", value: "12px", token: "--text-xs" },
      { property: "Weight", value: "600", token: "--fw-semibold" },
      { property: "Text colour", value: "#C5421F", token: "--coral-700",
        why: "The only alias with this value is --accent-press, a button's pressed state, not a status colour. Kept on the ramp; Vello is missing an availability text alias.", alias: true },
      { property: "Background", value: "#FCE3D9", token: "--accent-tint",
        why: "Was --coral-100. --accent-tint resolves to the same value, so the semantic alias wins." },
      { property: "Corner radius", value: "999px", token: "--radius-pill" },
    ],
  },
  {
    title: "5. Bio line",
    rows: [
      { property: "Type size", value: "13.5px", token: "none", note: "--text-sm is 14px",
        question: "Is the bio meant to be --text-sm (14px), or is 13.5px a deliberate step down?" },
      { property: "Colour", value: "#3D3F37", token: "--text-body" },
    ],
  },
  {
    title: "6. Price",
    rows: [
      { property: "Type family", value: "JetBrains Mono", token: "--font-mono" },
      { property: "Type size", value: "14px", token: "--text-sm" },
      { property: "Weight", value: "600", token: "--fw-semibold" },
      { property: "Colour", value: "#1B1C18", token: "--text-strong" },
    ],
  },
  {
    title: "7. Walk-time chip",
    rows: [
      { property: "Type family", value: "JetBrains Mono", token: "--font-mono" },
      { property: "Type size", value: "12px", token: "--text-xs" },
      { property: "Weight", value: "600", token: "--fw-semibold" },
      { property: "Text colour", value: "#466621", token: "--text-brand",
        why: "Was --green-700. --text-brand resolves to the same value, so the semantic alias wins." },
      { property: "Background", value: "#F5F8EC", token: "--green-50",
        why: "No alias resolves to --green-50 (--brand-primary-tint and --success-tint are --green-100). Kept on the ramp; Vello is missing a lighter brand tint alias. The 5.2 build uses --success-tint, the nearest alias, until one exists.", alias: true },
      { property: "Corner radius", value: "999px", token: "--radius-pill" },
    ],
  },
  {
    title: "8. Rating stars",
    rows: [
      { property: "Star size", value: "1em", token: "--text-sm",
        why: "1em follows the rating's font size, and Rating sm is 14px, the same as --text-sm." },
      { property: "Filled colour", value: "#F4B740", token: "--rating",
        why: "Was --amber-500. --rating resolves to the same value and is what the Rating component uses." },
      { property: "Empty colour", value: "#D6D6C6", token: "--ink-200",
        why: "The only alias with this value is --border-strong, which is a border. Kept on the ramp, as the Rating component does; Vello is missing an empty-star alias.", alias: true },
      {
        property: "Numeric value",
        value: "JetBrains Mono 600, #1B1C18, tabular-nums",
        token: "--font-mono, --fw-semibold, --text-strong",
      },
    ],
  },
  {
    title: "9. Tap affordance",
    rows: [
      { property: "Size", value: "26 × 26px", token: "none",
        question: "Is this the tap target, or only a cue that the whole card is tappable? At 26px it's under the 44px touch target." },
      { property: "Position", value: "absolute, top: 14px / right: 14px", token: "none",
        question: "Should this inset follow the card padding, so it moves if the padding token changes?" },
      { property: "Corner radius", value: "999px", token: "--radius-pill" },
      { property: "Icon colour", value: "#8D8F80", token: "--text-subtle",
        why: "Was --ink-400. --text-subtle resolves to the same value, so the semantic alias wins." },
      { property: "Background", value: "#EFEEE1", token: "--surface-sunken",
        why: "Was --ink-100. --surface-sunken resolves to the same value; --border-subtle does too, but this is a fill, not a border." },
    ],
  },
];

function SpecSection({ title, rows }) {
  return (
    <>
      <h3 className="v-h3 practice-doc__section">{title}</h3>
      <table className="practice-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Computed value</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.property}>
              <td>{row.property}</td>
              <td>
                <code className="v-mono">{row.value}</code>
              </td>
              <td>
                {row.token === "none" ? (
                  <>
                    <Badge variant="warning">Unresolved</Badge>
                    {row.note && (
                      <>
                        {" "}
                        <span className="v-body-sm v-muted">— {row.note}</span>
                      </>
                    )}
                    <br />
                    <span className="v-body-sm">
                      <strong>Ask the designer:</strong> {row.question}
                    </span>
                  </>
                ) : (
                  <>
                    <code className="v-mono">{row.token}</code>
                    {row.alias && (
                      <>
                        {" "}
                        <Badge variant="info">Needs alias</Badge>
                      </>
                    )}
                    {row.why && (
                      <>
                        <br />
                        <span className="v-body-sm v-muted">{row.why}</span>
                      </>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function Friday5_1() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 5.1</p>
      <h2 className="v-h2">Spec it without an inspect panel</h2>
      <p className="v-body practice-doc__intro">
        Open the Vello home screen export next to the design system. Pick
        one component — the provider card is a good one. Write the spec
        yourself: for every visual property (background, text color, type
        family and size, weight, spacing, corner radius, the walk-time
        chip, the rating stars) name the value you observe and the token it
        should map to. Where you can't resolve a value to a token, don't
        guess. Mark it unresolved and write the question you'd ask the
        designer.
      </p>

      <PracticeDivider />

      <p className="v-eyebrow practice-doc__label">Provider card — component spec</p>
      <img
        className="practice-spec-image"
        src="/ProviderCard.png"
        alt="Vello's provider card component, showing Maya Rivera's avatar, name, availability pill, bio, price, walk-time chip, and rating stars"
      />

      {sections.map((section) => (
        <SpecSection key={section.title} {...section} />
      ))}
    </div>
  );
}
