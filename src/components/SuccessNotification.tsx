import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessNotificationProps {
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-md">
        <div className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-green-800">Success!</p>
            <p className="text-sm text-green-700 mt-1">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-green-400 hover:text-green-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};