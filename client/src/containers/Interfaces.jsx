import React, {useEffect, useState} from "react";
import './css/Interfaces.css'

function Interfaces({ data }) {
    const [cosas, setCosas] = useState([]);
    const [error, setError] = useState(null);
    
    const VerInterfaces = () => {
        return fetch("http://localhost:3001/api/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ip: data.key, username: data.username, password: data.password, info: data.info })
        })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
              const json = await VerInterfaces();
              if (json == "Error al conectarse.") {
                setCosas(null);
                setError(json);
              }
              else {
                setError(null);
                setCosas(json);
              }
            } catch (error) {
              // Manejar errores si es necesario
            }
          };
        fetchData();
    }, [data]);

    return (
        <div className="contenedorInterfaces">
            {error ? <p>{error}</p> :
                cosas.map((interfaceInfo, index) => (
                    <div key={index} className="interfaz">
                        <p>Interfaz: {interfaceInfo.interface}</p>
                        <p>Dirección IP: {interfaceInfo.ip_address}</p>
                        <p style={{ color: interfaceInfo.status === 'up' ? 'green' : 'red' }}>Estado: {interfaceInfo.status === 'up' ? 'Encendida' : 'Apagada'}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default Interfaces