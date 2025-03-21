import React, { useEffect, useState } from "react";

const Players: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/player/players")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch players data");
        }
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Players' Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <div key={player.id} className="flex items-center bg-white shadow-lg rounded-lg p-4">
            {/* Player Info on the Left */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-blue-900">{player.firstName} {player.lastName}</h3>
              <p className="text-gray-700">Age: {player.age}</p>
              <p className="text-gray-700">Gender: {player.gender}</p>
            </div>

            {/* Oval Profile Picture Placeholder */}
            <div className="w-24 h-32 flex items-center justify-center bg-gray-300 rounded-full border-2 border-blue-700 overflow-hidden relative">
              <img 
                src={`http://localhost:8080/images/${player.id}.jpg`} 
                alt="Profile Picture" 
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")} // Hide broken images
              />
              {!player.imageUrl && <p className="text-xs text-gray-600 absolute">Profile Picture</p>}
              {/* <p className="absolute text-xs text-gray-600" style={{ display: "none" }}>Profile Picture</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;


