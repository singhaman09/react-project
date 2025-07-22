import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthData } from '../auth/auth';
import { useEffect } from 'react';
import { isAuthenticated } from '../auth/auth';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!username.trim() || !password.trim()) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/login`,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, ...user } = response.data;
      setAuthData(token, user);
      setError('');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Invalid credentials. Please try again.');
    }
  };

    return (
        <div className="max-w-xl mx-auto mt-66 p-20 bg-white rounded-xl shadow-md px-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., kminchelle"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="e.g., 0lelplR"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-500 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      );
};

export default Login;