import React from "react";
import logo from "../assets/logo.png";
const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md p-5 flex flex-col md:flex-row justify-between items-center">
      <div className="text-xl font-bold flex flex-row">
        <img className="h-10 w-20 rounded-2xl" src={logo} />
        Dashboard
      </div>
      <div>
        <a href="#" className="hover:text-blue-500 px-4">
          {" "}
          Home
        </a>
        <a href="#" className="hover:text-blue-500 px-4">
          {" "}
          About
        </a>
        <a href="#" className="hover:text-blue-500 px-4">
          {" "}
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
