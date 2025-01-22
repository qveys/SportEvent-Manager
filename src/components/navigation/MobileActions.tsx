/**
 * MobileActions Component
 * Renders the bottom action bar for mobile navigation
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigationContext } from './NavigationContext';

interface MobileActionsProps {
  onLogout: () => void;
}

export const MobileActions: React.FC<MobileActionsProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { close } = useNavigationContext();

  const handleProfileClick = () => {
    close(); // Close menu before navigation
    navigate('/settings');
  };

  return (
    <div className="md:hidden bg-white dark:bg-gray-800 border-t border-border-light dark:border-border-dark p-4">
      <div className="flex items-center justify-around">
        <button 
          onClick={handleProfileClick}
          className="p-2 rounded-full overflow-hidden"
        >
          <img
            src={`https://ui-avatars.com/api/?name=${user?.user_metadata?.firstname}+${user?.user_metadata?.name}&background=0D8ABC&color=fff`}
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        </button>
        <button 
          onClick={toggleTheme}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>
        <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <Bell className="h-6 w-6" />
        </button>
        <button
          onClick={onLogout}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};