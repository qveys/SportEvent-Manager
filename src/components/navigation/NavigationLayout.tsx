/**
 * NavigationLayout Component
 * Handles the overall navigation layout structure
 */
import React from 'react';
import { NavigationProvider, useNavigationContext } from './NavigationContext';
import { Header } from './Header';
import { Nav } from './Nav';

interface NavigationLayoutContentProps {
  children: React.ReactNode;
}

const NavigationLayoutContent: React.FC<NavigationLayoutContentProps> = ({ children }) => {
  const { isOpen } = useNavigationContext();
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors">
      <Header />
      <Nav />
      <main className={`
        pt-16 transition-all duration-300
        md:pl-20 ${isOpen ? 'md:pl-64' : 'md:pl-20'}
      `}>
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

interface NavigationLayoutProps {
  children: React.ReactNode;
}

export const NavigationLayout: React.FC<NavigationLayoutProps> = ({ children }) => {
  return (
    <NavigationProvider>
      <NavigationLayoutContent>
        {children}
      </NavigationLayoutContent>
    </NavigationProvider>
  );
};