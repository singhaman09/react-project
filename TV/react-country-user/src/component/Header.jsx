// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Header() {
  const { isLoggedIn, logout } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Country & User App</h1>
      {isLoggedIn && (
        <nav className="flex gap-4">
          <Link to="/country" className="hover:underline">Countries</Link>
          <Link to="/users" className="hover:underline">Users</Link>
          <button
            onClick={() => logout(() => navigate("/"))}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
