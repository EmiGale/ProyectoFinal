import React from 'react';
import './css/Header.css';

function Header() {
    return (
        <header>
            <div id="encabezado">
            <div className="logo">
                <h1>TECOnecto</h1>
            </div>
            <div className="menu">
                <a href="/">INICIO</a>
                <a href="informacion">INFORMACIÓN</a>
                <a href="iniciar-sesion">INICIAR SESIÓN</a>
            </div>
            </div>
        </header>
    );
}

export default Header;