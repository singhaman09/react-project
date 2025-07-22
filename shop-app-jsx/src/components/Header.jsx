// src/components/Header.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Header = () => {
  const { logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex gap-4">
        <Link to="/">🏪 Smart Shop</Link>
        <Link to="/cart">🛒 Cart ({cartItems.length})</Link>
      </div>
      <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
    </header>
  );
};

export default Header;
