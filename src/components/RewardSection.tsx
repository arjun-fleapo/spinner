import './RewardSection.css';

export function RewardSection() {
  return (
    <div className="reward-section">
      <h2 className="reward-title reward-title-wait">Waitt!!</h2>
      <h2 className="reward-title">You Can Claim Your Exclusive Reward!</h2>
      <p className="reward-subtitle">Spin the wheel to unlock the reward</p>
      <p className="reward-note">
        Note: If you exit then you miss out on this opportunity forever.
      </p>
    </div>
  );
}

