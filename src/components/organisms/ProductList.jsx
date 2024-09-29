import React from 'react';
import ProductCard from '../molecules/ProductCard';

const ProductList = ({ products = [], onAddStock = {}, onRemoveStock = {}, onDeleteProduct = {}, BtnHidden = true  }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddStock={onAddStock}
          onRemoveStock={onRemoveStock}
          onDeleteProduct={onDeleteProduct}
          BtnHidden={BtnHidden}
        />
      ))}
    </div>
  );
};

export default ProductList;
