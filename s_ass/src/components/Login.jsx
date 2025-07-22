import React, { useCallback } from 'react';

//callback
const Login = () => {
  const handleLogin = useCallback(() => {
    alert("Logging in...");
  }, []);

  const handleForgotPassword = useCallback(() => {
    alert("Redirecting to forgot password...");
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-300">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 text-left hover:underline"
          >
            Forgot Password?
          </button>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
