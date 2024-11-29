import React from 'react'
import { useAxios } from '../hooks/useAxios';

const RefreshServices = () => {
    const { callBack } = useAxios();

  const refresh  = async()=>{
    const res = await callBack('post', '/auth/refresh-token', {refreshToken:localStorage.getItem('Token-data')});
    localStorage.setItem('Token-data',res.data.token)
    return res
  }
  return {
    refresh
  }
}

export default RefreshServices