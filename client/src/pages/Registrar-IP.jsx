import React, { useState, useContext, useEffect } from 'react';
import Header from '../containers/Header';
import { AuthContext } from './AuthProvider';
import '../styles/inicioSesion.css';

function RegistrarIP() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [ip, setIP] = useState("");

  const RegistrarIP = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/api/registrar-ip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usuario: user, password: password, ip: ip })
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = '/';
    })
    .catch(error => {
      console.error("Error al iniciar sesion:", error);
    });
  }

  return (
    <div>
      <Header></Header>
      <div className="mainLogin">
        <div className="inicioSesion">
          <form onSubmit={RegistrarIP} id="formInicioSesion">
            <h2><i className="fa-solid fa-user"></i> SSH</h2>
            <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"/>
            <input type="text" value={ip} onChange={(e) => setIP(e.target.value)} placeholder="IP"/>
            <button className='botonInicio'>Registrar IP</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrarIP;