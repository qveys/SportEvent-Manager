/**
 * Navigation Hook
 * Manages navigation state and actions
 */
import { useState, useCallback } from 'react';
import type { NavigationState } from '../types/navigation';

export const useNavigation = (): NavigationState => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);

  return {
    isOpen,
    toggle,
    close,
    open
  };
};