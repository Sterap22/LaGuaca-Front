import React from 'react';

const Input = ({ type = "text", placeholder, value, onChange, className = "" }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${className}`}
    />
  );
};

export default Input;
