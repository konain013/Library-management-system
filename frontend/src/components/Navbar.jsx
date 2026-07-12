// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#1E2937] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#22C55E] rounded-xl flex items-center justify-center text-white font-bold text-2xl">
            📚
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">BookHub</h1>
            <p className="text-xs text-gray-400 -mt-1">Library Management</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link
            to="/dashboard"
            className="hover:text-[#22C55E] transition-colors duration-200 flex items-center gap-1.5"
          >
            <span>📖</span> Dashboard
          </Link>

          <Link
            to="/my-books"
            className="hover:text-[#22C55E] transition-colors duration-200 flex items-center gap-1.5"
          >
            <span>📚</span> My Books
          </Link>

          {user?.role === 'admin' && (
            <Link
              to="/admin/manage-books"
              className="hover:text-[#22C55E] transition-colors duration-200 flex items-center gap-1.5 bg-[#22C55E]/10 px-4 py-1.5 rounded-xl border border-[#22C55E]/30"
            >
              <span>🗂️</span> Manage Books
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {(user?.role === 'admin' || user?.role === 'user') && (
            <Link
              to="/adminDashboard"
              className="flex items-center gap-3 bg-[#334155] hover:bg-[#3d4a5f] px-4 py-2 rounded-2xl transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-[#22C55E]/20 text-[#22C55E] rounded-full flex items-center justify-center font-semibold text-sm">
                ⚙️
              </div>
              <div>
                <p className="text-sm font-medium">Admin Panel</p>
                <p className="text-xs text-gray-400">Manage system</p>
              </div>
            </Link>
          )}

          <div className="flex items-center gap-3 bg-[#334155] px-4 py-2 rounded-2xl">
            <div className="w-8 h-8 bg-[#22C55E] text-[#1E2937] rounded-full flex items-center justify-center font-semibold text-sm">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 flex items-center gap-2 border border-red-500/30"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;