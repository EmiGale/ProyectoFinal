import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './pages/AuthProvider';
import Index from './pages/Inicio';
import LoginPage from './pages/Login';
import Red from './pages/red';
import Prueba from './pages/prueba-redes';
import RegistrarIP from './pages/Registrar-IP';
import Registro from './pages/Registrar-Usuario';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/informacion" element={<LoginPage />} />
          <Route path="/red" element={<Red />} />
          <Route path="/iniciar-sesion" element={<LoginPage />} />
          <Route path="/registrar-ip" element={<RegistrarIP />} />
          <Route path="/registrarte" element={<Registro />} />
          <Route path="/prueba" element={<Prueba />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
