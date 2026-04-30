export default function SkillsGrowthPage() {
  return (
    <div>
      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="label-small">Skills</div>
            <h1>Growth Grid</h1>
          </div>
          <div className="status-chip">Hidden Skills: 3</div>
        </div>
        <div className="skill-grid">
          {[
            { name: 'Focus Discipline', rank: 'Adept' },
            { name: 'Manifestation Flow', rank: 'Apprentice' },
            { name: 'Vitality Rituals', rank: 'Beginner' },
          ].map((skill) => (
            <div key={skill.name} className="skill-card panel">
              <div className="label-small">{skill.name}</div>
              <h3>{skill.rank}</h3>
              <div style={{ marginTop: 10, height: 10, background: '#19203a', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: '56%', height: '100%', background: '#c7b9ff' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="label-small">Stats</div>
            <h2>Core Attributes</h2>
          </div>
        </div>
        <div className="stats-grid">
          {([
            ['Discipline', 78],
            ['Mindset', 72],
            ['Vitality', 69],
            ['Ambition', 83],
          ] as [string, number][]).map(([label, value]) => (
            <div key={label} className="panel" style={{ padding: 16 }}>
              <div className="label-small">{label}</div>
              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <span>{value}/100</span>
                <span>{value > 75 ? 'Strong' : value > 58 ? 'Developing' : 'Growing'}</span>
              </div>
              <div style={{ marginTop: 12, height: 10, background: '#19203a', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${value}%`, height: '100%', background: '#7c87ff' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
