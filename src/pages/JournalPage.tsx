import { useState } from 'react';

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

  return (
    <div>
      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="label-small">Journal</div>
            <h1>Daily Entry</h1>
          </div>
          <div className="status-chip">+30 XP • +20 Solars</div>
        </div>
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
        <div style={{ marginTop: 20 }}>
          <div className="label-small">{prompts[activePrompt].label}</div>
          <textarea
            value={entry}
            onChange={(event) => setEntry(event.target.value)}
            placeholder={prompts[activePrompt].placeholder}
          />
          <button style={{ marginTop: 10, width: 'fit-content' }}>Submit Entry</button>
        </div>
      </div>

      <div className="panel">
        <div className="label-small">Quick Log</div>
        <textarea placeholder="Capture anything. AEON will respond in 2-3 sentences." />
        <button style={{ marginTop: 10, width: 'fit-content' }}>Log Quick Note</button>
      </div>
    </div>
  );
}
