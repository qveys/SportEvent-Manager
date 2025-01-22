/**
 * Header Component
 * Main application header with navigation controls
 */
import React from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigationContext } from './NavigationContext';
import { DesktopActions } from './DesktopActions';

export const Header: React.FC = () => {
  const { isOpen, toggle } = useNavigationContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-border-light dark:border-border-dark">
      <div className="h-16 flex items-center justify-between px-4 md:px-5">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            SportEvent Manager
          </h1>
        </div>

        {/* Desktop-only actions */}
        <DesktopActions />
      </div>
    </header>
  );
};