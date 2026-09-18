import { Avatar, Badge, Card, Rating } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";
import claudeMdSnippet from "../../../CLAUDE.md?raw";
import ruleText from "../../../.claude/rules/component-generation.md?raw";
import skillText from "../../../.claude/skills/vello-component-guardrails/SKILL.md?raw";

const claudeMdLine =
  claudeMdSnippet
    .split("\n")
    .find((line) => line.includes("component-generation.md")) ?? "";

export function Friday5_4() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 5.4</p>
      <h2 className="v-h2">Turn the design system into guardrails</h2>
      <p className="v-body practice-doc__intro">
        Translate Vello's design-system rules and the "trust scales
        locally" bet into a reusable guardrail — a CLAUDE.md, a Skill, or
        custom instructions, whichever you have: which tokens to use,
        banned hardcoded values, the a11y baseline, and a "compare the
        render against the reference screen before declaring it done"
        step. Then regenerate 5.2's component with it active and see if
        drift drops.
      </p>

      <PracticeDivider />

      <p className="v-eyebrow practice-doc__label">
        CLAUDE.md — one new line
      </p>
      <pre className="practice-code">{claudeMdLine}</pre>

      <p className="v-eyebrow practice-doc__label">
        The rule — .claude/rules/component-generation.md
      </p>
      <pre className="practice-code">{ruleText}</pre>

      <p className="v-eyebrow practice-doc__label">
        The skill — .claude/skills/vello-component-guardrails/SKILL.md
      </p>
      <pre className="practice-code">{skillText}</pre>

      <h3 className="v-h3 practice-doc__section">
        Regenerating 5.2 with the guardrail active
      </h3>
      <p className="v-body practice-doc__intro">
        Ran the skill against the same reference and the same 5.1 spec
        sheet, guardrail active this time instead of catching issues one
        at a time after the fact.
      </p>

      <div className="practice-two-col__col practice-doc__intro">
        <p className="v-eyebrow practice-doc__label">
          Reference — Vello screen export
        </p>
        <img
          className="practice-spec-image"
          src="/ProviderCard.png"
          alt="Vello's provider card component, showing Maya Rivera's avatar, name, availability pill, bio, price, walk-time chip, and rating stars"
        />
      </div>

      <div className="practice-two-col__col">
        <p className="v-eyebrow practice-doc__label">
          Regenerated — guardrail active
        </p>
        <Card
          as="article"
          aria-label="Maya Rivera, dog walker and pet sitter"
          tappable
          padding="sm"
          className="friday-provider-mock"
        >
          <div className="friday-provider-mock__top">
            <Avatar name="Maya Rivera" size="lg" verified />
            <div className="friday-provider-mock__body">
              <div className="friday-provider-mock__toprow">
                <span className="friday-provider-mock__name">Maya Rivera</span>
                <Badge variant="accent" size="sm" dot>
                  Available
                </Badge>
              </div>
              <p className="friday-provider-mock__bio">
                Dog walker & pet sitter, just up on 4th Ave.
              </p>
              <div className="friday-provider-mock__pricerow">
                <span className="friday-provider-mock__pricelabel">from</span>
                <span className="friday-provider-mock__price">$24</span>
                <span className="friday-provider-mock__pricelabel">/ walk</span>
              </div>
              <div className="friday-provider-mock__metarow">
                <span className="friday-provider-mock__walkchip">6 min walk</span>
                <Rating value={4.9} size="sm" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <h3 className="v-h3 practice-doc__section">Did drift drop?</h3>
      <p className="v-body practice-doc__intro">
        Yes — the regenerated render is identical to 5.2's, which is the
        point: both earlier fixes (the raw-ramp chip color, the div-soup
        semantics from 5.3) hold on a fresh pass instead of needing to be
        caught again. The guardrail's one new catch isn't visual: the
        rating still shows a bare aggregate score, matching the reference
        but not Vello's own stated bet against anonymous ratings — flagged
        in the write-up, not silently redesigned, since fidelity to the
        reference wins for this pass.
      </p>
    </div>
  );
}
