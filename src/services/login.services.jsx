import { useAxios } from '../hooks/useAxios';
import { FormLogin } from '../Interface/login';

const LoginServices = () => {
    const { callBack } = useAxios();

  const loginAUTH  = async(state = FormLogin)=>{
     const res = await callBack('post', '/auth/login', state)
    return res
  }

  return {
    loginAUTH
  }
}

export default LoginServices