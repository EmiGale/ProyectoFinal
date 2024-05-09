import React, {useState, useEffect} from 'react';
import './css/Info.css'

export function InfoNodo({ data }) {

    const VerInfo = () => {
        return fetch("http://localhost:3001/api/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ip: data.key, username: data.username, password: data.password })
        })
        .then(response => response.json())
        .then(data => {
          return data;
        })
        .catch(error => {
          console.error("Error:", error);
        });
      }

    //console.log(data)

    useEffect(() => {
        VerInfo();
        console.log(data);
    }, [data]);

    return (
        <div className='containerInfo'>
            <div className='datos'>
                <h2>{data.foot}</h2>
                <label htmlFor="">Estado: </label>
                <label htmlFor="">IP: {data.key}</label>
                <label htmlFor="">Tipo: </label>
                <label htmlFor="">Modelo: </label>
                <label htmlFor="">Software: </label>
                <button>Ver interfaces</button>
                <button>Configuraciones</button>
            </div>
        </div>
    );
}

export default InfoNodo;