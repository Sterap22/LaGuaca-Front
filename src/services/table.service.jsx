import React from 'react'
import { useAxios } from '../hooks/useAxios';
import { FormSell } from '../Interface/ISell';

const TableService = () => {
    const { callBack } = useAxios();

    const GetTable = async() =>{
        const res = await callBack('get', '/table/')
        return res
    }

    const CreateTableServices = async(body = CreateTable) =>{
        const res = await callBack('post', '/table/create',body)
        return res
    }

    const SaveSell = async(body = FormSell) =>{
        const res = await callBack('post', '/sell/create', body)
        return res
    }

    const PaySell = async(body) =>{
        const res = await callBack('patch', `/table/payAccount/${body.id}`, body)
        return res
    }

    const GetProduct = async() =>{
        const res = await callBack('get', '/product/')
        return res
    }

    const GetCategory = async() =>{
        const res = await callBack('get', '/category/')
        return res
    }
  return {
    GetTable,
    GetProduct,
    GetCategory,
    SaveSell,
    CreateTableServices,
    PaySell
  }
}

export default TableService