export default function MissionHubPage() {
  return (
    <div>
      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="label-small">Mission Hub</div>
            <h1>Daily Quests</h1>
          </div>
          <div className="status-chip">4 Active</div>
        </div>
        <div className="row-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="panel">
            <div className="label-small">Primary Quests</div>
            {[
              { title: 'Write 500 words for your manifesto', difficulty: 'Normal' },
              { title: 'Meditate for 18 minutes', difficulty: 'Easy' },
              { title: 'Review your non-negotiables', difficulty: 'Hard' },
            ].map((quest) => (
              <div key={quest.title} className="mission-card" style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <strong>{quest.title}</strong>
                  <span className="status-chip">{quest.difficulty}</span>
                </div>
                <p style={{ marginTop: 8, color: '#c7d1ff' }}>
                  Why this matters: trains your energy toward the day you are building.
                </p>
                <button style={{ marginTop: 12, width: '100%' }}>Complete</button>
              </div>
            ))}
          </div>
          <div className="panel">
            <div className="label-small">Non-Negotiables</div>
            {[
              'Hydrate before noon',
              'Review mission focus',
              'Evening gratitude & accounting',
            ].map((item) => (
              <div key={item} className="mission-card" style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item}</span>
                  <span className="status-chip">Streak 8</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="label-small">Milestones</div>
            <h2>AEON Monitoring</h2>
          </div>
        </div>
        <div className="row-grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
          {['Build the first draft', '7-day non-negotiable streak', 'Launch learning path'].map((milestone) => (
            <div key={milestone} className="mission-card">
              <strong>{milestone}</strong>
              <p style={{ marginTop: 10, color: '#c7d1ff' }}>
                AEON is watching this condition. It unlocks automatically when met.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
