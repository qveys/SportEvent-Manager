import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', footer }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-border-light dark:border-border-dark ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50/80 dark:bg-gray-700/50 border-t border-border-light dark:border-border-dark">
          {footer}
        </div>
      )}
    </div>
  );
};