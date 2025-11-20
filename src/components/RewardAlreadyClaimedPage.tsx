import './RewardAlreadyClaimedPage.css';

interface RewardAlreadyClaimedPageProps {
  show: boolean;
}

export function RewardAlreadyClaimedPage({ show }: RewardAlreadyClaimedPageProps) {
  if (!show) return null;

  return (
    <div className={`reward-already-claimed-page ${show ? 'show' : ''}`}>
      <div className="reward-already-claimed-card">
        <div className="already-claimed-icon"></div>
        <h2 className="reward-already-claimed-title">Reward has already been claimed</h2>
      </div>
    </div>
  );
}

