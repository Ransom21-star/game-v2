export default function DashboardPage() {
  const stats = [
    { label: 'Discipline', value: 78 },
    { label: 'Mindset', value: 72 },
    { label: 'Vitality', value: 69 },
    { label: 'Ambition', value: 83 },
    { label: 'Adaptability', value: 65 },
    { label: 'Focus', value: 81 },
    { label: 'Spiritual', value: 58 },
    { label: 'Emotional', value: 74 },
  ];

  return (
    <div className="page-shell dashboard-page">
      <div className="page-header">
        <div>
          <div className="label-small">Dashboard</div>
          <h1>Command HUD</h1>
        </div>
        <div className="status-chip glow-pill">Frequency: Aligned</div>
      </div>

      <div className="hud-grid">
        <section className="glass-panel profile-card">
          <div className="profile-top">
            <div className="avatar-glow avatar-large">
              <div className="avatar-initials">RS</div>
            </div>
            <div>
              <div className="label-small">Hunter</div>
              <h2>Ransom Star</h2>
              <p className="subtle-copy">Astral Commander • Rank B</p>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-pill blue">
              <span>XP</span>
              <strong>6,820</strong>
            </div>
            <div className="stat-pill gold">
              <span>Solars</span>
              <strong>1,260</strong>
            </div>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '62%' }} />
          </div>
          <div className="progress-copy">Level 12 • 62% to Rank A</div>
        </section>

        <section className="glass-panel frequency-card">
          <div className="frequency-top">
            <div>
              <div className="label-small">Current Frequency</div>
              <h2>Aligned</h2>
            </div>
            <div className="energy-orb green" />
          </div>

          <div className="frequency-body">
            <div className="mini-card">
              <div className="label-small">Emotional</div>
              <p>Calm, decisive, anchored.</p>
            </div>
            <div className="mini-card">
              <div className="label-small">Mental</div>
              <p>Strategic focus, high clarity.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="goal-panel glass-panel">
        <div className="label-small">Goal Affirmation</div>
        <h2>I move as sovereign. Every action builds the life I own.</h2>
        <p>AEON has distilled your current mission into a focused declaration for the moment.</p>
      </div>

      <div className="page-grid">
        <section className="glass-panel mini-dashboard">
          <div className="section-title">Active Mission</div>
          <div className="mission-card">
            <strong>Manifest a powerful morning routine</strong>
            <p>Complete the ritual, review your non-negotiable, and lock the first momentum wave.</p>
            <button>Open Mission</button>
          </div>
        </section>

        <section className="glass-panel alert-card">
          <div className="section-title">Urgent Alert</div>
          <p>The system detects a non-negotiable deadline in 45 minutes. Prepare the Redemption Protocol.</p>
          <div className="status-chip red-pill">Critical</div>
        </section>
      </div>

      <section className="glass-panel stats-hive">
        <div className="section-title">Core Stats</div>
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="label-small">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="progress-bar small">
                <div className="progress-fill" style={{ width: `${stat.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
