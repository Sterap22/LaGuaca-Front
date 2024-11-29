import React from 'react';

const Button = ({ children, onClick = {}, type = "button", className = "", CustomStyle={}, disabled= false  }) => {
  return (
    <button
      type={type}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={type === 'submit' ?null:()=>onClick()}
      style={{...CustomStyle}}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
