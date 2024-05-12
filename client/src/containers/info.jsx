import React, {useState, useEffect} from 'react';
import Interfaces from './Interfaces';
import './css/Info.css'

export function InfoNodo({ data }) {

  const [showInterfaces, setShowInterfaces] = useState(false)

    function VerInfo() {
      setShowInterfaces(true)
    }

    const handleCerrar = () => {
      setShowInterfaces(false);
  };

    return (
        <div className='containerInfo'>
            <div className='datos'>
                <h2>{data.foot}</h2>
                <label htmlFor="">Estado: Activo</label>
                <label htmlFor="">IP: {data.key}</label>
                <label htmlFor="">Modelo: {data.info[2]}</label>
                <label htmlFor="">Software: {data.info[3]}</label>
                <label htmlFor="">Serial: {data.info[4]}</label>
                <button onClick={VerInfo} className='btn'>INTERFACES</button>
                <button className='btn'>CONFIGURACIONES</button>
                {showInterfaces && <Interfaces data={data}/>}
                {showInterfaces && <button onClick={handleCerrar} className='CerrarBtn'>Cerrar</button>}
            </div>
        </div>
    );
}

export default InfoNodo;