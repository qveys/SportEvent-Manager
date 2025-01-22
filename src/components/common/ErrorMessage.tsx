import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  action?: React.ReactNode;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Error',
  message,
  action,
  className = ''
}) => {
  return (
    <div className={`rounded-lg bg-red-50 dark:bg-red-900/50 p-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-400 dark:text-red-300" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            {title}
          </h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-300">
            {message}
          </div>
          {action && (
            <div className="mt-4">
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};