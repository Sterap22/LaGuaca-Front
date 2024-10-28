import React from 'react';
import Button from '../atoms/Button';
import UIIconn from '../atoms/UIIconn';

const ProductCard = ({ product = [], quantity = [], onAdd = {}, onRemove = {}, BtnHidden = true, onEdit = {} }) => {
  return (
    <div className="w-40 p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
      {!BtnHidden&&(
        <Button onClick={() => onEdit(product)}  className="bg-transparent text-black" >
          <UIIconn CustomName="create-outline" CustomStyle={{ fontSize: '25px', color: 'black' }}/>
        </Button>)
      }
      <img src={product.image} alt={product.name} className="w-24 h-24 object-contain mb-2" />
      <p className="text-lg font-bold">{product.name}</p>
      <p className="text-gray-500">${product.price.toLocaleString('es-CO')}</p>
      
      {
        BtnHidden?(
          <>
            <div className="flex items-center space-x-2 mt-2">
              <Button
                onClick={()=>onRemove()}
                className="w-8 h-8 text-white bg-red-500 rounded-full flex items-center justify-center"
              >
                -
              </Button>
              <p>{quantity}</p>
              <Button
                onClick={()=>onAdd()}
                className="w-8 h-8 text-white bg-blue-500 rounded-full flex items-center justify-center"
              >
                +
              </Button>
            </div>
          </>
        ):(
          <>
            <p className="text-gray-500">{product.quantity}</p>
          </>
        )
      }
    </div>
  );
};

export default ProductCard;
