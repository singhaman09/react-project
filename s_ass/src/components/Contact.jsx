import React from 'react';

const Contact = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-300">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Message"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition font-bold">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
