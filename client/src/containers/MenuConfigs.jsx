import React, { useState } from "react";
import Formularios from './Conf';
import './css/MenuConfigs.css';

export function MenuConfigs({ data }) {
    const [selectedOption, setSelectedOption] = useState("");
    const [showHostName, setShowHostName] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [showVTP, setShowVtp] = useState(false);

    const enviarConfiguraciones = (event) => {
        event.preventDefault(); 
        console.log("Formulario enviado con opción seleccionada:", selectedOption);
        console.log(data);

        switch (selectedOption) {
            case "1":
                setShowHostName(true);
                break;
            case "2":
                setShowBanner(true);
                break;
            case "3":
                setShowVtp(true);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={enviarConfiguraciones}>
                    <select className="MenuConfiguraciones" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value='0'>Selecciona la configuracion</option>
                        <option value='1'>Hostname</option>
                        <option value='2'>Banner</option>
                        <option value='3'>VTP</option>
                        <option value='4'>Hostname</option>
                        <option value='5'>Hostname</option>
                    </select>
                    <button type="submit" className="CerrarBtn">Escoger</button>
                </form>
                {showHostName && <Formularios.FormHostname data={data}/>}
                {showBanner && <Formularios.FormBanner data={data}/>}
                {showVTP && <Formularios.FormVTP data={data}/>}
            </div>
        </div>
    );
}

export default MenuConfigs