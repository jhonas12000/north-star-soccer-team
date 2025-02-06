
import React, { useState } from 'react';
import axios from 'axios';

interface Child {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}

const Login: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    children: [{ firstName: '', lastName: '', age: 0, gender: '' }] as Child[], // Default empty child data
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const newChildren = [...formData.children];
      newChildren[index] = { ...newChildren[index], [name]: value };
      setFormData((prev) => ({ ...prev, children: newChildren }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Add a new child
  const addChild = () => {
    setFormData((prev) => ({
      ...prev,
      children: [...prev.children, { firstName: '', lastName: '', age: 0, gender: '' }],
    }));
  };

  // Delete a child
  const deleteChild = (index: number) => {
    const newChildren = formData.children.filter((_, childIndex) => childIndex !== index);
    setFormData((prev) => ({
      ...prev,
      children: newChildren,
    }));
  };

  // Handle form submission
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (isRegistered) {
  //     console.log('Sign In with:', formData.email, formData.password);
  //   } else {
  //     console.log('Sign Up with:', formData);
  //   }
  // };



const API_BASE_URL = 'http://localhost:8080/parent/createOrCreate'; // Replace with your backend URL

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     if (isRegistered) {
//       console.log('Attempting login...');
//       const response = await axios.post('http://localhost:8080/api/auth/login', {
//         email: formData.email,
//         password: formData.password,
//       }, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (response.status === 200) {
//         alert('Login successful!');
//         console.log('Login Response:', response.data);
//         // Redirect or update UI accordingly
//       } else {
//         alert('Login failed. Please check your credentials.');
//       }
//     } else {
//       console.log('Attempting registration...');
//       const response = await axios.post('http://localhost:8080/parent/createOrGet', formData, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (response.status === 201 || response.status === 200) {
//         alert('Registration successful!');
//         console.log('Registration Response:', response.data);
//         // Optionally switch to login page
//         setIsRegistered(true);
//       } else {
//         alert('Registration failed. Please try again.');
//       }
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       alert(`Error: ${error.response.data.message || 'Something went wrong'}`);
//       console.error('Error Response:', error.response.data);
//     } else {
//       alert('Network error. Please check your connection.');
//       console.error('Error:', /*error.message*/ "error message");
//     }
//   }
// };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/parent/createOrGet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Login Successful", data);
  } catch (error) {
    console.error("Error Response:", error);
  }
};
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isRegistered ? 'Sign In' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Common Email and Password Fields */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Sign Up Only Fields */}
          {!isRegistered && (
            <>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Children Fields */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Children</h3>
                {formData.children.map((child, index) => (
                  <div key={index} className="border border-gray-200 p-4 mb-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`childFirstName-${index}`} className="block text-gray-700 mb-2">
                          Child's First Name
                        </label>
                        <input
                          type="text"
                          id={`childFirstName-${index}`}
                          name="firstName"
                          value={child.firstName}
                          onChange={(e) => handleChange(e, index)}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label htmlFor={`childLastName-${index}`} className="block text-gray-700 mb-2">
                          Child's Last Name
                        </label>
                        <input
                          type="text"
                          id={`childLastName-${index}`}
                          name="lastName"
                          value={child.lastName}
                          onChange={(e) => handleChange(e, index)}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label htmlFor={`childAge-${index}`} className="block text-gray-700 mb-2">
                          Child's Age
                        </label>
                        <input
                          type="number"
                          id={`childAge-${index}`}
                          name="age"
                          value={child.age}
                          onChange={(e) => handleChange(e, index)}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label htmlFor={`childGender-${index}`} className="block text-gray-700 mb-2">
                          Child's Gender
                        </label>
                        <select
                          id={`childGender-${index}`}
                          name="gender"
                          value={child.gender}
                          onChange={(e) => handleChange(e, index)}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Delete Button for Each Child */}
                    <button
                      type="button"
                      onClick={() => deleteChild(index)}
                      className="text-red-500 hover:underline mt-2"
                    >
                      Delete Child
                    </button>
                  </div>
                ))}

                {/* Button to Add More Children */}
                <button
                  type="button"
                  onClick={addChild}
                  className="text-blue-500 hover:underline"
                >
                  Add Another Child
                </button>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isRegistered ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          {/* Toggle between Sign In and Sign Up */}
          <div className="text-center">
            <span className="text-gray-600">
              {isRegistered ? 'Not registered yet?' : 'Already have an account?'}
            </span>
            <button
              type="button"
              onClick={() => setIsRegistered((prev) => !prev)}
              className="text-blue-500 ml-2 hover:underline"
            >
              {isRegistered ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;