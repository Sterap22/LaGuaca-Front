import React, { useState } from 'react';
import TableList from '../components/organisms/TableList';
import ProductModal from '../components/organisms/ProductModal';
import Modal from '../components/organisms/Modal';

const TablesPage = () => {
  const [tables, setTables] = useState([
    { id: 1, name: "Mesa 1", orders: [], total: 0, history: [], selectedProducts: {} },
    { id: 2, name: "Mesa 2", orders: [], total: 0, history: [], selectedProducts: {} },
    { id: 3, name: "Mesa 3", orders: [], total: 0, history: [], selectedProducts: {} },
    { id: 4, name: "Mesa 4", orders: [], total: 0, history: [], selectedProducts: {} },
  ]);

  // Datos de productos
  const [products] = useState([
    { id: 1, category: 'Cervezas', name: 'Águila', price: 3000, image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Botella-nueva-sin-tapa-330-cerveza-colombiana.png' },
    { id: 2, category: 'Cigarrillos', name: 'Cigarrillo Luky verde', price: 3500, image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Botella-nueva-sin-tapa-330-cerveza-colombiana.png' },
    { id: 3, category: 'Paquetes', name: 'Todo rico', price: 3500, image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Botella-nueva-sin-tapa-330-cerveza-colombiana.png' },
  ]);

  const [selectedTable, setSelectedTable] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [currentTableId, setCurrentTableId] = useState(null);

  // Función para agregar una nueva mesa
  const addTable = () => {
    const newTable = {
      id: tables.length + 1,
      name: newTableName,
      orders: [],
      total: 0,
      history: []
    };
    setTables([...tables, newTable]);
    closeAddTableModal();
  };

  //Añadir productos a la mesa
  const addProduct = (productId) => {
    const updatedTables = tables.map((table) => {
      if (table.id === currentTableId) {
        const newSelectedProducts = {
          ...table.selectedProducts,
          [productId]: (table.selectedProducts[productId] || 0) + 1
        };
        const newTotal = calculateTotal(newSelectedProducts);

        return {
          ...table,
          selectedProducts: newSelectedProducts,
          total: newTotal
        };
      }
      return table;
    });
    setTables(updatedTables);
  };

  // Función para calcular el total de la mesa
  const calculateTotal = (selectedProducts) => {
    return Object.keys(selectedProducts).reduce((acc, productId) => {
      const product = products.find((p) => p.id === parseInt(productId));
      return acc + product.price * selectedProducts[productId];
    }, 0);
  };

  // Función para abrir el modal de productos
  const openModal = (table) => {
    setCurrentTableId(table.id);
    setSelectedTable(table);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedTable(null);
    setShowModal(false);
  };

  // Función para guardar los productos de la mesa sin limpiar
  const saveTable = (updatedTable) => {
    const updatedTables = tables.map(table => {
      if (table.id === updatedTable.id) {
        return { ...table, orders: updatedTable.orders, total: updatedTable.total };
      }
      return table;
    });
    setTables(updatedTables);
    closeModal();
  };

  // Función para limpiar la mesa después del pago
  const payTable = (updatedTable) => {
    const updatedTables = tables.map(table => {
      if (table.id === updatedTable.id) {
        const newHistory = [...table.history, { orders: table.orders, total: table.total }];
        return { ...table, orders: [], total: 0, history: newHistory };
      }
      return table;
    });
    setTables(updatedTables);
  };

  // Función para mostrar el historial de la mesa
  const showTableHistory = (table) => {
    alert(`Historial de ${table.name}:\n${table.history.map((entry, index) => 
      `Pedido ${index + 1}: ${entry.orders.length} productos, Total: $${entry.total}`
    ).join('\n')}`);
  };

  // Función para crar el sorteable de la mesa falta hacerlo para mobile
  const moveAccountToTable = (fromTableId, toTableId) => {
    const fromTable = tables.find((t) => t.id === parseInt(fromTableId));
    const toTable = tables.find((t) => t.id === parseInt(toTableId));
  
    if (fromTable && toTable && fromTable.orders.length > 0) {
      const updatedToTable = {
        ...toTable,
        orders: [...toTable.orders, ...fromTable.orders],
        total: toTable.total + fromTable.total,
      };
  
      const updatedFromTable = {
        ...fromTable,
        orders: [],
        total: 0,
      };
  
      const updatedTables = tables.map((table) => {
        if (table.id === fromTable.id) return updatedFromTable;
        if (table.id === toTable.id) return updatedToTable;
        return table;
      });
  
      setTables(updatedTables);
    }
  };

  // Función para cerrar el modal de agregar mesa
  const closeAddTableModal = () => {
    setIsAddTableModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Gestión de Mesas</h1>
        
        {/* Listado de mesas */}
        <TableList tables={tables} openModal={openModal} onDrop={moveAccountToTable} />

        {/* Modal para agregar más mesas */}
          <Modal
            isOpen={isAddTableModalOpen}
            onClose={closeAddTableModal}
            onSave={addTable}
          >
            <input
                type="text"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Escribe el nombre o número de la mesa"
              />
          </Modal>

        {/* Botón para agregar más mesas */}
        <div className="flex justify-center mt-6">
          <button
            onClick={()=>{setIsAddTableModalOpen(true);}}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            + Agregar Mesa
          </button>
        </div>

        {/* Modal de productos */}
        {showModal && (
          <ProductModal 
            products={products} 
            onAddProduct={addProduct}
            table={selectedTable} 
            tablesObject={tables} 
            onClose={closeModal} 
            onSaveTable={saveTable} 
            onPay={payTable} 
            onShowHistory={showTableHistory}
            currentTableId={currentTableId}
          />
        )}
      </div>
    </div>
  );
};

export default TablesPage;
