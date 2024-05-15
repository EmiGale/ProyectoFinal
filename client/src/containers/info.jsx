import React, {useState, useEffect} from 'react';
import Interfaces from './Interfaces';
import MenuConfigs from './MenuConfigs';
import InfoDispositivo from './InfoDispositivo';
import Interfacev6 from './Interfacesv6';
import './css/Info.css'

export function InfoNodo({ data }) {
  const [showInfoDispositivo, setShowInfoDispositivo] = useState(false);
  const [showInterfaces, setShowInterfaces] = useState(false);
  const [showInterfacesv6, setShowInterfacesv6] = useState(false);
  const [showConfiguraciones, setShowConfiguraciones] = useState(false);
  const [showCerrar, setShowCerrar] = useState(false)

    function VerInfo() {
      setShowInterfaces(true);
      setShowConfiguraciones(false);
      setShowInfoDispositivo(false);
      setShowInterfacesv6(false);
      setShowCerrar(true);
    }

    function VerInfoDispositivo() {
      setShowInfoDispositivo(true);
      setShowInterfaces(false);
      setShowConfiguraciones(false);
      setShowInterfacesv6(false);
      setShowCerrar(true);
    }

    function VerInfoDispositivov6() {
      setShowInterfacesv6(true);
      setShowInfoDispositivo(false);
      setShowInterfaces(false);
      setShowConfiguraciones(false);
      setShowCerrar(true);
    }

    function VerConfiguraciones() {
      setShowConfiguraciones(true);
      setShowInterfaces(false);
      setShowInfoDispositivo(false);
      setShowInterfacesv6(false);
      setShowCerrar(false);
    }

    const handleCerrar = () => {
      setShowInfoDispositivo(false);
      setShowInterfaces(false);
      setShowConfiguraciones(false);
      setShowInterfacesv6(false);
      setShowCerrar(false);
  };

    return (
        <div className='containerInfo'>
            <div className='datos'>
                <h2>{data.foot}</h2>
                <label htmlFor="">Estado: Activo</label>
                <label htmlFor="">IP: {data.key}</label>
                {showInfoDispositivo && <InfoDispositivo data={data}/>}
                <button onClick={VerInfoDispositivo} className='btn'>INFORMACIÓN</button>
                <button onClick={VerInfo} className='btn'>INTERFACES</button>
                <button onClick={VerInfoDispositivov6} className='btn'>INTERFACES V6</button>
                <button className='btn' onClick={VerConfiguraciones}>CONFIGURACIONES</button>
                {showInterfaces && <Interfaces data={data}/>}
                {showInterfacesv6 && <Interfacev6 data={data}/>}
                {showConfiguraciones && <MenuConfigs data={data}/>}
                {showCerrar && <button onClick={handleCerrar} className='CerrarBtn'>Cerrar</button>}
            </div>
        </div>
    );
}

export default InfoNodo;