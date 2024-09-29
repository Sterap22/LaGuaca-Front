import React from 'react';

const Table = ({ table, onClick, onDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault(); // Permitir soltar
  };

  const handleDrop = (e) => {
    const draggedTableId = e.dataTransfer.getData("tableId");
    onDrop(draggedTableId, table.id); // Pasar el ID de la mesa de origen y la de destino
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("tableId", table.id); // Al arrastrar, pasamos el ID de la mesa
  };

  return (
    <div
      className={`w-24 h-24 rounded-full flex items-center justify-center shadow-md cursor-pointer 
        ${table.orders.length > 0 ? 'bg-blue-300' : 'bg-gray-300'} hover:bg-blue-400 transition-all`}
      onClick={onClick}
      onDragOver={handleDragOver} // Permitir que sea "droppable"
      onDrop={handleDrop} // Recibir la cuenta arrastrada de otra mesa
      draggable="true" // Hacer que esta mesa sea "draggable"
      onDragStart={handleDragStart} // Comenzar a arrastrar
    >
      <div className="text-center">
        <p className="text-lg font-bold">{table.name}</p>
        <p className="text-gray-600">${table.total}</p>
      </div>
    </div>
  );
};

export default Table;
