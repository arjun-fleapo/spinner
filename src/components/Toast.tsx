import { Toast as ToastType } from '../types';
import './Toast.css';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  const getIcon = () => {
    if (toast.type === 'success') return '✓';
    if (toast.type === 'warning') return '!';
    return '✕';
  };

  return (
    <div className={`toast ${toast.type} show`}>
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">{toast.message}</div>
      <button
        className="toast-close"
        onClick={() => onClose(toast.id)}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

