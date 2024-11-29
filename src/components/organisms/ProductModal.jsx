import React, { useState } from 'react';
import ProductCategorySection from './ProductCategorySection';

const ProductModal = ({ products = [], onAddProduct = {}, table = [], tablesObject = [], onClose = {},  onSaveTable = {}, onPay = {}, onShowHistory = {}, currentTableId = null }) => {
  const [cart, setCart] = useState([...table.orders]);
  const [total, setTotal] = useState(table.total);


  // Función para agregar productos al carrito
  const handleAddProduct = (product) => {
    const timestamp = new Date().toISOString();
    const productWithTimestamp = {
      ...product,
      addedAt: timestamp,
    };
    setCart([...cart, productWithTimestamp]);
    setTotal(total + product.price);
    onAddProduct(product.id);
  };

  // Función para quitar productos del carrito
  const handleRemoveProduct = (product) => {
    const productIndex = cart.findIndex(p => p.id === product.id);
    if (productIndex >= 0) {
      const newCart = [...cart];
      newCart.splice(productIndex, 1);
      setCart(newCart);
      setTotal(total - product.price);
    }
  };

  // Función para guardar la cuenta sin limpiar la mesa
  const handleSave = () => {
    onSaveTable({ ...table, orders: cart, total });
  };

  // Función para limpiar la mesa al realizar el pago
  const handlePayment = () => {
    onPay({ ...table, orders: [], total: 0 });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%]">
        <h2 className="text-2xl font-bold mb-4">Productos en {table.name}</h2>

        {/* Listado de productos */}
        <div className="overflow-y-auto max-h-96">
            <ProductCategorySection
              products={products}
              selectedProducts={currentTableId ? tablesObject.find((x) => x.id === currentTableId).selectedProducts : {}}
              onAddProduct={handleAddProduct}
              onRemoveProduct={handleRemoveProduct}
            />
        </div>

        {/* Total y acciones */}
        <div className="mt-6">
          <p className="text-lg font-bold">Total: ${total}</p>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          {/* Botón para ver el historial de la mesa */}
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
            onClick={() => onShowHistory(table)}
          >
            Ver Historial
          </button>

          {/* Botón para guardar los cambios */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleSave}
          >
            Guardar
          </button>

          {/* Botón para pagar y limpiar la mesa */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            onClick={handlePayment}
          >
            Pagado
          </button>

          {/* Botón para cerrar el modal */}
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
