import React from "react";

const Nav: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">DataTable App</h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
