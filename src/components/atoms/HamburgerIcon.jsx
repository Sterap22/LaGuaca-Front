import React from "react";

const HamburgerIcon = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
    >
      <span className="block w-6 h-1 bg-white rounded-sm mb-1"></span>
      <span className="block w-6 h-1 bg-white rounded-sm mb-1"></span>
      <span className="block w-6 h-1 bg-white rounded-sm"></span>
    </button>
  );
};

export default HamburgerIcon;
