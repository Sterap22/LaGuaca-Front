import React, { useEffect, useState } from 'react';
import TableList from '../components/organisms/TableList';
import ProductModal from '../components/organisms/ProductModal';
import Modal from '../components/organisms/Modal';
import TableService from '../services/table.service';
import { FormSell } from '../Interface/ISell';

const TablesPage = () => {
  const { GetTable, GetProduct, GetCategory, SaveSell,CreateTableServices, PaySell }  = TableService();
  const [tables, setTables] = useState([]);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedTable, setSelectedTable] = useState(null);
  const [sellDTO, setSellDTO] = useState(FormSell);
  const [showModal, setShowModal] = useState(false);
  const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [currentTableId, setCurrentTableId] = useState(null);

  const addTable = () => {
    CreateTableServices({name: newTableName}).then((succ)=>{
      if (succ.status===200) {
        const newTable = {
          id: succ.data.id,
          name: succ.data.name,
          orders: [],
          total: 0,
          history: []
        };
        setTables([...tables, newTable]);
        closeAddTableModal();
      }
    })
  };

  useEffect(() => {
    GetAllCategory();
    GetAllTable();
  }, [])

  const GetAllTable =()=>{
    GetTable().then(
      (succ)=>{
        if (succ.status !== 200) {
          return
        }
        const newTable = [];
        succ.data.forEach(element => {
          newTable.push({
            id: element.id,
            name: element.name,
            orders: [],
            total: 0,
            history: [],
            selectedProducts: {},
            idSell: 0
          });
          setTables(newTable);
        });
      })
  }

  const GetAllCategory =()=>{
    GetCategory().then(
      (succ)=>{
        if (succ.status !== 200) {
          return
        }
        const newCategory = [];
        succ.data.forEach(element => {
          newCategory.push({
            id: element.id,
            name: element.name
          });
        });
        setCategory(newCategory);
        GetAllProduct(newCategory);
      })
  }

  const GetAllProduct = (categories) =>{
    GetProduct().then((succ)=>{
      if (succ.status !== 200) {
        return
      }
      const newProduct = [];
      succ.data.forEach(element => {
        if (element.quantity > 0) {
          const tempCategory = categories.find((x) => x.id == element.category);
          
          const categoryName = tempCategory ? tempCategory.name : 'Sin categoría';
          newProduct.push({
            id: element.id,
            category: categoryName,
            name: element.name,
            price: element.price,
            image: element.image,
            quantity: element.quantity,
          });
        }
      });
      setProducts(newProduct);      
    })
  }
  

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

  const calculateTotal = (selectedProducts) => {
    return Object.keys(selectedProducts).reduce((acc, productId) => {
      const product = products.find((p) => p.id === parseInt(productId));
      return acc + product.price * selectedProducts[productId];
    }, 0);
  };

  const openModal = (table) => {
    setCurrentTableId(table.id);
    setSelectedTable(table);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTable(null);
    setShowModal(false);
  };

  const saveTable = (updatedTable) => {
    let updatedTables = tables.map(table => {
      if (table.id === updatedTable.id) {
        return { ...table, orders: updatedTable.orders, total: updatedTable.total };
      }
      return table;
    });
    SaveSell({...sellDTO,
      id: updatedTable.idSell,
      quantity: updatedTable.orders.length,
      idTable: updatedTable.id,
      product: JSON.stringify(updatedTable.orders),
      clientName: updatedTable.name,
      idUser: 1,
      state: true
    }).then((succ)=>{
      if (succ.status === 200) {
        updatedTables = tables.map(table => {
          if (table.id === updatedTable.id) {
            return { ...table, orders: updatedTable.orders, total: updatedTable.total, idSell: succ.data.newSell.id };
          }
          return table;
        });
        setTables(updatedTables);
        closeModal();
      }
    })
  };

  const payTable = (updatedTable) => {
    PaySell({id: updatedTable.id, state: false}).then(()=>{
      window.location.reload()
    })
    
  };

  const showTableHistory = (table) => {
    alert(`Historial de ${table.name}:\n${table.history.map((entry, index) => 
      `Pedido ${index + 1}: ${entry.orders.length} productos, Total: $${entry.total}`
    ).join('\n')}`);
  };

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

  const closeAddTableModal = () => {
    setIsAddTableModalOpen(false);
  };

  const handleDragStart = (event, tableId) => {
    event.dataTransfer?.setData('text/plain', tableId);
    setCurrentTableId(tableId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetTableId) => {
    event.preventDefault();
    const fromTableId = parseInt(event.dataTransfer?.getData('text'));
    moveAccountToTable(fromTableId, targetTableId);
  };

  const handleTouchStart = (tableId) => {
    setCurrentTableId(tableId);
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
  };

  const handleTouchEnd = (targetTableId) => {
    if (currentTableId !== null) {
      moveAccountToTable(currentTableId, targetTableId);
      setCurrentTableId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 text-white">Gestión de Mesas</h1>
        
        <div className="grid grid-cols-2 gap-6">
          {tables.length  > 0 && tables.map((table) => (
            <div
              key={table.id}
              draggable
              onDragStart={(event) => handleDragStart(event, table.id)}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, table.id)}
              onTouchStart={(event) => handleTouchStart(event, table.id)}
              onTouchMove={(event) =>handleTouchMove(event)}
              onTouchEnd={() => handleTouchEnd(table.id)}
              className="table-item"
            >
               {/* Listado de mesas */}
                <TableList tables={table} openModal={openModal} onDrop={moveAccountToTable} />
            </div>
          ))}
        </div>

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

        <div className="flex justify-center mt-6">
          <button
            onClick={()=>{setIsAddTableModalOpen(true);}}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            + Agregar Mesa
          </button>
        </div>

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
