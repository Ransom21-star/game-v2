import { useState } from 'react';
import VoiceInput from '../components/VoiceInput';

const initialPrimaryQuests = [
  { title: 'Write 500 words for your manifesto', difficulty: 'Normal', status: 'active' },
  { title: 'Meditate for 18 minutes', difficulty: 'Easy', status: 'active' },
  { title: 'Review your non-negotiables', difficulty: 'Hard', status: 'active' },
];

const initialNonNegotiables = [
  { item: 'Hydrate before noon', status: 'active' },
  { item: 'Review mission focus', status: 'active' },
  { item: 'Evening gratitude & accounting', status: 'active' },
];

const milestones = ['Build the first draft', '7-day non-negotiable streak', 'Launch learning path'];

const findPrimaryQuestByCommand = (command: string) => {
  const normalized = command.toLowerCase();
  if (normalized.includes('manifesto') || normalized.includes('write 500')) {
    return initialPrimaryQuests[0].title;
  }
  if (normalized.includes('meditate') || normalized.includes('meditation')) {
    return initialPrimaryQuests[1].title;
  }
  if (normalized.includes('review') || normalized.includes('non-negotiable') || normalized.includes('non negotiable')) {
    return initialPrimaryQuests[2].title;
  }
  return null;
};

const findNonNegotiableByCommand = (command: string) => {
  const normalized = command.toLowerCase();
  if (normalized.includes('hydrate')) return initialNonNegotiables[0].item;
  if (normalized.includes('review mission') || normalized.includes('mission focus')) return initialNonNegotiables[1].item;
  if (normalized.includes('gratitude') || normalized.includes('accounting')) return initialNonNegotiables[2].item;
  return null;
};

export default function MissionHubPage() {
  const [primaryQuests, setPrimaryQuests] = useState(initialPrimaryQuests);
  const [nonNegotiables, setNonNegotiables] = useState(initialNonNegotiables);
  const [commandOutput, setCommandOutput] = useState('Use voice to complete quests and non-negotiables.');

  const completePrimaryQuest = (title: string) => {
    setPrimaryQuests((current) =>
      current.map((quest) =>
        quest.title === title ? { ...quest, status: 'complete' } : quest
      )
    );
    setCommandOutput(`Quest completed: ${title}`);
  };

  const completeNonNegotiable = (item: string) => {
    setNonNegotiables((current) =>
      current.map((entry) =>
        entry.item === item ? { ...entry, status: 'complete' } : entry
      )
    );
    setCommandOutput(`Non-negotiable marked complete: ${item}`);
  };

  const handleVoiceCommand = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const questTitle = findPrimaryQuestByCommand(trimmed);
    const nonNegotiableItem = findNonNegotiableByCommand(trimmed);

    if (questTitle) {
      completePrimaryQuest(questTitle);
      return;
    }

    if (nonNegotiableItem) {
      completeNonNegotiable(nonNegotiableItem);
      return;
    }

    if (trimmed.toLowerCase().includes('complete all') || trimmed.toLowerCase().includes('finish all')) {
      initialPrimaryQuests.forEach((quest) => completePrimaryQuest(quest.title));
      initialNonNegotiables.forEach((entry) => completeNonNegotiable(entry.item));
      setCommandOutput('All current quests and non-negotiables have been completed by voice command.');
      return;
    }

    setCommandOutput(`Voice command received but not recognized: ${trimmed}`);
  };

  return (
    <div className="page-shell mission-page">
      <div className="page-header">
        <div>
          <div className="label-small">Mission Hub</div>
          <h1>Daily Quests</h1>
        </div>
        <div className="status-chip glow-pill">4 Active</div>
      </div>

      <div className="glass-panel">
        <div className="section-title">Command Center</div>
        <VoiceInput
          onResult={handleVoiceCommand}
          label="Mission voice command"
          helperText="Say things like 'complete meditation' or 'mark hydration as done'."
        />
        <p style={{ marginTop: 16, color: '#c7d1ff' }}>{commandOutput}</p>
      </div>

      <div className="glass-panel">
        <div className="section-title">Primary Quests</div>
        <div className="quest-grid">
          {primaryQuests.map((quest) => (
            <div key={quest.title} className="mission-card">
              <div className="mission-heading">
                <strong>{quest.title}</strong>
                <span className="status-chip">{quest.status === 'complete' ? 'Complete' : quest.difficulty}</span>
              </div>
              <p>Why this matters: trains your energy toward the day you are building.</p>
              <button type="button" onClick={() => completePrimaryQuest(quest.title)}>
                {quest.status === 'complete' ? 'Completed' : 'Complete'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel">
        <div className="section-title">Non-Negotiables</div>
        <div className="quest-grid">
          {nonNegotiables.map((entry) => (
            <div key={entry.item} className="mission-card">
              <div className="mission-heading">
                <span>{entry.item}</span>
                <span className="status-chip">{entry.status === 'complete' ? 'Done' : 'Streak 8'}</span>
              </div>
              <button type="button" onClick={() => completeNonNegotiable(entry.item)}>
                {entry.status === 'complete' ? 'Completed' : 'Mark Complete'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel">
        <div className="section-title">Milestones</div>
        <div className="feature-grid">
          {milestones.map((milestone) => (
            <div key={milestone} className="mission-card">
              <strong>{milestone}</strong>
              <p>AEON is watching this condition. It unlocks automatically when met.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
