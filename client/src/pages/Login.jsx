import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Header from '../containers/Header';
import { AuthContext } from './AuthProvider';
import '../styles/inicioSesion.css';

function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const mensajeError = document.getElementById('error');
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      // Si el usuario ya está autenticado, redirigir a la página principal
      window.location.href = '/';
    }
  }, [isLoggedIn]);

  const IniciarSesion = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/api/inicio-sesion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: user, password: password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 1) {
        Cookies.set('token', data.token);
        window.location.href = '/';
      }
      else {
        mensajeError.style.display = 'block';
      }
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
          <form onSubmit={IniciarSesion} id="formInicioSesion">
            <h2><i className="fa-solid fa-user"></i> LOGIN</h2>
            <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"/>
            <p style={{display:'none'}} id="error"><i className="fa-solid fa-triangle-exclamation"></i> Datos Incorrectos</p>
            <button>Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;