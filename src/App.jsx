import { useState } from 'react';
import { Tabs } from './design-system';
import wordmark from './design-system/assets/vello-wordmark.svg';
import { days } from './journal/days';
import { JournalEntry } from './journal/JournalEntry';

function App() {
  const [activeDayId, setActiveDayId] = useState(days[0].id);
  const [activePracticeId, setActivePracticeId] = useState(days[0].practices[0]?.id ?? null);

  const day = days.find((d) => d.id === activeDayId);

  function handleDayChange(id) {
    const nextDay = days.find((d) => d.id === id);
    setActiveDayId(id);
    setActivePracticeId(nextDay.practices[0]?.id ?? null);
  }

  return (
    <div className="journal-shell">
      <header className="journal-header">
        <img src={wordmark} alt="Vello" />
        <span className="v-eyebrow">Design week journal</span>
      </header>

      <Tabs
        className="journal-tabs"
        value={activeDayId}
        onChange={handleDayChange}
        items={days}
        fill
      />

      <JournalEntry
        day={day}
        activePracticeId={activePracticeId}
        onPracticeChange={setActivePracticeId}
      />
    </div>
  );
}

export default App;
