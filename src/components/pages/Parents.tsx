import React, { useEffect, useState } from "react";

interface Player {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}

interface Parent {
  id: number;
  firstName: string;
  lastName: string;
  telephone: string;
  email: string;
  role: string;
  players: Player[];
}

const Parents: React.FC = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/parent/parents")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch parents data");
        }
        return response.json();
      })
      .then((data) => {
        setParents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Delete Paretn function
  const handleDeleteParent = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this Parent?")) return;

    fetch(`http://localhost:8080/parent/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete match");
        }
        // Remove deleted match from the state
        setParents(parents.filter((parent) => parent.id !== id));
      })
      .catch((err) => {
        alert("Error deleting parent: " + err.message);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Parents List
      </h1>

      {parents.length === 0 ? (
        <p className="text-gray-600 text-center">No parents found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {parents.map((parent) => (
            <div
              key={parent.id}
              className="border p-5 rounded-xl shadow-lg bg-white"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {parent.firstName} {parent.lastName}
              </h2>
              <p className="text-gray-600 mt-1">📞 {parent.telephone}</p>
              <p className="text-gray-600">✉️ {parent.email}</p>

              <h3 className="mt-4 font-medium text-lg text-gray-700">
                Children:
              </h3>
              {parent.players.length > 0 ? (
                <ul className="list-disc ml-6 mt-2 text-gray-700">
                  {parent.players.map((player) => (
                    <li key={player.id} className="py-1">
                      <span className="font-semibold">
                        {player.firstName} {player.lastName}
                      </span>{" "}
                      - {player.age} years old ({player.gender})
                    </li>
                  ))}
                </ul>
                
              ) : (
                <p className="text-gray-500 italic mt-2">
                  No children registered under this parent.
                </p>
              )}
              <button type="button" className="text-red-500 hover:underline mt-2" onClick={() => handleDeleteParent(parent.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Parents;