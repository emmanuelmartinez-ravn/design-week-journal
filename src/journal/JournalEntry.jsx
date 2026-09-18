import { NotebookPen } from 'lucide-react';
import { Card, EmptyState, Tabs } from '../design-system';
import { practiceContent } from './practiceContent';

export function JournalEntry({ day, activePracticeId, onPracticeChange }) {
  if (day.practices.length === 0) {
    return (
      <Card padding="lg">
        <EmptyState
          tone="brand"
          icon={<NotebookPen />}
          title={`No entry for ${day.label} yet`}
          body="Write up what you practiced and learned once the day's session wraps."
        />
      </Card>
    );
  }

  const practice = day.practices.find((p) => p.id === activePracticeId) ?? day.practices[0];
  const Content = practiceContent[practice.id];

  return (
    <>
      <Tabs
        className="journal-tabs journal-tabs--practice"
        value={practice.id}
        onChange={onPracticeChange}
        items={day.practices}
      />
      <Card padding="lg">
        {Content ? (
          <Content />
        ) : (
          <EmptyState
            compact
            tone="neutral"
            icon={<NotebookPen />}
            title={`No entry for Practice ${practice.label} yet`}
            body="Write up what you practiced and learned once the day's session wraps."
          />
        )}
      </Card>
    </>
  );
}
