// src/components/Navbar.jsx
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          FinTrack
        </Link>

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="text-white hover:text-yellow-300 transition">Home</Link>
          <Link to="/dashboard" className="text-white hover:text-yellow-300 transition">Dashboard</Link>
          <Link to="/transactions" className="text-white hover:text-yellow-300 transition">Transactions</Link>
        </div>

        {/* Buttons */}
        <div className="space-x-3">
          <Link to="/login" className="px-4 py-2 bg-yellow-400 rounded-lg text-black font-medium hover:bg-yellow-500 transition">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 border border-yellow-400 rounded-lg text-white hover:bg-yellow-400 hover:text-black transition">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;