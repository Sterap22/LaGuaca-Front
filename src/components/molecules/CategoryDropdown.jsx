import React from 'react';
import UILabel from '../atoms/UILabel';

const CategoryDropdown = ({ label, categories, value, onChange }) => {
  return (
    <div className="mb-4">
      <UILabel className="block text-sm font-medium text-gray-700" text={label}/>
      <select
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Seleccionar categoría</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
