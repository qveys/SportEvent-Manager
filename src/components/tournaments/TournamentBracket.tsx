import React from 'react';
import type { Match, Tournament } from '../../types';

interface BracketProps {
  tournament: Tournament;
}

const TournamentBracket: React.FC<BracketProps> = ({ tournament }) => {
  const rounds = Math.max(...tournament.matches.map(match => match.round));
  
  const matchesByRound = Array.from({ length: rounds }, (_, i) => {
    return tournament.matches.filter(match => match.round === i + 1);
  });

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] p-6">
        <div className="flex justify-between items-start gap-8">
          {matchesByRound.map((roundMatches, roundIndex) => (
            <div
              key={roundIndex}
              className="flex-1"
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                {getRoundName(roundIndex + 1, rounds)}
              </h3>
              <div className="space-y-4">
                {roundMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MatchCard: React.FC<{ match: Match }> = ({ match }) => {
  const statusColors = {
    scheduled: 'border-gray-200 dark:border-gray-700',
    inProgress: 'border-blue-200 dark:border-blue-700',
    completed: 'border-green-200 dark:border-green-700'
  };

  return (
    <div className={`border-2 ${statusColors[match.status]} rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm`}>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900 dark:text-white">{match.participant1}</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{match.score1 ?? '-'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900 dark:text-white">{match.participant2}</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{match.score2 ?? '-'}</span>
        </div>
        <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(match.startTime).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

const getRoundName = (round: number, totalRounds: number): string => {
  if (round === totalRounds) return 'Final';
  if (round === totalRounds - 1) return 'Semi-Finals';
  if (round === totalRounds - 2) return 'Quarter-Finals';
  return `Round ${round}`;
};

export default TournamentBracket;