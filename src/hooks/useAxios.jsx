import Axios from 'axios'
import { url } from '../utils/config'

export const useAxios = () => {
    const callBack = async(method, endpoint, body) =>{
      let res =  await Axios({
            method: method,
            url: url+endpoint,
            headers:{
                'Content-Type':'application/json',
                Authorization: !!localStorage.getItem('Token-data')?"Bearer "+localStorage.getItem('Token-data'):''
            },
            data: method.toLowerCase() !== 'get'&&JSON.stringify(body)
        }).then((succ)=>{
            return succ
        }).catch((err)=>{
            return err.response
        })

        return res
    }
  return {
    callBack
  }
}