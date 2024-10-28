import React from 'react';
import ProductCard from '../molecules/ProductCard';

const ProductList = ({ products = [], onAddStock = {}, onRemoveStock = {}, onDeleteProduct = {}, BtnHidden = true, onEdit = {}  }) => {
  console.log(products,' ProductList');
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
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ProductList;
