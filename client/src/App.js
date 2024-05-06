import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './pages/AuthProvider';
import Index from './pages/Inicio';
import LoginPage from './pages/Login';
import Red from './pages/red';
import Diagram from './pages/Visualizacion';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/informacion" element={<LoginPage />} />
          <Route path="/red" element={<Red />} />
          <Route path="/iniciar-sesion" element={<LoginPage />} />
          <Route path="/prueba" element={<Diagram />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
