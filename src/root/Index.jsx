import React from 'react'
import RoutersIn from './Routers-in'
import RoutersOut from './Routers-out'
import MainTemplate from '../components/template/MainTemplate'

const IndexRoot = () => {
  return localStorage.getItem('Token-data')?
  <MainTemplate>
    <RoutersIn/>
  </MainTemplate>:
  <RoutersOut/>
}

export default IndexRoot