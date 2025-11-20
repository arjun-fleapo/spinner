import { useState } from 'react';
import { recordUserIntent } from '../utils/api';
import { getQueryParams } from '../utils/queryParams';
import './RewardPage.css';

interface RewardPageProps {
  show: boolean;
  rewardText: string;
  onClaimSuccess: () => void;
  onError: (message: string) => void;
}

export function RewardPage({ show, rewardText, onClaimSuccess, onError }: RewardPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClaim = async () => {
    const queryParams = getQueryParams();
    const userId = queryParams.userId;
    const mangoId = queryParams.mangoId;

    if (!userId || !mangoId) {
      console.warn('Missing userId or mangoId in query parameters');
      onError('Missing required parameters. Please check the URL.');
      return;
    }

    setIsLoading(true);

    try {
      await recordUserIntent(userId, mangoId);
      console.log('API call successful');
      setTimeout(() => {
        onClaimSuccess();
      }, 300);
    } catch (error) {
      console.error('Error making API call:', error);
      onError('Failed to claim reward. Please try again.');
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className={`reward-page ${show ? 'show' : ''}`}>
      <div className="reward-card">
        <div className="gift-icon"></div>
        <h2 className="congratulations-title">Congratulations!</h2>
        <p className="unlocked-text">You've unlocked</p>
        <div className="reward-item">
          <span
            className="reward-item-text"
            dangerouslySetInnerHTML={{
              __html: rewardText.replace(
                /Zoom/g,
                '<img src="https://logo.svgcdn.com/logos/zoom.png" alt="Zoom" style="height: 3em; vertical-align: middle; display: inline-block; margin: 0 4px;">'
              ),
            }}
          />
        </div>
        <button
          className={`claim-button ${isLoading ? 'loading' : ''}`}
          onClick={handleClaim}
          disabled={isLoading}
        >
          {isLoading ? 'Claiming...' : 'Tap To Claim Reward'}
        </button>
      </div>
    </div>
  );
}

