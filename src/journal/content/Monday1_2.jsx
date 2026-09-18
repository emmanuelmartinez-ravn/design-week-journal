import { CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '../../design-system';
import { categoryVariant } from '../categoryVariant';
import { PracticeDivider } from '../PracticeDivider';

const LEGEND_TERMS = ['Product Design', 'UX', 'UI', 'Visual Design'];

const prompt = `I'm an engineer learning the difference between product design, UX, UI,
and visual design. Quiz me: give me 8 realistic decisions about a
hyperlocal services app, one at a time. After each answer, tell me if
I'm right, correct me, and explain the boundary case. For each, also say
whether the decision would change a data model or an API contract. Don't
give answers up front. Make a few deliberately ambiguous.`;

const quiz = [
  {
    question:
      'The team debates whether users should see a provider\'s reviews and rating BEFORE they can tap "Request booking," versus showing the request form first with reviews one tap away in a secondary tab.',
    correct: 'UX',
    yours: 'UX',
  },
  {
    question:
      'Choosing a specific color palette (muted blues/greens, high contrast) intended to signal trust and safety for in-home service providers.',
    correct: 'Visual Design',
    yours: 'Visual Design',
  },
  {
    question:
      'Deciding whether to make tipping a first-class feature (its own screen, prompted at job completion) versus not supporting it at all.',
    correct: 'Product Design',
    yours: 'Product Design',
  },
  {
    question: 'Deciding whether the "Book Now" action is a floating action button (FAB) or a sticky bottom bar.',
    correct: 'UI',
    yours: 'UI',
  },
  {
    question:
      'Deciding whether unverified users can browse providers freely, versus requiring phone verification before they can see any provider profiles.',
    correct: 'Product Design',
    yours: 'Product Design',
  },
  {
    question:
      'On a provider profile card, deciding that name and rating get large bold text, while distance and price get smaller, lighter text — i.e., setting the visual hierarchy.',
    correct: 'UI',
    yours: 'Visual Design',
  },
  {
    question:
      'Deciding whether customers can message providers directly in-app with free text, versus only submitting structured request forms (fixed fields, no open chat).',
    correct: 'Product Design',
    yours: 'UX',
  },
  {
    question: 'Choosing whether service-category icons are outlined or filled style.',
    correct: 'Visual Design',
    yours: 'Visual Design',
  },
];

function CategoryBadge({ term }) {
  return <Badge variant={categoryVariant(term)}>{term}</Badge>;
}

function ResultBadge({ term, correct }) {
  return <Badge variant={correct ? 'success' : 'danger'}>{term}</Badge>;
}

export function Monday1_2() {
  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Practice 1.2</p>
      <h2 className="v-h2">Teach the vocabulary back</h2>
      <p className="v-body practice-doc__intro">
        The fastest way to find out whether you understand the four terms is to be quizzed on
        edge cases. Use Claude as a tutor that tests you, not one that lectures you.
      </p>

      <div className="practice-legend">
        {LEGEND_TERMS.map((term) => (
          <CategoryBadge key={term} term={term} />
        ))}
      </div>

      <p className="v-eyebrow practice-doc__label">Prompt</p>
      <pre className="practice-code">{prompt}</pre>

      <PracticeDivider />
      <p className="v-eyebrow practice-doc__label">Quiz recap — first-attempt answers</p>
      <div className="practice-qa-list">
        {quiz.map((row, i) => {
          const isCorrect = row.correct === row.yours;
          return (
            <div className="practice-qa-item" key={row.question}>
              <p className="practice-qa-item__question">
                <span className="v-mono practice-qa-item__index">{i + 1}</span> {row.question}
              </p>
              <div className="practice-qa-item__answers">
                <div className="practice-qa-item__answer">
                  <span className="v-eyebrow">Correct answer</span>
                  <ResultBadge term={row.correct} correct />
                </div>
                <div className="practice-qa-item__answer">
                  <span
                    className={`practice-qa-item__status practice-qa-item__status--${
                      isCorrect ? 'correct' : 'incorrect'
                    }`}
                  >
                    {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    <ResultBadge term={row.yours} correct={isCorrect} />
                  </span>
                  <span className="v-eyebrow">My answer</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
