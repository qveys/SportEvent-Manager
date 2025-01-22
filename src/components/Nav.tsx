import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Trophy, Users, Building2, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavProps {
  isMenuOpen: boolean;
}

const Nav: React.FC<NavProps> = ({ isMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <aside className={`${isMenuOpen ? 'w-64' : 'w-20'} fixed top-16 left-0 bg-white dark:bg-gray-800 h-[calc(100vh-4rem)] shadow-sm transition-all duration-300 flex flex-col`}>
      <nav className="flex-1 overflow-y-auto scrollbar-custom">
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
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <NavItem 
          icon={LogOut} 
          text="Logout" 
          onClick={handleLogout}
          isMenuOpen={isMenuOpen}
        />
      </div>
    </aside>
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
        ${!isMenuOpen && 'justify-center'}
      `}
      title={!isMenuOpen ? text : undefined}
    >
      <Icon className="h-6 w-6" />
      {isMenuOpen && text}
    </button>
  );
};

export default Nav;