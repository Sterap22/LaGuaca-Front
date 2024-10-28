import React, { useState } from 'react';
import ProductList from '../components/organisms/ProductList';
import InventoryForm from '../components/organisms/InventoryForm';

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const handleProductSave = (product) => {
    if (selectedProduct) {
      setProducts(products.map((p) => (p.id === selectedProduct.id ? product : p)));
    } else {
      setProducts([...products, { ...product, id: products.length + 1 }]);
    }
    setSelectedProduct(null);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Inventario de Productos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario de Inventario */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              {selectedProduct ? 'Editar Producto' : 'Agregar Producto'}
            </h2>
            <InventoryForm
              onSave={handleProductSave}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          </div>

          {/* Listado de Productos */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Lista de Productos</h2>
            {products.length > 0 ? (
              <ProductList products={products} onEdit={handleEditProduct} BtnHidden={false}/>
            ) : (
              <p className="text-gray-600">No hay productos en el inventario.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
