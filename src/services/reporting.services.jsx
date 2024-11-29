import React from 'react';
import { useAxios } from '../hooks/useAxios';

const ReportingServices = () => {
  const { callBack } = useAxios();

  const generatePDF = (filteredData) => {
    // Creamos una nueva ventana para la impresión
    const printWindow = window.open('', '_blank');
  
    // Calculamos el total general de dinero y el total por producto
    const productTotals = {};
    let totalMoney = 0;
  
    filteredData.forEach((item) => {
      totalMoney += item.price;
      if (!productTotals[item.name]) {
        productTotals[item.name] = { quantity: 0, totalPrice: 0 };
      }
      productTotals[item.name].quantity += 1; // Cada producto siempre tiene cantidad 1
      productTotals[item.name].totalPrice += item.price;
    });
  
    // Construimos las filas de la tabla dinámicamente
    const rows = filteredData
      .map(
        (item) => `
        <tr>
          <td>${item.clientName}</td>
          <td>${item.name}</td>
          <td>1</td>
          <td>${new Date(item.addedAt).toLocaleDateString()}</td>
          <td>${item.price}</td>
        </tr>`
      )
      .join('');
  
    // Construimos el resumen por producto
    const productSummaryRows = Object.entries(productTotals)
      .map(
        ([productName, details]) => `
        <tr>
          <td>${productName}</td>
          <td>${details.quantity}</td>
          <td>${details.totalPrice}</td>
        </tr>`
      )
      .join('');
  
    // HTML dinámico a ser exportado como PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reporte</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }
          h1, h2 {
            text-align: center;
            color: #333;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f4f4f4;
          }
        </style>
      </head>
      <body>
        <h1>Reporte de Productos</h1>
        <p>Fecha: ${new Date().toLocaleDateString()}</p>
  
        <!-- Tabla de Detalles -->
        <h2>Detalles de Productos</h2>
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Fecha de Compra</th>
              <th>Precio Unitario</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
  
        <!-- Resumen por Producto -->
        <h2>Resumen por Producto</h2>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Total Cantidad</th>
              <th>Total Dinero</th>
            </tr>
          </thead>
          <tbody>
            ${productSummaryRows}
          </tbody>
        </table>
  
        <!-- Total General -->
        <h2>Total General</h2>
        <p>Total Dinero: <strong>$${totalMoney}</strong></p>
      </body>
      </html>
    `;
  
    // Escribe el contenido HTML en la nueva ventana
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  
    // Después de que la ventana se cargue, llama a la función de impresión
    printWindow.onload = () => {
      printWindow.print(); // Abre el cuadro de diálogo para guardar como PDF
      printWindow.close(); // Cierra la ventana después de la impresión
    };
  };
  

  const GetInfo = async (state) => {
    const res = await callBack('post', '/report/create', state);
    return res;
  };

  return {
    generatePDF,
    GetInfo,
  };
};

export default ReportingServices;
