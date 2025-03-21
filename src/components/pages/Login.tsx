

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

interface Player {
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string;
  gender: string;
}

const Login: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(true); // Default to Sign In
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    telephone: '',
    children: [{ firstName: '', lastName: '', age: 0, birthDate: '', gender: '' }] as Player[],
  });

  const navigate = useNavigate(); // Hook to navigate between pages

   // Handle input changes
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
  
    if (index !== undefined) {
      const newChildren = [...formData.children];
  
      if (name === "birthdate") {
        // Ensure value is stored in the correct format
        newChildren[index] = { ...newChildren[index], birthDate: value };
      } else {
        newChildren[index] = { ...newChildren[index], [name]: value };
      }
  
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
      children: [...prev.children, { firstName: '', lastName: '', age: 0, birthDate: '', gender: '' }],
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


  const API_BASE_URL = 'http://localhost:8080/parent';

  // Handle Login or Registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isRegistered) {
        // Sign In Functionality
        const response = await axios.post(`${API_BASE_URL}/createOrGet`, {
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 200) {
          const parentData = response.data;
          toast.success(`Welcome ${parentData.firstName}!`);

          // Store user data in localStorage or sessionStorage
          localStorage.setItem("parentData", JSON.stringify(parentData));

          // Redirect to Dashboard
          navigate('/dashboard');
        }
      } else {
        // Sign Up Functionality
        const response = await axios.post(`${API_BASE_URL}/createOrGet`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          telephone: formData.telephone,
          players: formData.children,
        });

        if (response.status === 200) {
          const parentName = response.data;
          toast.success("Welcome " + parentName.firstName + " registration has been successful! You can sign in to check your profile.");
          setIsRegistered(true); // Switch to Sign In mode
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Email or password is incorrect");
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

 //const navigate = useNavigate(); // Hook to navigate between pages

  const handleForgotPassword = () => {
    navigate('/forgotPassword'); // Redirect to the Forgot Password page
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
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
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
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
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
                <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name</label>
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
                <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name</label>
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
              <div className="mb-4">
                <label htmlFor="telephone" className="block text-gray-700 mb-2">Telephone</label>
                <input
                  type="text"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
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
                          First Name
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
                          Last Name
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
                        <label htmlFor={`childBirthdate-${index}`} className="block text-gray-700 mb-2">
                          Birthday
                        </label>
                        <input
                          type="date"
                          id={`childBirthdate-${index}`}
                          name="birthdate"
                          value={child.birthDate || ""}
                          onChange={(e) => handleChange(e, index)}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label htmlFor={`childGender-${index}`} className="block text-gray-700 mb-2">
                          Gender
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
                        </select>
                      </div>
                    </div>

                    
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
          <div className="text-center mt-4">
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={handleForgotPassword} // Trigger navigation to Forgot Password page
            >
              Forgot Email or Password?
            </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
