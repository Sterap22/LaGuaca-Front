import React from 'react'

const UILabel = ({ text = "", htmlFor = "", className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`text-gray-700 ${className}`}>
      {text}
    </label>
  );
};

export default UILabel;
