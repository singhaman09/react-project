import { Link } from "react-router-dom";
import '../../index.css';
import { useState } from "react";

export default function Header() {
  const [sidebar, setSidebar] = useState(false);
  return (
    <>
      <header className="bg-purple-900 text-white shadow-md py-4 px-6 flex items-center justify-between">
        <h2 onClick={() => setSidebar(true)} className="text-2xl font-bold cursor-pointer">ShopSizzle</h2>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/login" className="hover:text-yellow-300">Login</Link>
          <Link to="/contact" className="hover:text-yellow-300">Contact Us</Link>
        </nav>
      </header>

      {/* Sidebar */}
      {sidebar && (
        <div className="fixed top-0 left-0 w-95 h-full bg-purple-800 shadow-lg z-50 transition-transform duration-300 overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b py-5">
            <h2 className="text-2xl font-extrabold text-white">Shopify</h2>
            <button onClick={() => setSidebar(false)} className="text-red-700 cursor-pointer border px-2 bg-red-200 text-4xl">&times;</button>
          </div>
          <div className="p-4">
            <ul className="flex flex-col gap-y-12 text-white text-center break-words">
              <li className="bg-purple-900 px-2 py-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 rounded-2xl font-semibold">
                Speaker
              </li>
              <li className="bg-purple-900 px-2 py-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 rounded-2xl font-semibold">
              Smartphone
              </li>
              <li className="bg-purple-900 px-2 py-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 rounded-2xl font-semibold">
              Smartwatch
              </li>
              <li className="bg-purple-900 px-2 py-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 rounded-2xl font-semibold">
              Laptop
              </li>
              <li className="bg-purple-900 px-2 py-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 rounded-2xl font-semibold">
              Fitness tracker
              </li>
              <li className="bg-purple-900 px-2 py-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 rounded-2xl font-semibold">
              Webcam
              </li>
              <li className="bg-purple-900 px-2 py-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 rounded-2xl font-semibold">
              Drone
              </li>
              <li className="bg-purple-900 px-1 py-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 rounded-2xl font-semibold">
              Printer
              </li>
              
            </ul>
          </div>
        </div>
      )}
    </>
  );}