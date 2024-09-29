import React, { lazy } from 'react'
import {  Route, Routes } from 'react-router-dom';

const LoginPage = lazy(()=>import('../pages/LoginPage'))
const InventoryPage = lazy(()=>import('../pages/InventoryPage'))
const TablesPage = lazy(()=>import('../pages/TablesPage'))

const Routers = () => {
    return(
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<TablesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
    </Routes>
    )
}


export default Routers