import React, { useContext } from 'react';
import { StockContext } from '../context/StockContext';

const Navbar = () => {
  const { selectedStock } = useContext(StockContext);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg 
              className="w-8 h-8 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
            <h1 className="text-xl font-bold">Stock Analytics Dashboard</h1>
          </div>
          <div className="hidden md:block">
            {selectedStock && (
              <div className="font-semibold">
                Currently Viewing: <span className="bg-blue-700 px-2 py-1 rounded">{selectedStock}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;