import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const sections = [
  {
    title: "1. Container",
    rows: [
      { property: "Background", value: "#FFFFFF", token: "--surface-card" },
      { property: "Border", value: "1.5px solid #E5E4D6", token: "--border-default" },
      { property: "Corner radius", value: "20px", token: "--radius-lg" },
      { property: "Padding", value: "15px", token: "none", note: "--space-4 is 16px" },
    ],
  },
  {
    title: "2. Avatar",
    rows: [
      { property: "Size", value: "64 × 64px", token: "none" },
      { property: "Corner radius", value: "999px", token: "--radius-pill" },
    ],
  },
  {
    title: "3. Name",
    rows: [
      { property: "Type family", value: "Bricolage Grotesque", token: "--font-display" },
      { property: "Type size", value: "17px", token: "none", note: "scale runs 16 / 18 / 20" },
      { property: "Weight", value: "700", token: "--fw-bold" },
      { property: "Colour", value: "#1B1C18", token: "--text-strong" },
    ],
  },
  {
    title: "4. Availability pill",
    rows: [
      { property: "Type family", value: "Hanken Grotesk", token: "--font-sans" },
      { property: "Type size", value: "12px", token: "--text-xs" },
      { property: "Weight", value: "600", token: "--fw-semibold" },
      { property: "Text colour", value: "#C5421F", token: "--coral-700" },
      { property: "Background", value: "#FCE3D9", token: "--coral-100" },
      { property: "Corner radius", value: "999px", token: "--radius-pill" },
    ],
  },
  {
    title: "5. Bio line",
    rows: [
      { property: "Type size", value: "13.5px", token: "none", note: "--text-sm is 14px" },
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
      { property: "Text colour", value: "#466621", token: "--green-700" },
      { property: "Background", value: "#F5F8EC", token: "--green-50" },
      { property: "Corner radius", value: "999px", token: "--radius-pill" },
    ],
  },
  {
    title: "8. Rating stars",
    rows: [
      { property: "Star size", value: "1em", token: "--text-sm" },
      { property: "Filled colour", value: "#F4B740", token: "--amber-500" },
      { property: "Empty colour", value: "#D6D6C6", token: "--ink-200" },
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
      { property: "Size", value: "26 × 26px", token: "none" },
      { property: "Position", value: "absolute, top: 14px / right: 14px", token: "none" },
      { property: "Corner radius", value: "999px", token: "--radius-pill" },
      { property: "Icon colour", value: "#8D8F80", token: "--ink-400" },
      { property: "Background", value: "#EFEEE1", token: "--ink-100" },
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
                  </>
                ) : (
                  <code className="v-mono">{row.token}</code>
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
