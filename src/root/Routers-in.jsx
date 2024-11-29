import React, { lazy } from 'react'
import {  Route, Routes } from 'react-router-dom';

const InventoryPage = lazy(()=>import('../pages/InventoryPage'))
const TablesPage = lazy(()=>import('../pages/TablesPage'))
const ReportingPage = lazy(()=>import('../pages/ReportingPage'))

const RoutersIn = () => {
    return(
    <Routes>
        <Route path="*" element={<TablesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="//Reporting" element={<ReportingPage />} />
    </Routes>
    )
}


export default RoutersIn