import { useState, useEffect } from 'react';
import { PaymentSuccess } from './components/PaymentSuccess';
import { RewardSection } from './components/RewardSection';
import { SpinnerWheel } from './components/SpinnerWheel';
import { RewardPage } from './components/RewardPage';
import { RewardClaimedPage } from './components/RewardClaimedPage';
import { ToastContainer } from './components/ToastContainer';
import { useToast } from './hooks/useToast';
import { Segment } from './types';

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
    text: 'Pro Annual at (Rs. 50,000 + GST) + Zoom Webinar 500 Free for 1 Year',
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
  const [rewardText, setRewardText] = useState('');

  useEffect(() => {
    // Expose showToast globally for use in RewardPage
    (window as any).showToast = showToast;
  }, [showToast]);

  const handleSpinComplete = (segmentIndex: number) => {
    const reward = segments[segmentIndex].text;
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

