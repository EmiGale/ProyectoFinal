import React, { useEffect, useState, useRef } from 'react';
import go from 'gojs'; 
import router from '../img/router-svgrepo-com.svg';
import switchimg from '../img/switch-svgrepo-com.svg';
import nube from '../img/cloud-svgrepo-com.svg';
import Loading from '../containers/Loading';
import { FormHostname } from '../containers/Conf';
import InfoNodo from '../containers/info.jsx';
import '../styles/Visualizacion.css';

function Prueba() {
  const [loading, setLoading] = useState(true); 
  const [datosNodo, setDatosNodo] = useState(""); 
  const [showInfo, setShowInfo] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const myDiagramRef = useRef(null);

  const DetectarRed = () => {
    return fetch("http://localhost:3001/api/detectar-topologia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  function init(json) {
    const existingDiagram = go.Diagram.fromDiv(document.getElementById("myDiagramDiv"));
    if (existingDiagram) {
      existingDiagram.div = null;
    }

    const make = go.GraphObject.make;
    const diagram = make(go.Diagram, myDiagramRef.current);

    // Definir la plantilla para los nodos
    diagram.nodeTemplate =
      make(go.Node, "Vertical",
        { portId: "", fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides,
          click: function(e, node) {
            console.log("Node clicked:", node.data);
            setDatosNodo(node.data);
            setShowInfo(true);
          }
        },
        make(go.Picture,
          { maxSize: new go.Size(50, 50) },
          new go.Binding("source", "img")),
        make(go.TextBlock,
          { margin: new go.Margin(3, 0, 0, 0),
            maxSize: new go.Size(100, 30),
            isMultiline: false },
          new go.Binding("text", "foot")),
      );

    // Definir la plantilla para los enlaces
    diagram.linkTemplate =
      make(go.Link,
          make(go.Shape),
          make(go.TextBlock,
          { segmentIndex: 0, segmentOffset: new go.Point(NaN, NaN),
              segmentOrientation: go.Orientation.Upright },
              new go.Binding("text", "startInterface", function(interfaz) {
                  return InterfazAbreviada(interfaz); 
          })),
          make(go.TextBlock,
          { segmentIndex: -1, segmentOffset: new go.Point(NaN, NaN),
              segmentOrientation: go.Orientation.Upright },
              new go.Binding("text", "endInterface", function(interfaz) {
                  return InterfazAbreviada(interfaz);
          })),
    );

    let createdLinks = []; // Array para llevar un registro de los enlaces creados
    // Crear un layout Force-Directed
    var layout = make(go.ForceDirectedLayout);

    // Asignar el layout al diagrama
    diagram.layout = layout;
    // Agregar nodos al diagrama
    json.forEach(element => {
      try {
        var deviceInfo = element.info;
        var deviceId = element.device.host;
        var deviceLabel = deviceInfo[0][0];
        var deviceType = deviceInfo[0][1];
        var nodeData = {};
        if (deviceType === "switch")
          nodeData = { key: deviceId, foot: deviceLabel, img: switchimg };
        else {
          nodeData = { key: deviceId, foot: deviceLabel, img: router };
        }
      } catch (error) {
        nodeData = { key: deviceId, foot: "Internet", img: nube };
      }
      diagram.model.addNodeData(nodeData);
    });

    var sentConnections = new Set();
    // Agregar enlaces al diagrama
    json.forEach(element => {
      var fromDevice = element.device.host;
      var conexiones = element.connections;

      conexiones.forEach(conexion => {
        var localPort = conexion[0];
        var remotePort = conexion[1];
        var toDevice = conexion[2];
        var deviceIndex = -1; // Inicializamos el índice del dispositivo de destino

        var connectionString = `${fromDevice}-${localPort}-${toDevice}-${remotePort}`;

        if (!sentConnections.has(connectionString)) {
          // Si no ha sido enviada, agrégala al conjunto de conexiones enviadas
          sentConnections.add(connectionString);

          deviceIndex = -1; // Inicializamos el índice del dispositivo de destino

          // Iterar sobre los demás dispositivos
          json.forEach((otroElemento, index) => {
              // Ignorar el propio dispositivo
              if (index !== json.indexOf(element)) {
                  //otroElemento.ips.forEach(ip => {0
                  //    // Comparar la IP de la conexión con las IPs del otro dispositivo
                  //    if (ip[1] === toDevice) {
                  //        deviceIndex = index; // Si hay coincidencia, guardamos el índice del dispositivo
                  //    }
                  //});
              }
          });

          // Si se encontró un dispositivo coincidente y no existe un enlace en la dirección opuesta, crear la conexión gráfica
          if (deviceIndex !== -1) {
              var linkKey = fromDevice + "-" + json[deviceIndex].device.host;
              var reverseLinkKey = json[deviceIndex].device.host + "-" + fromDevice;

              // Verificar si el enlace en la dirección opuesta no ha sido creado
              if (!createdLinks.includes(reverseLinkKey)) {
                  createdLinks.push(linkKey); // Registrar el enlace creado
                  var linkData = {
                      from: fromDevice,
                      to: json[deviceIndex].device.host,
                      startInterface: localPort,
                      endInterface: remotePort
                  };

                  diagram.model.addLinkData(linkData);
              }
          }
        }
      });
    });
  }

  //const json = [{"device": {"device_type": "cisco_ios", "host": "192.168.1.1", "username": "gmedina", "password": "cisco", "port": 22, "secret": "cisco"}, "ips": [["GigabitEthernet0/0/0", "192.168.1.1"]], "connections": [["GigabitEthernet0/0/0", "GigabitEthernet1/0/11", "192.168.1.2"], ["GigabitEthernet0/0/0", "GigabitEthernet1/0/11", "192.168.1.2"]], "info": [["R1", "router", "X86_64_LINUX_IOSD-UNIVERSALK9-M", "17.6.6a"]]}, {"device": {"device_type": "cisco_ios", "host": "192.168.1.2", "username": "gmedina", "password": "cisco", "port": 22, "secret": "cisco"}, "ips": [["Vlan1", "192.168.1.2"]], "connections": [["GigabitEthernet1/0/11", "GigabitEthernet0/0/0", "192.168.1.1"]], "info": [["S1", "switch", "C1000-UNIVERSALK9-M", "15.2(7)E6"]]}];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const json = await DetectarRed();
        init(json);
      } catch (error) {
        // Manejar errores si es necesario
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function InterfazAbreviada(interfazCompleta) {
    const abreviaciones = {
        "GigabitEthernet": "Gi",
        "FastEthernet": "Fa",
        "Serial": "Se"
    };
  
    // Iterar sobre las claves del objeto
    for (let prefix in abreviaciones) {
        if (interfazCompleta.startsWith(prefix)) {
            return abreviaciones[prefix] + interfazCompleta.slice(prefix.length);
        }
    }
    return interfazCompleta;
  }
  
  // Luego, en la definición de la plantilla de enlaces, puedes usar esta función para obtener la versión abreviada de las interfaces:
  

  return (
    <div className='mainTopologia'>
      {loading && <Loading />}
      {!loading && (
        <div id="myDiagramDiv" style={{ border: 'solid 1px blue', width: '1000px', height: '700px', backgroundColor: 'white' }} ref={myDiagramRef}></div>
        
      )}
      {showInfo && <InfoNodo data={datosNodo}/>}
    </div>
    
  );
}

export default Prueba;