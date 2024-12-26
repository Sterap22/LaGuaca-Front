import React, { useState } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Logo from '../assets/img/logo-2.png'
import { useForm } from '../hooks/useForm';
import { FormLogin } from '../Interface/login';
import LoginServices from '../services/login.services';
import Loader from '../components/organisms/Loader';

const LoginPage = () => {
  const { state, setState, onChange } = useForm(FormLogin);
  const { loginAUTH } = LoginServices();
  const [ stateLoader, getStateLoader ] = useState(false)

  const handleLogin = () => {
    getStateLoader(true)
    loginAUTH(state).then((succ)=>{
      if (succ?.status !== 200) {
        localStorage.clear();
        setState(FormLogin)
        getStateLoader(false)
        return
      }
      localStorage.setItem('Token-data',succ?.data.token);
      localStorage.setItem('UserID',succ?.data.user.id);
      window.location.href = '/home';
      getStateLoader(false)
    }).catch(()=>{
      localStorage.clear();
      setState(FormLogin)
    }).finally(()=>{
      getStateLoader(false)
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 flex justify-center items-center">
      {stateLoader&&<Loader />}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <div className="mb-8 text-center">
          <img src={Logo} alt="Logo" className="mx-auto w-24 h-24 mb-4" />
          <h1 className="text-3xl font-semibold text-gray-700">Iniciar Sesión</h1>
          <p className="text-gray-500">Accede a tu cuenta</p>
        </div>
        <form className="space-y-6">
          <div>
            <Input
              placeholder="Correo Electrónico"
              value={state.email}
              onChange={({target}) => onChange(target.value, 'email')}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              value={state.password}
              onChange={({target}) => onChange(target.value, 'password')}
              className="w-full"
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">¿No tienes una cuenta? <a href="#" className="text-blue-500 hover:underline">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
