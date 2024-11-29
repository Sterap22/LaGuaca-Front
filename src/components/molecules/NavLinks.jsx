import React, { useState } from "react";
import Logo from "../atoms/Logo";
import HamburgerIcon from "../atoms/HamburgerIcon";
import Button from "../atoms/Button";

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

        {/* Hamburger Icon (Mobile Only) */}
        <HamburgerIcon onClick={toggleMenu} />

        {/* Navigation Links */}
        <div
          className={`absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-blue-600 lg:bg-transparent lg:flex lg:items-center transition-all duration-300 ease-in-out z-20 ${
            menuOpen ? "block opacity-100" : "hidden lg:block"
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:gap-8 items-center text-white text-lg font-medium">
            <li className="py-4 lg:py-0">
              <a href="#home" className="hover:text-yellow-300 transition">
                Home
              </a>
            </li>
            <li className="py-4 lg:py-0">
              <a href="#services" className="hover:text-yellow-300 transition">
                Services
              </a>
            </li>
            <li className="py-4 lg:py-0">
              <a href="#contact" className="hover:text-yellow-300 transition">
                Contact
              </a>
            </li>
          </ul>
          {/* Mobile Only Button */}
          <div className="flex justify-center mt-4 lg:hidden">
            <Button text="Login" className="bg-white text-blue-500 font-semibold" />
          </div>
        </div>

        {/* Login Button (Desktop Only) */}
        <div className="hidden lg:block">
          <Button text="Login" className="bg-white text-blue-500 font-semibold" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
