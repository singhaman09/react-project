import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar :React.FC=() => (
  <aside className="w-64 bg-white p-4 shadow-md h-screen sticky top-0 hidden md:block">
    <h2 className="font-semibold mb-4">Menu</h2>
    <ul className="space-y-2">
      <li><NavLink to="/" className="hover:text-blue-500">Dashboard</NavLink></li>
      <li><NavLink to="/card" className="hover:text-blue-500">Card</NavLink></li>
      <li><NavLink to="/form" className="hover:text-blue-500">Form</NavLink></li>
      <li><NavLink to="/gallery" className="hover:text-blue-500">Gallery</NavLink></li>
      <li><NavLink to="/blog" className="hover:text-blue-500">Blog Post</NavLink></li>
      <li><NavLink to="/pricing" className="hover:text-blue-500">Pricing</NavLink></li>
      <li><NavLink to="/buttons" className="hover:text-blue-500">Buttons</NavLink></li>
    </ul>
  </aside>
);

export default Sidebar;
