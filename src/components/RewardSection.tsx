import './RewardSection.css';

export function RewardSection() {
  return (
    <div className="reward-section">
      <h2 className="reward-title" style={{ color: '#dc2626', fontSize: '2.5rem', marginBottom: '8px' }}>
        Waitt!!
      </h2>
      <h2 className="reward-title">You Can Claim Your Exclusive Reward!</h2>
      <p className="reward-subtitle">Spin the wheel to unlock the reward</p>
      <p
        style={{
          textAlign: 'center',
          color: '#dc2626',
          fontSize: '0.85rem',
          fontStyle: 'italic',
          marginTop: '16px',
          textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        Note: If you exit then you miss out on this opportunity forever.
      </p>
    </div>
  );
}

