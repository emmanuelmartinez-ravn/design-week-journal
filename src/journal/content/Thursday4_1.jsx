import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const rankings = [
  {
    rank: 1,
    title: "Your Open Request card",
    cues: [
      { mechanism: "Scale", detail: "Occupies at least 1/3 of the screen" },
      { mechanism: "Weight", detail: "Uses semibold weight" },
      { mechanism: "Position", detail: "Is centered on the screen" },
      {
        mechanism: "Spacing",
        detail: "Has more padding and doesn't share space with other elements",
      },
    ],
    tokensBehind: "Size, text weight, padding, margin, text colors",
  },
  {
    rank: 2,
    title: "Provider card (Maya Rivera example)",
    cues: [
      { mechanism: "Scale", detail: "Occupies at least 1/3 of the screen" },
      { mechanism: "Weight", detail: "Uses semibold weight" },
      { mechanism: "Color", detail: "Has the biggest image on screen" },
    ],
    tokensBehind: "Size, text weight, role colors, text colors",
    oneOff: '"from $24 / walk" text',
  },
  {
    rank: 3,
    title: 'Plus "+" button (main action)',
    cues: [
      { mechanism: "Scale", detail: "Is the biggest button" },
      { mechanism: "Position", detail: "Is in the nav bar and centered" },
      { mechanism: "Color", detail: "Is the primary color" },
    ],
    tokensBehind: "Size, role colors",
  },
];

export function Thursday4_1() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 4.1</p>
      <h2 className="v-h2">Rank the hierarchy — and find the tokens behind it</h2>
      <p className="v-body practice-doc__intro">
        Note the first three things your eye lands on, in order, and name the
        mechanism for each (scale, weight, color, position, spacing). Then
        ask: which of those cues is driven by a design-system{" "}
        <strong>token</strong> (a type scale, a color role) versus a one-off?
        Where prominence and importance disagree, that's a hierarchy note.
      </p>

      <PracticeDivider />

      <div className="practice-two-col">
        <div className="practice-two-col__col">
          <p className="v-eyebrow practice-doc__label">Vello home screen</p>
          <img
            className="practice-two-col__image"
            src="/Homescreen.png"
            alt="Vello's home screen: location picker, search bar, category chips, an open request card, and a provider card for Maya Rivera"
          />
        </div>

        <div className="practice-two-col__col">
          <p className="v-eyebrow practice-doc__label">Hierarchy breakdown</p>
          <div className="practice-qa-list">
            {rankings.map((r) => (
              <div className="practice-qa-item" key={r.title}>
                <p className="practice-qa-item__question">
                  <Badge variant={r.rank === 1 ? "brand" : "neutral"}>
                    #{r.rank}
                  </Badge>{" "}
                  {r.title}
                </p>
                <ul className="practice-doc__list">
                  {r.cues.map((c) => (
                    <li key={c.mechanism}>
                      <strong>{c.mechanism}:</strong> {c.detail}
                    </li>
                  ))}
                </ul>
                <p className="v-body-sm v-muted">
                  Tokens behind: {r.tokensBehind}
                </p>
                {r.oneOff && (
                  <p className="v-body-sm v-muted">One-off: {r.oneOff}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
