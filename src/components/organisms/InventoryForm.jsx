import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const InventoryForm = ({ onSave, selectedProduct, setSelectedProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // Cargar los datos del producto seleccionado en el formulario
  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price);
      setQuantity(selectedProduct.quantity);
    } else {
      setName('');
      setPrice('');
      setQuantity('');
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { name, price, quantity: parseInt(quantity) };
    onSave(product);
    setName('');
    setPrice('');
    setQuantity('');
  };

  const handleCancel = () => {
    setSelectedProduct(null); // Cancelar la edición
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex space-x-4">
        <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 py-3">
          {selectedProduct ? 'Guardar Cambios' : 'Agregar producto'}
        </Button>
        {selectedProduct && (
          <Button
            type="button"
            className="w-full bg-red-500 hover:bg-red-600 py-3"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};

export default InventoryForm;
