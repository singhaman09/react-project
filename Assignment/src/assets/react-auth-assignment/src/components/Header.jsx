import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h2 className="font-bold text-lg">My App</h2>
      <nav className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
    </header>
  );
}
