import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Student Management</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/add-student">Add Student</Link>
      </div>
    </nav>
  );
};

export default Navbar;
