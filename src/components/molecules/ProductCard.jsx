import React from 'react';

const ProductCard = ({ product = [], quantity = [], onAdd = {}, onRemove = {}, BtnHidden = true }) => {
  return (
    <div className="w-40 p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
      {!BtnHidden&&(<UIButton  CustomClick={() => alert('Editar mesa')} className="bg-transparent text-black"  text={<UIIconn CustomName="create-outline" CustomStyle={{ fontSize: '25px', color: 'black' }}/>} /> )}
      <img src={product.image} alt={product.name} className="w-24 h-24 object-contain mb-2" />
      <p className="text-lg font-bold">{product.name}</p>
      <p className="text-gray-500">${product.price.toLocaleString('es-CO')}</p>
      
      {/* Botones para agregar y quitar productos */}
      {
        BtnHidden?(
          <>
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={()=>onRemove()}
                className="w-8 h-8 text-white bg-red-500 rounded-full flex items-center justify-center"
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                onClick={()=>onAdd()}
                className="w-8 h-8 text-white bg-blue-500 rounded-full flex items-center justify-center"
              >
                +
              </button>
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
