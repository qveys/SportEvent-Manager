export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'organizer' | 'athlete' | 'referee' | 'volunteer';
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  organizerId: string;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  price?: number;
}

export interface Tournament {
  id: string;
  eventId: string;
  name: string;
  type: 'elimination' | 'roundRobin' | 'groups';
  status: 'pending' | 'active' | 'completed';
  participants: string[];
  matches: Match[];
}

export interface Match {
  id: string;
  tournamentId: string;
  round: number;
  participant1: string;
  participant2: string;
  score1?: number;
  score2?: number;
  status: 'scheduled' | 'inProgress' | 'completed';
  startTime: string;
  refereeId?: string;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  capacity?: number;
  lanes?: number;
  length?: number;
  width?: number;
  depth_min?: number;
  depth_max?: number;
  has_diving_boards: boolean;
  has_timing_system: boolean;
  is_indoor: boolean;
  is_accessible: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}