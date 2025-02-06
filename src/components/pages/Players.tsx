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




  // const players: Player[] =[
  //   { id: 1, firstName: 'John', lastName: 'Doe', age: 28, gender: 'Male' },
  //   { id: 2, firstName: 'Jane', lastName: 'Smith', age: 34, gender: 'Female' },
  //   { id: 3, firstName: 'Alice', lastName: 'Brown', age: 22, gender: 'Female' },
  //   { id: 4, firstName: 'Bob', lastName: 'Johnson', age: 45, gender: 'Male' },
  // ];

  // //const UserTable: React.FC<UserTableProps> = ({ users }) => {
  //  const Players: React.FC <PlayerTableProps>= () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Players' Details</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Id Number</th>
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Age</th>
            <th className="border border-gray-300 p-2 text-left">Gender</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{player.id}</td>
              <td className="border border-gray-300 p-2">
                {player.firstName} {player.lastName}
              </td>
              <td className="border border-gray-300 p-2">{player.age}</td>
              <td className="border border-gray-300 p-2">{player.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Players;