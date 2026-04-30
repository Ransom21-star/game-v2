import { useState } from 'react';
import VoiceInput from '../components/VoiceInput';

const prompts = [
  { label: 'Daily Declaration', placeholder: 'Who are you choosing to be today?' },
  { label: 'Mission Focus', placeholder: 'The one action that moves your goal most today' },
  { label: 'Inner Weather', placeholder: 'Describe your emotional and mental state honestly' },
  { label: 'Obstacle Readiness', placeholder: 'What may block you and how will you meet it?' },
  { label: 'Evening Accounting', placeholder: 'What will your future self thank you for?' },
];

export default function JournalPage() {
  const [activePrompt, setActivePrompt] = useState(0);
  const [entry, setEntry] = useState('');
  const [quickLog, setQuickLog] = useState('');

  return (
    <div className="page-shell journal-page">
      <div className="page-header">
        <div>
          <div className="label-small">Journal</div>
          <h1>Daily Entry</h1>
        </div>
        <div className="status-chip glow-pill">+30 XP • +20 Solars</div>
      </div>

      <div className="glass-panel">
        <div className="tab-bar">
          {prompts.map((prompt, index) => (
            <button
              key={prompt.label}
              type="button"
              className={`tab-button ${activePrompt === index ? 'active' : ''}`}
              onClick={() => {
                setActivePrompt(index);
                setEntry('');
              }}
            >
              {prompt.label}
            </button>
          ))}
        </div>

        <div className="form-section">
          <div className="label-small">{prompts[activePrompt].label}</div>
          <VoiceInput
            onResult={(text) => setEntry((current) => (current ? `${current}\n${text}` : text))}
            label="Journal voice capture"
            helperText="Speak your entry, then edit it before submission."
          />
          <textarea
            value={entry}
            onChange={(event) => setEntry(event.target.value)}
            placeholder={prompts[activePrompt].placeholder}
          />
          <button type="button">Submit Entry</button>
        </div>
      </div>

      <div className="glass-panel">
        <div className="section-title">Quick Log</div>
        <VoiceInput
          onResult={(text) => setQuickLog((current) => (current ? `${current}\n${text}` : text))}
          label="Quick note voice capture"
          helperText="Speak a short thought or insight."
        />
        <textarea
          value={quickLog}
          onChange={(event) => setQuickLog(event.target.value)}
          placeholder="Capture anything. AEON will respond in 2-3 sentences."
        />
        <button type="button">Log Quick Note</button>
      </div>
    </div>
  );
}
