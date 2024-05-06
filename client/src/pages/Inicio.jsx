import React, {useContext} from 'react';
import InicioRedes from '../img/InicioRedes.jpg';
import '../styles/index.css';
import '../styles/RegisterPage.css';
import Header from '../containers/Header';
import { AuthContext } from './AuthProvider';

function Index() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div className="main">
                <div id="linea-centro"></div>
                <div className="imagen">
                <img src={InicioRedes} alt="InicioRedes" id="inicioRedes"/>
                </div>
                <div className="containerInformacion">
                <div className="informacion">
                    <h2>Descubrimiento, Administración y Monitoreo de Redes</h2>
                    <p>
                    Todo eso y más ofrece la aplicación "Te Conecto", a solo el alcance de unos clicks,
                    puedes visualizar y configurar tu red en cualquier lugar y momento, gracias a nuestro sistema 
                    capaz de detectar topologias de red de forma automatica.
                    </p>
                    {isLoggedIn ? ("") : (<a href="registrarte">Registrarse</a>)}
                </div>
                </div>
            </div>
        </div>
    );
}

export default Index;