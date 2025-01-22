import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, Users, Search, Filter, ArrowUpDown } from 'lucide-react';
import type { Tournament } from '../../types';

const mockTournaments: Tournament[] = [
  {
    id: '1',
    eventId: 'event1',
    name: 'Summer Tennis Championship',
    type: 'elimination',
    status: 'active',
    participants: ['John Doe', 'Sarah Smith', 'Mike Johnson', 'Emma Wilson'],
    matches: [
      {
        id: 'match1',
        tournamentId: '1',
        round: 1,
        participant1: 'John Doe',
        participant2: 'Sarah Smith',
        status: 'completed',
        startTime: '2024-03-20T14:00:00Z',
        score1: 6,
        score2: 4
      }
    ]
  },
  {
    id: '2',
    eventId: 'event2',
    name: 'Regional Basketball Tournament',
    type: 'groups',
    status: 'pending',
    participants: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F'],
    matches: []
  },
  {
    id: '3',
    eventId: 'event3',
    name: 'City Soccer League',
    type: 'roundRobin',
    status: 'completed',
    participants: ['United FC', 'City Stars', 'Athletic Club', 'Royal Team'],
    matches: [
      {
        id: 'match2',
        tournamentId: '3',
        round: 1,
        participant1: 'United FC',
        participant2: 'City Stars',
        status: 'completed',
        startTime: '2024-03-15T14:00:00Z',
        score1: 2,
        score2: 1
      }
    ]
  }
];

const TournamentsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'participants' | 'status'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredTournaments = mockTournaments
    .filter(tournament => {
      const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter;
      const matchesType = typeFilter === 'all' || tournament.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'participants') {
        return sortOrder === 'asc'
          ? a.participants.length - b.participants.length
          : b.participants.length - a.participants.length;
      } else {
        return sortOrder === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
    });

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tournaments</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor all tournaments</p>
        </div>
        <button
          onClick={() => navigate('/tournaments/create')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Tournament
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="relative">
              <Trophy className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="elimination">Elimination</option>
                <option value="roundRobin">Round Robin</option>
                <option value="groups">Groups</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tournaments List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {/* Table Header */}
          <div className="bg-gray-50 dark:bg-gray-700/50">
            <div className="grid grid-cols-4 gap-4 px-6 py-3">
              <button
                onClick={() => toggleSort('name')}
                className="flex items-center gap-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Tournament Name
                <ArrowUpDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleSort('participants')}
                className="flex items-center gap-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Participants
                <ArrowUpDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleSort('status')}
                className="flex items-center gap-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Status
                <ArrowUpDown className="h-4 w-4" />
              </button>
              <div className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTournaments.map((tournament) => (
              <div key={tournament.id} className="grid grid-cols-4 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{tournament.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{tournament.type}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                  <span className="text-sm text-gray-900 dark:text-white">{tournament.participants.length} participants</span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${tournament.status === 'active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      tournament.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                    {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate(`/tournaments/${tournament.id}`)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentsList;