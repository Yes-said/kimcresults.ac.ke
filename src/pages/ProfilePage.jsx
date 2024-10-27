import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { user, setUser, logout } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('/profile', { withCredentials: true });
        setUser(data); // Set user data in context if token is verified
      } catch (err) {
        console.error('Token verification failed:', err);
        setError('Please log in to view your profile.');
        navigate('/login'); // Redirect to login page if verification fails
      }
    };

    if (!user) {
      fetchUserProfile(); // Fetch only if user data is not already set
    }
  }, [user, setUser, navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">User Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Add more user fields as needed */}
      </div>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
      <Link to="/" className="mt-2 inline-block text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default ProfilePage;
