import React, { useEffect } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { useForm } from '../../hooks/useForm';
import { FormInventory } from '../../Interface/IInventory';

const InventoryForm = ({ onSave, selectedProduct, setSelectedProduct }) => {
  const { state, setState, onChange } = useForm(FormInventory);

  useEffect(() => {
    if (selectedProduct) {
      setState({
        ...FormInventory, 
        image: selectedProduct.image, 
        name: selectedProduct.name, 
        price: selectedProduct.price, 
        quantity: selectedProduct.quantity
      })
    } else {
      setState(FormInventory)
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ValidState(state)) {
      alert('Por favor, complete todos los campos');
      return
    }
    onSave(state);
    setState(FormInventory)
  };

  const ValidState = (state) =>{
    const tempState = Object.values(state).some(element => {
      return element === "" || element === null || element === undefined;
    });
    return tempState;
  }

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          placeholder="Imagen del producto"
          value={state.image}
          onChange={({target}) => onChange(target.value, 'image')}
          className="w-full"
        />
      </div>
      <div>
        <Input
          placeholder="Nombre del producto"
          value={state.name}
          onChange={({target}) => onChange(target.value, 'name')}
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="number"
          placeholder="Precio"
          value={state.price}
          onChange={({target}) => onChange(target.value, 'price')}
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="number"
          placeholder="Cantidad"
          value={state.quantity}
          onChange={({target}) => onChange(target.value,'quantity')}
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
