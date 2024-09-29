import React from 'react';
import Table from '../molecules/Table';

const TableList = ({ tables, openModal, onDrop }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {tables.map((table) => (
        <Table 
          key={table.id} 
          table={table} 
          onClick={() => openModal(table)} 
          onDrop={onDrop} 
        />
      ))}
    </div>
  );
};

export default TableList;
