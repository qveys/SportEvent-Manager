/**
 * Navigation Types
 * Core types for navigation system
 */
import type { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  text: string;
  path: string;
  icon: LucideIcon;
  isActive: (currentPath: string) => boolean;
}

export interface NavigationState {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}