import './PaymentSuccess.css';

export function PaymentSuccess() {
  return (
    <div className="payment-success">
      <div className="success-icon"></div>
      <h1 className="payment-title">Payment Successful!</h1>
      <p className="payment-subtitle">Your purchase is complete</p>
    </div>
  );
}

