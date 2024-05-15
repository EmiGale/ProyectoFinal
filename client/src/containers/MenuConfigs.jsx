import React, { useState } from "react";
import Formularios from './Conf';
import './css/MenuConfigs.css';

export function MenuConfigs({ data }) {
    const [selectedOption, setSelectedOption] = useState("");
    const [showHostName, setShowHostName] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [showVTP, setShowVtp] = useState(false);
    const [showVLAN, setShowVlan] = useState(false);
    const [showDefault, setShowDefault] = useState(false);
    const [showLogging, setShowLogging] = useState(false);
    const [showNtp, setShowNtp] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showRuta, setShowRuta] = useState(false);
    const [showINTIP, setShowINTIP] = useState(false);
    const [showSHUT, setShowSHUT] = useState(false);
    const [showNOSHUT, setShowNOSHUT] = useState(false);


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
            case "4":
                setShowVlan(true);
                break;
            case "5":
                setShowDefault(true);
                break;
            case "6":
                setShowLogging(true);
                break;
            case "7":
                setShowNtp(true);
                break;
            case "8":
                setShowUser(true);
                break;
            case "9":
                setShowRuta(true);
                break;
            case "10":
                setShowINTIP(true);
                break;
            case "11":
                setShowSHUT(true);
                break;
            case "12":
                setShowNOSHUT(true);
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
                        <option value='4'>Vlan</option>
                        <option value='5'>Default</option>
                        <option value='6'>Logging</option>
                        <option value='7'>Ntp</option>
                        <option value='8'>Usuario</option>
                        <option value='9'>Ruta</option>
                        <option value='10'>Ip a interfaz</option>
                        <option value='11'>Shutdown</option>
                        <option value='12'>No Shutdown</option>
                    </select>
                    <button type="submit" className="CerrarBtn">Escoger</button>
                </form>
                {showHostName && <Formularios.FormHostname data={data}/>}
                {showBanner && <Formularios.FormBanner data={data}/>}
                {showVTP && <Formularios.FormVTP data={data}/>}
                {showVLAN && <Formularios.FormVLANS data={data}/>}
                {showDefault && <Formularios.FormDefaultGateway data={data}/>}
                {showLogging && <Formularios.Formlogging data={data}/>}
                {showNtp && <Formularios.Formntp data={data}/>}
                {showUser && <Formularios.Formuser data={data}/>}
                {showRuta && <Formularios.FormIPRoute data={data}/>}
                {showINTIP && <Formularios.FormINTIP data={data}/>}
                {showSHUT && <Formularios.FormSHUT data={data}/>}
                {showNOSHUT && <Formularios.FormNOSHUT data={data}/>}
            </div>
        </div>
    );
}

export default MenuConfigs