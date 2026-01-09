import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { formatCurrency } from "../utils/helpers";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useUser();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <div className="w-11 h-11 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-xl">₹</span>
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">
              FinTech Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-all duration-300 ${isActive("/")
                ? "text-purple-400"
                : "text-gray-300 hover:text-purple-400"
                }`}
            >
              Home
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-all duration-300 ${isActive("/dashboard")
                    ? "text-purple-400"
                    : "text-gray-300 hover:text-purple-400"
                    }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/transactions"
                  className={`text-sm font-medium transition-all duration-300 ${isActive("/transactions")
                    ? "text-purple-400"
                    : "text-gray-300 hover:text-purple-400"
                    }`}
                >
                  Transactions
                </Link>
              </>
            )}
          </div>

          {/* Right Side - Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {user?.walletBalance !== undefined && (
                  <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30 backdrop-blur-sm">
                    <span className="text-sm font-bold text-green-400">
                      {formatCurrency(user.walletBalance)}
                    </span>
                  </div>
                )}
                <div className="text-sm font-medium text-gray-300 px-3 py-2 bg-white/5 rounded-lg">
                  {user?.username}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-purple-400 font-medium hover:text-purple-300 transition-all duration-300 text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-white/10 animate-fadeIn">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 rounded-lg transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 rounded-lg transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/transactions"
                  className="block px-4 py-2 text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 rounded-lg transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Transactions
                </Link>
                <div className="px-4 py-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <p className="text-sm text-gray-400">Balance:</p>
                  <p className="font-bold text-green-400">
                    {formatCurrency(user?.walletBalance || 0)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-center text-purple-400 font-medium hover:bg-purple-500/10 rounded-lg transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-center bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;