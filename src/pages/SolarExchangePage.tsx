export default function SolarExchangePage() {
  return (
    <div>
      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="label-small">Solar Exchange</div>
            <h1>Reward Shop</h1>
          </div>
          <div className="status-chip">Vault available</div>
        </div>
        <div className="row-grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
          {[
            { item: 'Premium Coffee', cost: 120 },
            { item: 'Fresh Juice', cost: 90 },
            { item: 'Movie Night', cost: 180 },
            { item: 'Grilled Meat', cost: 240 },
            { item: '2 Hours Gaming', cost: 140 },
            { item: 'Spa Evening', cost: 360 },
          ].map((reward) => (
            <div key={reward.item} className="shop-card panel">
              <div className="label-small">{reward.item}</div>
              <h3>{reward.cost} Solars</h3>
              <p style={{ marginTop: 10, color: '#c7d1ff' }}>Personalised reward aligned with your country and culture.</p>
              <button style={{ marginTop: 12, width: '100%' }}>Claim</button>
            </div>
          ))}
        </div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <div className="label-small">Savings Vault</div>
        <p>Lock Solars in the vault for bigger reward power. AEON rewards discipline and protects your economy.</p>
        <button style={{ marginTop: 14 }}>Freeze Spending</button>
      </div>
    </div>
  );
}
