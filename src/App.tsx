import { useState, useEffect } from 'react';
import { PaymentSuccess } from './components/PaymentSuccess';
import { RewardSection } from './components/RewardSection';
import { SpinnerWheel } from './components/SpinnerWheel';
import { RewardPage } from './components/RewardPage';
import { RewardClaimedPage } from './components/RewardClaimedPage';
import { RewardAlreadyClaimedPage } from './components/RewardAlreadyClaimedPage';
import { ToastContainer } from './components/ToastContainer';
import { useToast } from './hooks/useToast';
import { Segment } from './types';
import { getUserIntent } from './utils/api';
import { getQueryParams } from './utils/queryParams';

const segments: Segment[] = [
  {
    text: 'TagMango Hoodie',
    color: '#FF6B35',
    gradient: ['#FF6B35', '#F7931E'],
  },
  {
    text: 'AI Fiesta for 1 Year (all premium AI platforms)',
    color: '#F7931E',
    gradient: ['#F7931E', '#FFD700'],
  },
  {
    text: 'Pro Annual at (Rs. 50,000 + GST) + Free Zoom Webinar 500 for 1 Year',
    color: '#FFD700',
    gradient: ['#FFD700', '#FFA500'],
  },
  {
    text: 'Funnel Scaling Masterclass Recording',
    color: '#FFA500',
    gradient: ['#FFA500', '#FF6B35'],
  },
  {
    text: 'AI Super Prompts for Course Creation',
    color: '#FF8C42',
    gradient: ['#FF8C42', '#F7931E'],
  },
];

function App() {
  const { toasts, showToast, removeToast } = useToast();
  const [showRewardPage, setShowRewardPage] = useState(false);
  const [showRewardClaimedPage, setShowRewardClaimedPage] = useState(false);
  const [showRewardAlreadyClaimedPage, setShowRewardAlreadyClaimedPage] = useState(false);
  const [rewardText, setRewardText] = useState('');
  const [isCheckingIntent, setIsCheckingIntent] = useState(true);

  useEffect(() => {
    // Expose showToast globally for use in RewardPage
    (window as Window & { showToast?: typeof showToast }).showToast = showToast;
  }, [showToast]);

  useEffect(() => {
    const checkUserIntent = async () => {
      try {
        const { userId, mangoId } = getQueryParams();
        
        if (!userId || !mangoId) {
          setIsCheckingIntent(false);
          return;
        }

        const response = await getUserIntent(userId, mangoId);
        
        if (response.code === 200 && response.result?.intent) {
          // User has already claimed, show the already claimed page
          setShowRewardAlreadyClaimedPage(true);
        }
      } catch (error) {
        // If API fails, continue with normal flow
        console.error('Error checking user intent:', error);
      } finally {
        setIsCheckingIntent(false);
      }
    };

    checkUserIntent();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSpinComplete = (_segmentIndex: number) => {
    // Always show Pro Annual + Zoom Webinar (segment index 2) regardless of where spinner stops
    const proAnnualIndex = 2;
    const reward = segments[proAnnualIndex].text;
    setRewardText(reward);
    setTimeout(() => {
      setShowRewardPage(true);
    }, 1500);
  };

  const handleClaimSuccess = () => {
    setShowRewardPage(false);
    setTimeout(() => {
      setShowRewardClaimedPage(true);
    }, 300);
  };

  const handleError = (message: string) => {
    showToast(message, 'error');
  };

  // Don't show spinner if reward is already claimed
  if (showRewardAlreadyClaimedPage) {
    return (
      <>
        <RewardAlreadyClaimedPage show={showRewardAlreadyClaimedPage} />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </>
    );
  }

  // Show loading state while checking intent
  if (isCheckingIntent) {
    return (
      <>
        <PaymentSuccess />
        <RewardSection />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </>
    );
  }

  return (
    <>
      <PaymentSuccess />
      <RewardSection />
      <SpinnerWheel segments={segments} onSpinComplete={handleSpinComplete} />
      <RewardPage
        show={showRewardPage}
        rewardText={rewardText}
        onClaimSuccess={handleClaimSuccess}
        onError={handleError}
      />
      <RewardClaimedPage show={showRewardClaimedPage} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}

export default App;

