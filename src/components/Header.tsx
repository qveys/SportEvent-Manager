import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Sun, Moon, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-border-light dark:border-border-dark">
      <div className="h-16 flex items-center justify-between px-4 md:px-5">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors md:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hidden md:block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            SportEvent Manager
          </h1>
        </div>

        {/* Desktop Actions */}
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
          <button 
            onClick={() => navigate('/settings')}
            className="h-8 w-8 rounded-full overflow-hidden"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${user?.user_metadata?.firstname}+${user?.user_metadata?.name}&background=0D8ABC&color=fff`}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;