/**
 * Navigation Configuration
 * Defines the main navigation items and their properties
 */
import { Calendar, Trophy, Users, Building2, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavigationItem {
  text: string;
  path: string;
  icon: LucideIcon;
  isActive: (currentPath: string) => boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    text: 'Events',
    path: '/events',
    icon: Calendar,
    isActive: (path) => path === '/' || path === '/events'
  },
  {
    text: 'Tournaments',
    path: '/tournaments',
    icon: Trophy,
    isActive: (path) => path.startsWith('/tournaments')
  },
  {
    text: 'Participants',
    path: '/participants',
    icon: Users,
    isActive: (path) => path === '/participants'
  },
  {
    text: 'Venues',
    path: '/venues',
    icon: Building2,
    isActive: (path) => path.startsWith('/venues')
  },
  {
    text: 'Settings',
    path: '/settings',
    icon: Settings,
    isActive: (path) => path === '/settings'
  }
];