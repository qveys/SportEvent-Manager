import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastVariant = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onClose: () => void;
  duration?: number;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  onClose,
  duration = 5000,
  className = ''
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variants = {
    success: {
      icon: CheckCircle,
      classes: 'bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-200'
    },
    error: {
      icon: AlertCircle,
      classes: 'bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200'
    },
    info: {
      icon: Info,
      classes: 'bg-blue-50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'
    }
  };

  const Icon = variants[variant].icon;

  return (
    <div className={`
      rounded-lg p-4 shadow-lg
      transform transition-all duration-300 ease-in-out
      ${variants[variant].classes}
      ${className}
    `}>
      <div className="flex items-start">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 inline-flex flex-shrink-0 rounded-md text-current hover:opacity-75"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};