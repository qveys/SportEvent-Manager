/**
 * Navigation Context
 * Provides navigation state and actions to components
 */
import React, { createContext, useContext } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import type { NavigationState } from '../../types/navigation';

const NavigationContext = createContext<NavigationState | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigation = useNavigation();
  
  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within NavigationProvider');
  }
  return context;
};