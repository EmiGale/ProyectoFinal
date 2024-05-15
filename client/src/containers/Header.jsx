import React, {useContext} from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from '../pages/AuthProvider';
import './css/Header.css';

function Header() {
    const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

    const CerrarSesion = (event) => {
        event.preventDefault();

        Cookies.remove('token');
        setLoggedIn(false);

        fetch("/api/cerrar-sesion", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
          })
          .then(response => response.json())
          .catch(error => {
            console.error("Error al cerrar sesion");
        });
    };

    return (
        <header>
            <div id="encabezado">
            <div className="logo">
                <h1>TECOnecto</h1>
            </div>
            <div className="menu">
                <a href="/">INICIO</a>
                {isLoggedIn ? (<a href="red" >RED</a>) : ""}
                {isLoggedIn ? (<a href="/" onClick={CerrarSesion}>CERRAR SESIÓN</a>) : (<a href="iniciar-sesion">INICIAR SESIÓN</a>)}
            </div>
            </div>
        </header>
    );
}

export default Header;