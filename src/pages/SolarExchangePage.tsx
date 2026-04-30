import { useState } from 'react';
import VoiceInput from '../components/VoiceInput';

const initialRewards = [
  { item: 'Premium Coffee', cost: 120, claimed: false },
  { item: 'Fresh Juice', cost: 90, claimed: false },
  { item: 'Movie Night', cost: 180, claimed: false },
  { item: 'Grilled Meat', cost: 240, claimed: false },
  { item: '2 Hours Gaming', cost: 140, claimed: false },
  { item: 'Spa Evening', cost: 360, claimed: false },
];

const findRewardByCommand = (command: string, rewards: typeof initialRewards) => {
  const normalized = command.toLowerCase();
  return rewards.find((reward) => normalized.includes(reward.item.toLowerCase().replace(/[^a-z0-9 ]/g, '')));
};

export default function SolarExchangePage() {
  const [rewards, setRewards] = useState(initialRewards);
  const [vaultFrozen, setVaultFrozen] = useState(false);
  const [shopMessage, setShopMessage] = useState('Use voice to claim rewards or freeze spending.');

  const claimReward = (item: string) => {
    setRewards((current) =>
      current.map((reward) =>
        reward.item === item ? { ...reward, claimed: true } : reward
      )
    );
    setShopMessage(`Reward claimed: ${item}`);
  };

  const handleVoiceCommand = (text: string) => {
    const normalized = text.toLowerCase();
    const reward = findRewardByCommand(normalized, rewards);

    if (normalized.includes('freeze') || normalized.includes('vault') || normalized.includes('spend')) {
      setVaultFrozen((current) => {
        const nextState = !current;
        setShopMessage(`Vault ${nextState ? 'frozen' : 'unfrozen'} by voice command.`);
        return nextState;
      });
      return;
    }

    if (reward) {
      if (reward.claimed) {
        setShopMessage(`Reward already claimed: ${reward.item}`);
      } else {
        claimReward(reward.item);
      }
      return;
    }

    setShopMessage(`Voice command not recognized: ${text}`);
  };

  return (
    <div className="page-shell exchange-page">
      <div className="page-header">
        <div>
          <div className="label-small">Solar Exchange</div>
          <h1>Reward Shop</h1>
        </div>
        <div className="status-chip glow-pill">Vault available</div>
      </div>

      <div className="glass-panel">
        <div className="section-title">Command Center</div>
        <VoiceInput
          onResult={handleVoiceCommand}
          label="Reward shop voice command"
          helperText="Say things like 'claim premium coffee' or 'freeze spending'."
        />
        <p style={{ marginTop: 16, color: '#c7d1ff' }}>{shopMessage}</p>
      </div>

      <div className="glass-panel">
        <div className="section-title">Reward Vault</div>
        <div className="feature-grid">
          {rewards.map((reward) => (
            <div key={reward.item} className="shop-card">
              <div className="label-small">{reward.item}</div>
              <h3>{reward.cost} Solars</h3>
              <p>Personalised reward aligned with your discipline and ritual power.</p>
              <button type="button" onClick={() => claimReward(reward.item)}>
                {reward.claimed ? 'Claimed' : 'Claim'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel">
        <div className="section-title">Savings Vault</div>
        <p>Lock Solars in the vault for bigger reward power. AEON rewards discipline and protects your economy.</p>
        <button type="button" onClick={() => {
          setVaultFrozen((current) => {
            const nextState = !current;
            setShopMessage(`Vault ${nextState ? 'frozen' : 'unfrozen'} by button.`);
            return nextState;
          });
        }}>
          {vaultFrozen ? 'Unfreeze Spending' : 'Freeze Spending'}
        </button>
      </div>
    </div>
  );
}
