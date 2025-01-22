import React from 'react';
import { Trophy, Calendar, Users, Clock, ArrowRight } from 'lucide-react';
import type { Tournament } from '../../types';

const mockTournaments: Tournament[] = [
  {
    id: '1',
    eventId: 'event1',
    name: 'Summer Tennis Championship',
    type: 'elimination',
    status: 'active',
    participants: ['user1', 'user2', 'user3', 'user4'],
    matches: [
      {
        id: 'match1',
        tournamentId: '1',
        round: 1,
        participant1: 'user1',
        participant2: 'user2',
        status: 'completed',
        startTime: '2024-03-20T14:00:00Z',
        score1: 6,
        score2: 4
      },
      {
        id: 'match2',
        tournamentId: '1',
        round: 1,
        participant1: 'user3',
        participant2: 'user4',
        status: 'scheduled',
        startTime: '2024-03-21T15:00:00Z'
      }
    ]
  },
  {
    id: '2',
    eventId: 'event2',
    name: 'Regional Basketball Tournament',
    type: 'groups',
    status: 'pending',
    participants: ['team1', 'team2', 'team3', 'team4', 'team5', 'team6'],
    matches: []
  }
];

const TournamentList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tournaments</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create Tournament
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>
    </div>
  );
};

const TournamentCard: React.FC<{ tournament: Tournament }> = ({ tournament }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{tournament.name}</h3>
            <span className={`inline-block px-2 py-1 text-sm rounded-full mt-2 ${statusColors[tournament.status]}`}>
              {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
            </span>
          </div>
          <Trophy className="h-6 w-6 text-blue-600" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Type: {tournament.type}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>{tournament.participants.length} Participants</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>{tournament.matches.length} Matches</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-500">
            View Tournament Details
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentList;