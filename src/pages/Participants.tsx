import React, { useState } from 'react';
import { Users, Search, Filter, Mail, Phone, MapPin } from 'lucide-react';
import type { User } from '../types';

const mockParticipants: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'athlete',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: '2',
    email: 'sarah.smith@example.com',
    name: 'Sarah Smith',
    role: 'athlete',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: '3',
    email: 'mike.brown@example.com',
    name: 'Mike Brown',
    role: 'referee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80'
  }
];

const Participants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const filteredParticipants = mockParticipants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || participant.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Participants</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage all participants and their roles</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Participant
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search participants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Roles</option>
              <option value="athlete">Athletes</option>
              <option value="referee">Referees</option>
              <option value="organizer">Organizers</option>
              <option value="volunteer">Volunteers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Participants List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredParticipants.map((participant) => (
            <div key={participant.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <div className="flex items-center space-x-4">
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{participant.name}</h3>
                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {participant.email}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {participant.role}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
                  <Mail className="h-5 w-5" />
                </button>
                <button className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Participants;