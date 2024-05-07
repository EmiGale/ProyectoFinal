import React, {useContext} from 'react';
import Header from '../containers/Header';


function PruebaRed() {

    const DetectarRed = (event) => {
        event.preventDefault();
    
        fetch("http://localhost:3001/api/detectar-topologia", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error("Error al iniciar sesion:", error);
        });
    }

    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div>
                <button onClick={DetectarRed}>Enviar</button>
            </div>
        </div>
    );
}

export default PruebaRed;