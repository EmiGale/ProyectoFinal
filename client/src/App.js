import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Index from './pages/Inicio';
import LoginPage from './pages/Login';

//import LoginPage from './pages/Login';
import ConfPage2 from './pages/Configuraciones';
//import RegisterPage from './pages/RegisterPage';
import ConfPage from './pages/Menu-Opciones'; // Importa la página de configuraciones

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Index />} />
          <Route path='iniciar-sesion' element={<LoginPage />} />
          <Route path='configuraciones' element={<ConfPage />} />
          <Route path='configuraciones2' element={<ConfPage2 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
