/**
 * Nav Component
 * Main navigation component that handles both mobile and desktop layouts
 */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { NavItem } from './NavItem';
import { NavOverlay } from './NavOverlay';
import { MobileActions } from './MobileActions';
import { useNavigationContext } from './NavigationContext';
import { navigationItems } from '../../config/navigation';

export const Nav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();
  const { isOpen, close } = useNavigationContext();

  const handleLogout = async () => {
    try {
      await signOut();
      close();
      navigate('/auth/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigation = (path: string) => {
    close();
    navigate(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <NavOverlay isOpen={isOpen} onClick={close} />

      {/* Navigation Menu */}
      <aside 
        className={`
          fixed left-0 top-16 bg-white dark:bg-gray-800 shadow-sm z-40
          border-r border-border-light dark:border-border-dark
          h-[calc(100vh-4rem)] flex flex-col
          transition-[transform,width] duration-300 ease-in-out
          ${isOpen ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}
          ${isOpen ? 'w-full md:w-64' : 'w-full md:w-20'}
        `}
      >
        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-custom">
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => (
              <NavItem 
                key={item.path}
                icon={item.icon}
                text={item.text}
                active={item.isActive(location.pathname)}
                onClick={() => handleNavigation(item.path)}
                isMenuOpen={isOpen}
              />
            ))}
          </nav>
        </div>

        {/* Mobile Actions */}
        <MobileActions onLogout={handleLogout} />

        {/* Desktop Logout */}
        <div className="hidden md:block sticky bottom-0 w-full bg-white dark:bg-gray-800 border-t border-border-light dark:border-border-dark p-4">
          <NavItem 
            icon={LogOut}
            text="Logout"
            onClick={handleLogout}
            isMenuOpen={isOpen}
          />
        </div>
      </aside>
    </>
  );
};