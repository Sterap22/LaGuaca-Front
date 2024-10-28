import { useState } from 'react'

export const useForm = (formCustomer) => {
    const [state, setState] = useState(formCustomer);

    const onChange =(value,field)=>{
        setState({
            ...state,
            [field]: value
        })
    }
  return {
    state,
    setState,
    onChange
  }
}
