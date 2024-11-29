import React, { useState, useMemo } from 'react';
import ReportingServices from '../services/reporting.services';
import Button from '../components/atoms/Button';

const ReportingPage = () => {
  const { generatePDF, GetInfo } = ReportingServices();

  // Estado para manejar los filtros
  const [filters, setFilters] = useState({
    clientName: null,
    startDate: '',
    endDate: '',
  });

  // Estado para manejar los datos filtrados
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 10; // Cantidad de elementos por página

  // Maneja cambios en los filtros
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Aplica los filtros a los datos
  const applyFilters = () => {
    GetInfo(filters).then((succ) => {
      if (succ.status === 200) {
        const processedData = [];
        succ.data.forEach((record) => {
          const products = JSON.parse(record.product); // Deserializa el JSON del campo "product"
          products.forEach((product) => {
            processedData.push({
              id: product.id,
              name: product.name,
              price: product.price,
              clientName: record.clientName,
              addedAt: product.addedAt,
            });
          });
        });
        setFilteredData(processedData); // Actualiza el estado con los productos procesados
        setCurrentPage(1); // Reinicia a la primera página
      }
    });
  };

  // Genera el reporte con los filtros aplicados
  const handleGeneratePDF = () => {
    console.log('Generando PDF con datos:', filteredData);
    generatePDF(filteredData);
  };

  // Cálculo del total de precios y cantidades agrupadas por producto
  const summaryData = useMemo(() => {
    const summary = {};
    let totalPrice = 0;

    filteredData.forEach((item) => {
      totalPrice += item.price;

      if (!summary[item.name]) {
        summary[item.name] = { quantity: 0, totalPrice: 0 };
      }

      summary[item.name].quantity += 1; // Siempre se suma 1
      summary[item.name].totalPrice += item.price;
    });

    return {
      totalPrice,
      groupedProducts: summary,
    };
  }, [filteredData]);

  // Cálculo para el paginado
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Cambiar página
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 p-8">
      <div className="container mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Generar Reporte</h1>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Filtro por Nombre */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Filtrar por Nombre
            </label>
            <input
              type="text"
              id="name"
              name="clientName"
              value={filters.clientName}
              onChange={handleInputChange}
              placeholder="Ingrese un nombre"
              className="w-full border rounded px-4 py-2"
            />
          </div>

          {/* Filtro por Fecha Desde */}
          <div>
            <label htmlFor="dateFrom" className="block text-gray-700 font-medium mb-2">
              Fecha Desde
            </label>
            <input
              type="date"
              id="dateFrom"
              name="startDate"
              value={filters.startDate}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
            />
          </div>

          {/* Filtro por Fecha Hasta */}
          <div>
            <label htmlFor="dateTo" className="block text-gray-700 font-medium mb-2">
              Fecha Hasta
            </label>
            <input
              type="date"
              id="dateTo"
              name="endDate"
              value={filters.endDate}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
            />
          </div>
        </div>

        {/* Botón para aplicar filtros */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 mb-4"
          onClick={applyFilters}
        >
          Filtrar
        </Button>

        {/* Resumen */}
        <div className="mb-4">
          <h2 className="text-xl font-bold">Resumen</h2>
          <p>Total Precio: ${summaryData.totalPrice}</p>
          <ul>
            {Object.entries(summaryData.groupedProducts).map(([name, details]) => (
              <li key={name}>
                <strong>{name}</strong>: {details.quantity} unidades
              </li>
            ))}
          </ul>
        </div>

        {/* Grilla de Resultados */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Nombre Producto</th>
                <th className="border border-gray-300 px-4 py-2">Precio</th>
                <th className="border border-gray-300 px-4 py-2">Cliente</th>
                <th className="border border-gray-300 px-4 py-2">Fecha Agregado</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                    <td className="border border-gray-300 px-4 py-2">${item.price}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.clientName}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.addedAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center border border-gray-300 px-4 py-2"
                  >
                    No hay datos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Controles de Paginado */}
        <div className="flex justify-center items-center mt-4">
          <Button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </Button>
          <span className="mx-4 text-lg">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </Button>
        </div>

        {/* Botón para Generar Reporte */}
        <Button
          className="w-full bg-green-600 hover:bg-green-700 py-3 mt-6"
          onClick={handleGeneratePDF}
          disabled={filteredData.length === 0?true:false}
        >
          Generar Reporte
        </Button>
      </div>
    </div>
  );
};

export default ReportingPage;
