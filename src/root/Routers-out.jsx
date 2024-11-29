import React, { lazy } from 'react'
import {  Route, Routes } from 'react-router-dom';

const LoginPage = lazy(()=>import('../pages/LoginPage'))

const RoutersOut = () => {
    return(
    <Routes>
        <Route path="*" element={<LoginPage />} />
    </Routes>
    )
}


export default RoutersOut