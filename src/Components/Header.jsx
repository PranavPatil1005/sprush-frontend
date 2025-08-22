import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("loggedInUser")
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Re-check on route changes and on auth events
  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(!!localStorage.getItem("loggedInUser"));
    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth-changed", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-changed", syncAuth);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.dispatchEvent(new Event("auth-changed")); // notify app
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm font-[Segoe UI] h-[75px]">
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="text-[2rem] font-extrabold text-[#1e1e1e]">
          <Link to="/">sprush</Link>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden text-2xl text-[#333]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-[75px] left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col gap-4 md:gap-6 md:flex-row md:static md:w-auto md:bg-transparent md:shadow-none md:flex md:items-center`}
        >
          <Link to="/" className="text-[17px] font-medium text-[#333] hover:text-[#007aff] transition">
            Home
          </Link>
          <Link to="/about" className="text-[17px] font-medium text-[#333] hover:text-[#007aff] transition">
            About
          </Link>
          <Link to="/contact" className="text-[17px] font-medium text-[#333] hover:text-[#007aff] transition">
            Contact
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/login"  // ✅ was /signup by mistake
              className="px-4 py-2 bg-[#007aff] text-white rounded-md font-medium hover:bg-[#005fcc] transition"
            >
              Sign In
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-[#333] text-[#333] rounded-md font-medium hover:bg-[#f0f0f0] transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
