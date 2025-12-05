import React, { useState } from "react";
import { Heart, ShoppingBag, LogOut, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [liked, setLiked] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="w-full bg-white shadow-md px-5 py-5 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="text-3xl font-bold font-['Dancing_Script']">Quirky Cart</div>

      {/* Center: Links */}
      <div className="flex gap-10 text-base font-normal">
        <Link to="/" className="relative group cursor-pointer">
          Home
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <a href="#" className="relative group cursor-pointer">
          About Us
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#" className="relative group cursor-pointer">
          Contact Us
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#" className="relative group cursor-pointer">
          Products
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#" className="relative group cursor-pointer">
          Blog
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-6">
        <Heart
          size={22}
          onClick={() => setLiked(!liked)}
          className={`cursor-pointer transition-all ${liked ? "text-red-500" : "text-gray-700"}`}
        />

        <ShoppingBag size={22} className="cursor-pointer text-gray-700 hover:text-pink-500" />

        {isAuthenticated ? (
          <>
            <span className="text-sm text-gray-700 font-medium">
              Hello, {user?.name || user?.email?.split('@')[0] || 'User'}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          </>
        ) : (
          <Link to="/login">
            <LogIn size={22} className="cursor-pointer text-gray-700 hover:text-pink-500" />
          </Link>
        )}
      </div>
    </nav>
  );
}
