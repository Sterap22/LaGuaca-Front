import { BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import IndexRoot from './root/Index';
import { useEffect, useRef } from 'react';
import RefreshServices from './services/refresh.services';

function App() {
  const activityTimeout = useRef(null); // Para manejar el temporizador de inactividad
  const tokenRefreshInterval = useRef(null); // Para manejar el intervalo de refresco del token
  const { refresh } = RefreshServices(); // función para refrezcar token JWT

  const logout = () => {
    localStorage.clear();
    clearTimeout(activityTimeout.current);
    clearInterval(tokenRefreshInterval.current);
    window.location.reload();
  };

  const refreshSessionToken = () => {
    console.log('Llego el refresh');
    refresh();
  };

  const resetActivityTimeout = () => {
    // Reinicia el temporizador de inactividad
    clearTimeout(activityTimeout.current);
    activityTimeout.current = setTimeout(logout, 10 * 60 * 1000); // 15 minutos
  };

  useEffect(() => {0
    if (localStorage.getItem('Token-data')) {
      // Inicia el temporizador de inactividad
      activityTimeout.current = setTimeout(logout, 15 * 60 * 1000); // 15 minutos

      // Configura el intervalo para refrescar el token
      tokenRefreshInterval.current = setInterval(refreshSessionToken, 5 * 60 * 1000); // 10 minutos

      // Agrega eventos para detectar actividad
      const events = ["mousemove", "keydown", "mousedown", "touchstart"];
      events.forEach((event) => window.addEventListener(event, resetActivityTimeout));

      return () => {
        // Limpia los eventos y temporizadores al desmontar el componente
        clearTimeout(activityTimeout.current);
        clearInterval(tokenRefreshInterval.current);
        events.forEach((event) =>
          window.removeEventListener(event, resetActivityTimeout)
        );
      };
    }
  }, [localStorage.getItem('Token-data')]);


  return (
    <Router>
      <div className="App">
        {/* <Suspense fallback={<SkeletonLoader />}> */}
          <IndexRoot /> 
        {/* </Suspense> */}
      </div>
    </Router>
  )
}

export default App
