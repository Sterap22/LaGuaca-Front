import React, { useState } from "react";
import Logo from "../atoms/Logo";
import HamburgerIcon from "../atoms/HamburgerIcon";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg fixed w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Logo />

        {/* Hamburger Icon */}
        <HamburgerIcon onClick={toggleMenu} />

        {/* Navigation Links */}
        <div
          className={`fixed top-16 left-0 w-full bg-blue-600 lg:static lg:bg-transparent lg:flex lg:items-center transition-all duration-300 ease-in-out z-20 ${
            menuOpen ? "block opacity-100" : "hidden opacity-0"
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:gap-8 items-center text-white text-lg font-medium">
            <li className="py-4 lg:py-0">
              <a href="/home" className="hover:text-yellow-300 transition">
                Home
              </a>
            </li>
            <li className="py-4 lg:py-0">
              <a href="/inventory" className="hover:text-yellow-300 transition">
                Inventory
              </a>
            </li>
            <li className="py-4 lg:py-0">
              <a href="/Reporting" className="hover:text-yellow-300 transition">
                Reporting
              </a>
            </li>
            <li className="py-4 lg:py-0">
              <a  className="hover:text-yellow-300 transition" onClick={()=>{localStorage.clear();window.location.reload();}}>
                logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
