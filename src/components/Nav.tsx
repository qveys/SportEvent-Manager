import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Trophy, Users, Building2, Settings as SettingsIcon, LogOut, Bell, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface NavProps {
  isMenuOpen: boolean;
}

const Nav: React.FC<NavProps> = ({ isMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {/* Mobile Navigation Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity z-40
          ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => navigate('/settings')}
      />

      {/* Navigation Menu */}
      <aside 
        className={`
          fixed left-0 bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 z-40
          md:top-16 md:h-[calc(100vh-4rem)]
          ${isMenuOpen 
            ? 'top-16 w-full h-[calc(100vh-4rem)] flex flex-col overflow-hidden md:w-64' 
            : 'top-[-100vh] w-full h-[calc(100vh-4rem)] md:top-16 md:w-20'
          }
        `}
      >
        {/* Main Navigation */}
        <nav className={`
          flex-1 
          md:scrollbar-custom
          ${isMenuOpen ? '' : 'overflow-hidden'}
        `}>
          <div className="p-4 space-y-1">
            <NavItem 
              icon={Calendar} 
              text="Events" 
              active={location.pathname === '/' || location.pathname === '/events'} 
              onClick={() => navigate('/events')}
              isMenuOpen={isMenuOpen}
            />
            <NavItem 
              icon={Trophy} 
              text="Tournaments" 
              active={location.pathname.startsWith('/tournaments')} 
              onClick={() => navigate('/tournaments')}
              isMenuOpen={isMenuOpen}
            />
            <NavItem 
              icon={Users} 
              text="Participants" 
              active={location.pathname === '/participants'} 
              onClick={() => navigate('/participants')}
              isMenuOpen={isMenuOpen}
            />
            <NavItem 
              icon={Building2} 
              text="Venues" 
              active={location.pathname.startsWith('/venues')} 
              onClick={() => navigate('/venues')}
              isMenuOpen={isMenuOpen}
            />
            <NavItem 
              icon={SettingsIcon} 
              text="Settings" 
              active={location.pathname === '/settings'} 
              onClick={() => navigate('/settings')}
              isMenuOpen={isMenuOpen}
            />
          </div>
        </nav>

        {/* Mobile Bottom Actions */}
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-border-light dark:border-border-dark p-4">
          <div className="flex items-center justify-around">
            <button 
              onClick={() => navigate('/settings')}
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
              onClick={handleLogout}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Desktop Logout */}
        <div className="hidden md:block p-4 border-t border-border-light dark:border-border-dark">
          <NavItem 
            icon={LogOut} 
            text="Logout" 
            onClick={handleLogout}
            isMenuOpen={isMenuOpen}
          />
        </div>
      </aside>
    </>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  text: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
  isMenuOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, text, active, className = '', onClick, isMenuOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors
        ${active 
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }
        ${className}
        ${!isMenuOpen && 'md:justify-center'}
      `}
      title={!isMenuOpen ? text : undefined}
    >
      <Icon className="h-6 w-6 flex-shrink-0" />
      {(isMenuOpen || window.innerWidth < 768) && text}
    </button>
  );
};

export default Nav;