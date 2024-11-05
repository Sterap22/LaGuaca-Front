import React from 'react';
import ProductCard from '../molecules/ProductCard';

const ProductList = ({ products = [], onAddStock = {}, onRemoveStock = {}, onDeleteProduct = {}, BtnHidden = true, onEdit = {} }) => {

  const categories = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="mb-8">
      {
        Object.keys(categories).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="flex space-x-4 overflow-x-auto p-4 bg-gray-100 rounded-lg">
              {categories[category].map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddStock={onAddStock}
                  onRemoveStock={onRemoveStock}
                  onDeleteProduct={onDeleteProduct}
                  BtnHidden={BtnHidden}
                  onEdit={onEdit}
                />
              ))}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ProductList;
