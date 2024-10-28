import React from 'react';
import Table from '../molecules/Table';

const TableList = ({ tables = [],openModal, onDrop }) => {
  return (
           <Table 
          key={tables.id} 
          table={tables} 
          onClick={() => openModal(tables)} 
          onDrop={onDrop} 
        />
  );
};

export default TableList;
