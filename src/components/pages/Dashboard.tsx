import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
  email: string;
  telephone: string;
  players: Player[];
}

const Dashboard: React.FC = () => {
  const [parent, setParent] = useState<Parent | null>(null);
  //const [parent, setParent] = useState<Parent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchParentDetails = async () => {
      const userData: Parent = JSON.parse(
        localStorage.getItem("parentData") as string
      );

      try {
        const response = await axios.get(
          `http://localhost:8080/parent/${userData.email}`
        );
        //   const response = await axios.get(
        //     "http://localhost:8080/parent/{yonas@gmail.com}",
        //     {
        //       withCredentials: true,
        //     }
        //   );
        setParent(response.data);
      } catch (error) {
        console.error("Error fetching parent details", error);
        toast.error("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchParentDetails();
  }, []);

 

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parent) {
      setParent({ ...parent, [e.target.name]: e.target.value });
    }
  };

  const handleChildChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (parent) {
      const updatedChildren = [...parent.children];
      updatedChildren[index] = {
        ...updatedChildren[index],
        [e.target.name]: e.target.value,
      };
      setParent({ ...parent, children: updatedChildren });
    }
  };

  const saveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:8080/parent/update/${parent?.id}`,
        parent,
        {
          withCredentials: true,
        }
      );
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Failed to save changes.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Hello, {parent?.firstName}</h1>

      <div className="mb-6">
        <label className="block text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          value={parent?.firstName || ""}
          onChange={handleParentChange}
          disabled={!editing}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={parent?.lastName || ""}
          onChange={handleParentChange}
          disabled={!editing}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={parent?.email || ""}
          disabled
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700">Phone Number</label>
        <input
          type="text"
          name="telephone"
          value={parent?.telephone || ""}
          onChange={handleParentChange}
          disabled={!editing}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Children</h2>
      {parent?.players.map((child, index) => (
        <div
          key={child.id}
          className="border border-gray-300 p-4 rounded-lg mb-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={child.firstName}
                onChange={(e) => handleChildChange(index, e)}
                disabled={!editing}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            {/* <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={child.lastName}
                onChange={(e) => handleChildChange(index, e)}
                disabled={!editing}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div> */}
            <div>
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={child.age}
                onChange={(e) => handleChildChange(index, e)}
                disabled={!editing}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Gender</label>
              <select
                name="gender"
                value={child.gender}
                onChange={(e) => handleChildChange(index, e)}
                disabled={!editing}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end mt-6">
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={saveChanges}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mr-3"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Player {
//   firstName: string;
//   lastName: string;
//   age: number;
//   gender: string;
// }

// interface Parent {
//   firstName: string;
//   lastName: string;
//   email: string;
//   telephone: string;
//   children: Player[];
// }

// const Dashboard: React.FC = () => {
//   const [parent, setParent] = useState<Parent | null>(null);

//   useEffect(() => {
//     const fetchParentData = async () => {
//       try {
//         const response = await axios.get<Parent>('http://localhost:8080/parent/createOrGet');
//         setParent(response.data);
//       } catch (error) {
//         console.error('Error fetching parent data:', error);
//       }
//     };

//     fetchParentData();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {parent ? (
//         <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold mb-4">Hello, {parent.firstName}!</h1>

//           <div className="mb-4">
//             <p className="text-lg font-semibold">Name: {parent.firstName} {parent.lastName}</p>
//             <p className="text-lg">Email: {parent.email}</p>
//             <p className="text-lg">Phone Number: {parent.telephone}</p>
//           </div>

//           <h2 className="text-xl font-semibold mt-6 mb-2">Children:</h2>
//           <div>
//             {parent.children.map((child, index) => (
//               <div key={index} className="border-b py-2">
//                 <p className="text-lg font-semibold">{child.firstName} {child.lastName}</p>
//                 <p>Age: {child.age}</p>
//                 <p>Gender: {child.gender}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
