import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <header className="bg-gray-800 text-white p-5">
        <h1 className="text-2xl font-bold">My Application</h1>
      </header>

    
      <main className="flex-grow flex items-center justify-center">
        <button className="bg-gray-500 text-white font-semibold py-10 px-10 rounded hover:bg-gray-800 transition duration-300">
          <a href="/login">Click here to go login</a>
        </button>
      </main>

      <footer className="bg-gray-800 text-white p-5 text-center">
        <p>&copy; {new Date().getFullYear()} My Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
