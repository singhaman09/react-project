import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import StudentForm from "./components/StudentForm";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useSelector } from "react-redux";
import "./styles.css";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  
  return (
    <Router>
      <div className="container">
        <nav>
          <div className="nav-links">
            <Link to="/">🏠 Home</Link>
            <Link to="/add">➕ Add Student</Link>
            
          </div>
          <ThemeToggle /> {/* Move ThemeToggle inside nav */}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/edit/:id" element={<StudentForm />} />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={1000} />
    </Router>
  );
}
