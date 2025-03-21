
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface Match {
//     id: number;
//     ageGroup: string;
//     teamName: string;
//     gameDate: string;
//     result: string;
// }

// const Home: React.FC = () => {
//     const [currentDate, setCurrentDate] = useState<string>("");
//     const [matches, setMatches] = useState<Match[]>([]);

//     // Fetch current date
//     useEffect(() => {
//         const today = new Date();
//         setCurrentDate(today.toDateString()); // Example: "Tue, Mar 5, 2025"
//     }, []);

//     // Fetch matches from the backend
//     useEffect(() => {
//         axios.get("http://localhost:8080/matchesApi/matches") // Adjust API endpoint
//             .then(response => {
//                 // Sort matches by date in descending order
//                 const sortedMatches = response.data.sort((a: Match, b: Match) =>
//                     new Date(b.gameDate).getTime() - new Date(a.gameDate).getTime()
//                 );
//                 setMatches(sortedMatches.slice(0, 5)); // Take only 5 matches
//             })
//             .catch(error => console.error("Error fetching matches:", error));
//     }, []);

//     return (
//       <>
//       <div className="relative w-full h-screen bg-cover bg-center bg-[url('NorthStar2.jpeg')]">

//         <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
//          <div className="text-center text-white">
        
//             <header className="text-center mb-4">
//               <p className="text-lg text-gray-600 mt-2">{currentDate}</p>
//               <h3 className="text-4xl md:text-4xl font-bold mb-2">
//                 Welcome to North Star Soccer Team
//               </h3>
//               <p className="text-lg md:text-2xl">
//                 Saint Marry Eritrean Orthodox Church Childrens' Club
//               </p>
//               <p className="text-lg md:text-1xl">Join us in building a strong soccer community for our kids!</p>
              
//             </header>

            
//             <div className="w-full flex">
                
//             <div className="absolute top-5 right-5 bg-black bg-opacity-80 text-white p-4 rounded-lg shadow-lg w-64">
//                     <h2 className="text-xl font-semibold mb-3">Recent & Upcoming Matches</h2>
//                     <ul className="space-y-4">
//                         {matches.length > 0 ? (
//                             matches.map(match => (
//                                 <li key={match.id} className="bg-black-200 p-2 rounded">
//                                     <span className="font-bold">{match.gameDate}:</span> {match.teamName} ({match.ageGroup})  
//                                     <span className="text-sm text-white-600"> - {match.result}</span>
//                                 </li>
//                             ))
//                         ) : (
//                             <p className="text-gray-500">No matches available.</p>
//                         )}
//                     </ul>
//                 </div>

                
//             </div>
//         </div>
//         </div>
//          </div>
//          </>
//     );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Match {
    id: number;
    ageGroup: string;
    teamName: string;
    gameDate: string;
    result: string;
}

const Home: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<string>("");
    const [allMatches, setAllMatches] = useState<Match[]>([]);
    const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);

    // Fetch current date
    useEffect(() => {
        const today = new Date();
        setCurrentDate(today.toDateString());
    }, []);

    // Fetch matches from the backend
    useEffect(() => {
        axios.get("http://localhost:8080/matchesApi/matches")
            .then(response => {
                const sortedMatches = response.data.sort((a: Match, b: Match) =>
                    new Date(b.gameDate).getTime() - new Date(a.gameDate).getTime()
                );
                setAllMatches(sortedMatches);
                setFilteredMatches(sortedMatches); // Initialize with all matches
            })
            .catch(error => console.error("Error fetching matches:", error));
    }, []);

    // Handle filtering logic
    const handleFilterChange = (filter: string) => {
        if (filter === "all") {
            setFilteredMatches(allMatches);
        } else {
            const now = new Date();
            setFilteredMatches(
                allMatches.filter(match =>
                    filter === "upcoming" ? new Date(match.gameDate) > now :
                    filter === "past" ? new Date(match.gameDate) < now : true
                )
            );
        }
    };

    return (
      <>
      <div className="relative w-full h-screen bg-cover bg-center bg-[url('/NorthStar3.jpeg')]">
        <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center">
         
            <p className="absolute top-4 text-center text-lg italic text-white font-semibold">
                {currentDate}
            </p>
         
            <div className="text-center text-white">
                <header className="text-center mb-4">
                    <h3 className="text-4xl md:text-4xl font-bold mb-2">
                        Welcome to North Star Soccer Team
                    </h3>
                    <p className="text-lg md:text-2xl">
                        Saint Marry Eritrean Orthodox Church Childrens' Club
                    </p>
                    <p className="text-lg md:text-1xl">Join us in building a strong soccer community for our kids!</p>
                </header>

                {/* Recent & Upcoming Matches Dropdown */}
                <div className="absolute top-4 right-4 bg-blue-900 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-3">Recent & Upcoming Matches</h2>
                    <select className="mb-2 p-2 bg-gray-800 text-white rounded" onChange={(e) => handleFilterChange(e.target.value)}>
                        <option value="all">All Matches</option>
                        <option value="upcoming">Upcoming Matches</option>
                        <option value="past">Past Matches</option>
                    </select>
                    <ul className="space-y-4">
                        {filteredMatches.length > 0 ? (
                            filteredMatches.map(match => (
                                <li key={match.id} className="bg-black-200 p-2 rounded">
                                    <span className="font-bold">{match.gameDate}:</span> {match.teamName} ({match.ageGroup})  
                                    <span className="text-sm text-white-600"> - {match.result}</span>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500">No matches available.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>

        {/* Team Jersey at Bottom Right */}
        <img 
          src="/NorthStarJersey.jpg" 
          alt="Team Jersey" 
          className="absolute bottom-8 right-4 w-40 h-80 md:w-48 md:h-72 object-contain" 
        />
      </div>
      </>
    );
};

export default Home;