import React from "react";

const Form: React.FC = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-y-hidden">
    <form className="bg-white p-6 rounded shadow-md max-w-md w-full space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="form-input w-full px-4 py-2 border border-red-500 rounded focus:outline-none ring-1 ring-red-500"
      />
      <input
        type="password"
        placeholder="Password"
        className="form-input w-full px-4 py-2 border border-green-500 rounded focus:outline-none ring-1 ring-green-500"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
        Login
      </button>
    </form>
  </div>
);

export default Form;
