import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Inicio';
import { AuthProvider } from './pages/AuthProvider';
import LoginPage from './pages/Login';

import ConfPage2 from './pages/Configuraciones';
import ConfPage from './pages/Menu-Opciones';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/iniciar-sesion" element={<LoginPage />} />
          <Route path="/configuraciones2" element={<ConfPage2 />} />
          <Route path="/configuraciones" element={<ConfPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
