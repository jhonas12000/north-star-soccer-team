

import React, { useState } from 'react';

interface Match {
  opponentTeam: string;
  ageGroup: string;
  date: string;
  result?: string; // Optional because result is only available for past matches
}

const Matches: React.FC = () => {
  const [matches] = useState<Match[]>([
    {
      opponentTeam: 'Team A',
      ageGroup: 'U16',
      date: '2025-01-15',
    },
    {
      opponentTeam: 'Team B',
      ageGroup: 'U18',
      date: '2025-01-20',
    },
    {
      opponentTeam: 'Team C',
      ageGroup: 'U14',
      date: '2024-12-20',
      result: 'Win',
    },
    {
      opponentTeam: 'Team D',
      ageGroup: 'U12',
      date: '2024-12-18',
      result: 'Lose',
    },
  ]);

  const getMatchStatus = (matchDate: string) => {
    const today = new Date();
    const matchDateObj = new Date(matchDate);
    return matchDateObj > today ? 'Upcoming' : 'Past';
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Matches</h2>
      <div className="space-y-4">
        {matches.map((match, index) => (
          <div
            key={index}
            className="border border-gray-300 p-4 rounded-lg"
          >
            <h3 className="text-xl font-medium">{match.opponentTeam}</h3>
            <p className="text-gray-600">{match.ageGroup}</p>
            <p className="text-gray-500">Date: {new Date(match.date).toLocaleDateString()}</p>
            <p className={`font-bold ${getMatchStatus(match.date) === 'Past' ? 'text-green-500' : 'text-red-500'}`}>
              {getMatchStatus(match.date)} Match
            </p>
            {match.result && getMatchStatus(match.date) === 'Past' && (
              <p className="text-gray-700">Result: {match.result}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
