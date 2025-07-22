import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../auth/auth';

const Dashboard = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto mt-66 p-20 bg-white rounded-xl shadow-md px-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Welcome, {user.firstName}!
      </h2>
      <div className="text-gray-700 space-y-2 mb-6">
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p>
          <span className="font-medium">Name:</span> {user.firstName} {user.lastName}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
