import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";


interface Matches {
  id: number;
  opponentTeam: string;
  ageGroup: string;
  gameDate: string;
  result?: string;
}

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Matches[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for modals and form inputs
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const [showUpdateGameModal, setShowUpdateGameModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Matches | null>(null);
  const [formData, setFormData] = useState({
    opponentTeam: "",
    ageGroup: "",
    gameDate: "",
    result: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/matchesApi/matches")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch matches data");
        }
        return response.json();
      })
      .then((data) => {
        setMatches(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const getMatchStatus = (matchDate: string) => {
    const today = new Date();
    const matchDateObj = new Date(matchDate);
    return matchDateObj > today ? "Upcoming" : "Past";
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new game
  const handleAddGame = () => {
    fetch("http://localhost:8080/matchesApi/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setShowNewGameModal(false);
        window.location.reload(); // Reload to fetch updated matches
      })
      .catch((err) => console.error("Error adding match:", err));
  };

  // Submit updated game
  const handleUpdateGame = () => {
    if (!selectedMatch) return;

    fetch(`http://localhost:8080/matchesApi/${selectedMatch.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setShowUpdateGameModal(false);
        window.location.reload();
      })
      .catch((err) => console.error("Error updating match:", err));
  };

  // Delete match function
  const handleDeleteMatch = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this match?")) return;

    fetch(`http://localhost:8080/matchesApi/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete match");
        }
        // Remove deleted match from the state
        setMatches(matches.filter((match) => match.id !== id));
      })
      .catch((err) => {
        alert("Error deleting match: " + err.message);
      });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Matches</h2>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowNewGameModal(true)}
        >
          New Game
        </button>
        
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="border border-gray-300 p-4 rounded-lg">
            <h3 className="text-xl font-medium">{match.opponentTeam}</h3>
            <p className="text-gray-600">{match.ageGroup}</p>
            <p className="text-gray-500">
              Date: {new Date(match.gameDate).toLocaleDateString()}
            </p>
            <p
              className={`font-bold ${
                getMatchStatus(match.gameDate) === "Past"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {getMatchStatus(match.gameDate)} Match
            </p>
            {match.result && getMatchStatus(match.gameDate) === "Past" && (
              <p className="text-gray-700">Result: {match.result}</p>
            )}
            <button
              className="text-gray-500 p-2  hover:bg-gray-600"
              onClick={() => {
                setSelectedMatch(match);
                setFormData({
                  opponentTeam: match.opponentTeam,
                  ageGroup: match.ageGroup,
                  gameDate: match.gameDate,
                  result: match.result || "",
                });
                setShowUpdateGameModal(true);
              }}
            >
              <Pencil size={20} />
            </button>
            
            <button
                className="text-red-500 p-2  hover:bg-red-600"
                onClick={() => handleDeleteMatch(match.id)}
              >
               <Trash2 size={20} />
              </button>

          </div>
        ))}
      </div>

      {/* New Game Modal */}
      {showNewGameModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Add New Game</h3>
            <input
              type="text"
              name="opponentTeam"
              placeholder="Opponent Team"
              value={formData.opponentTeam}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="ageGroup"
              placeholder="Age Group"
              value={formData.ageGroup}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="date"
              name="gameDate"
              value={formData.gameDate}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="result"
              placeholder="Result (Optional)"
              value={formData.result}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <button onClick={handleAddGame} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Game
            </button>
            <button onClick={() => setShowNewGameModal(false)} className="ml-2 text-gray-600">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Update Game Modal */}
      {showUpdateGameModal && selectedMatch && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            {/* <h3 className="text-xl font-semibold mb-4">Update Game</h3> */}
            <input
              type="text"
              name="opponentTeam"
              value={formData.opponentTeam}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="date"
              name="gameDate"
              value={formData.gameDate}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="result"
              value={formData.result}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            {/* <button onClick={handleUpdateGame} className="bg-yellow-500 text-white px-4 py-2 rounded">
              Update Game
            </button> */}
            <button onClick={() => setShowUpdateGameModal(false)} className="ml-2 text-gray-600">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matches;

