import React from 'react';
import { Trophy, Calendar, Users, MapPin, Clock } from 'lucide-react';
import TournamentBracket from '../../components/tournaments/TournamentBracket';
import type { Tournament } from '../../types';

const mockTournament: Tournament = {
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
    },
    {
      id: 'match2',
      tournamentId: '1',
      round: 1,
      participant1: 'Mike Johnson',
      participant2: 'Emma Wilson',
      status: 'scheduled',
      startTime: '2024-03-21T15:00:00Z'
    },
    {
      id: 'match3',
      tournamentId: '1',
      round: 2,
      participant1: 'John Doe',
      participant2: '',
      status: 'scheduled',
      startTime: '2024-03-22T14:00:00Z'
    }
  ]
};

const TournamentDetails: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Tournament Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">{mockTournament.name}</h1>
            </div>
            <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                March 20-22, 2024
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Sports Complex
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {mockTournament.participants.length} Participants
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {mockTournament.matches.length} Matches
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Edit Tournament
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Start Next Round
            </button>
          </div>
        </div>
      </div>

      {/* Tournament Bracket */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tournament Bracket</h2>
        <TournamentBracket tournament={mockTournament} />
      </div>

      {/* Participants List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Participants</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {mockTournament.participants.map((participant, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {participant.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{participant}</h3>
                  <p className="text-sm text-gray-500">Seed #{index + 1}</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-500">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Match History */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Match History</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {mockTournament.matches.map((match) => (
            <div key={match.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{match.participant1}</span>
                    {match.status === 'completed' && (
                      <span className="text-sm font-bold text-gray-900">
                        {match.score1}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{match.participant2 || 'TBD'}</span>
                    {match.status === 'completed' && (
                      <span className="text-sm font-bold text-gray-900">
                        {match.score2}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {new Date(match.startTime).toLocaleDateString()}
                  </div>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${match.status === 'completed' ? 'bg-green-100 text-green-800' :
                        match.status === 'inProgress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;