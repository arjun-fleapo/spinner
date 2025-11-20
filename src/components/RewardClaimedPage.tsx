import './RewardClaimedPage.css';

interface RewardClaimedPageProps {
  show: boolean;
}

export function RewardClaimedPage({ show }: RewardClaimedPageProps) {
  if (!show) return null;

  return (
    <div className={`reward-claimed-page ${show ? 'show' : ''}`}>
      <div className="reward-claimed-card">
        <div className="claimed-success-icon"></div>
        <h2 className="reward-claimed-title">Reward Claimed Successfully!</h2>
        <p className="claimed-message">
          Our team will reach out within the next 48 hours to help you get
          started with your exclusive rewards.
        </p>
      </div>
      <p className="claimed-email-note">
        In the meantime you can check your inbox/spam on email for next steps on Enterprise Setup Purchase.
      </p>
    </div>
  );
}

