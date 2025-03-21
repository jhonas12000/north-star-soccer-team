

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./Navbar.css"; // Ensure this file exists

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logoImage = new URL("../images/North-Star-Logo.JPG", import.meta.url);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close the menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-indigo-400 flex items-center justify-between pt-5">
      <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img className="w-10 ml-7" id="logo" alt="North Star Logo" src={logoImage} />
      </Link>

      {/* Hamburger Icon */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className={`hamburger-btn ${isOpen ? "open" : ""}`}  // Toggle 'open' class based on isOpen state
        >
          <span
            className={`block w-6 h-0.5 bg-white mb-2 transition-all ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white mb-2 transition-all ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Menu */}
      <ul
        className={`md:flex ${isOpen ? "flex flex-col items-center absolute top-16 left-0 w-full bg-indigo-400 md:static md:flex-row" : "hidden md:flex"}`}
      >
        <li className="md:inline-block md:ml-10 ml-5">
          <Link to="/about" className="text-white text-base" onClick={closeMenu}>About Us</Link>
        </li>
        <li className="md:inline-block md:ml-10 ml-5">
          <Link to="/players" className="text-white text-base" onClick={closeMenu}>Our Players</Link>
        </li>
        <li className="md:inline-block md:ml-10 ml-5">
          <Link to="/parents" className="text-white text-base" onClick={closeMenu}>Parents</Link>
        </li>
        <li className="md:inline-block md:ml-10 ml-5">
          <Link to="/matches" className="text-white text-base" onClick={closeMenu}>Matches</Link>
        </li>
        <li className="md:inline-block md:ml-10 ml-5">
          <Link to="/contacts" className="text-white text-base" onClick={closeMenu}>Contacts</Link>
        </li>
        <li className="md:inline-block md:ml-10 ml-5">
          <Link to="/login" className="text-white text-base" onClick={closeMenu}>Login/Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;