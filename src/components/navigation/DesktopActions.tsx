/**
 * DesktopActions Component
 * Header actions that only appear on desktop screens
 */
import React from 'react';
import { Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { UserMenu } from './UserMenu';

export const DesktopActions: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="hidden md:flex items-center gap-4">
      <button 
        onClick={toggleTheme}
        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
      >
        {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>
      <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
        <Bell className="h-6 w-6" />
      </button>
      <UserMenu />
    </div>
  );
};