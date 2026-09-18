import { CheckCircle2 } from "lucide-react";
import { Badge } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const prompt = `Here are 6 user-interview questions for Vello. For each, tell me whether
it's well-formed or flawed (leading, hypothetical, double-barreled, or
yes/no), and rewrite the flawed ones. Questions: "Would you use an app
that finds local help?" / "Tell me about the last time you needed help
around the house." / "Don't you think trust is important?" / "How do you
find and pay providers today?" / "What frustrates you about TaskRabbit?"
/ "Would you pay more for a verified neighbor?"`;

const questions = [
  {
    question: "Would you use an app that finds local help?",
    yourVerdict: ["Yes/no", "Leading", "Hypothetical"],
    rewrite: "How do you currently find help when you need it?",
  },
  {
    question: "Tell me about the last time you needed help around the house.",
    yourVerdict: ["Well-formed"],
  },
  {
    question: "Don't you think trust is important?",
    yourVerdict: ["Yes/no", "Leading"],
    rewrite: "What factors are important to you when deciding whether to hire a service?",
  },
  {
    question: "How do you find and pay providers today?",
    yourVerdict: ["Well-formed"],
    claudeVerdict: ["Double-barreled"],
    rewrite: ["How do you find providers today?", "How do you pay providers today?"],
  },
  {
    question: "What frustrates you about TaskRabbit?",
    yourVerdict: ["Well-formed"],
    claudeVerdict: ["Leading"],
    rewrite: "What has your experience with TaskRabbit been like?",
  },
  {
    question: "Would you pay more for a verified neighbor?",
    yourVerdict: ["Hypothetical", "Yes/no"],
    rewrite: "How do you decide how much to pay for local services?",
  },
];

function VerdictBadges({ terms }) {
  return (
    <>
      {terms.map((term) => (
        <Badge key={term} variant={term === "Well-formed" ? "success" : "danger"}>
          {term}
        </Badge>
      ))}
    </>
  );
}

export function Tuesday2_2() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 2.2</p>
      <h2 className="v-h2">Spot the leading question</h2>
      <p className="v-body practice-doc__intro">
        Interview quality lives or dies on question wording. Train your ear
        for it: write your own verdicts first, then compare. Where you
        disagree with Claude, decide who's right and why.
      </p>

      <p className="v-eyebrow practice-doc__label">Prompt</p>
      <pre className="practice-code">{prompt}</pre>

      <PracticeDivider />
      <p className="v-eyebrow practice-doc__label">Verdicts and rewrites</p>
      <div className="practice-qa-list">
        {questions.map((q) => (
          <div className="practice-qa-item" key={q.question}>
            <p className="practice-qa-item__question">"{q.question}"</p>
            <div className="practice-qa-item__answers">
              <div className="practice-qa-item__answer">
                <span className="v-eyebrow">My read</span>
                <VerdictBadges terms={q.yourVerdict} />
              </div>
              {q.claudeVerdict ? (
                <div className="practice-qa-item__answer">
                  <span className="v-eyebrow">Claude's read</span>
                  <VerdictBadges terms={q.claudeVerdict} />
                </div>
              ) : (
                <div className="practice-qa-item__answer">
                  <span className="practice-qa-item__status practice-qa-item__status--correct">
                    <CheckCircle2 size={16} />
                  </span>
                  <span className="v-eyebrow">Claude matched</span>
                </div>
              )}
            </div>
            {q.rewrite && (
              <p className="v-body practice-doc__intro">
                <strong>Rewrite:</strong>{" "}
                {Array.isArray(q.rewrite)
                  ? q.rewrite.map((r) => `"${r}"`).join(" / ")
                  : `"${q.rewrite}"`}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
