import React, { useState, useContext, useEffect } from 'react';
import Header from '../containers/Header';
import '../styles/inicioSesion.css';

function Registro() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const mensajeError = document.getElementById('error');

  const Registrarse = (event) => {
    event.preventDefault();

    if (password == password2) {
      console.log(password);
      fetch("http://localhost:3001/api/registrarte", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: user, password: password, password2: password2})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.href = '/iniciar-sesion';
      })
      .catch(error => {
        console.error("Error al iniciar sesion:", error);
      });
     }
    else {
      mensajeError.style.display = 'block';
     }
    }
    

  return (
    <div>
      <Header></Header>
      <div className="mainLogin">
        <div className="inicioSesion">
          <form onSubmit={Registrarse} id="formInicioSesion">
            <h2><i className="fa-solid fa-user"></i> REGISTRO</h2>
            <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"/>
            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Repetir Contraseña"/>
            <p style={{display:'none'}} id="error"><i className="fa-solid fa-triangle-exclamation"></i> Los datos no coinciden</p>
            <button className='botonInicio'>Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registro;