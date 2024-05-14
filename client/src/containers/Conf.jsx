import React, {useState, useEffect} from 'react';
import MensajeExito from './MensajeResultado';
import './css/Conf.css'

export function FormHostname({data}) {
  const [hostname, setHostname] = useState("");
  const [mensajeResultado, setMensajeResultado] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    setHostname(event.target.elements.Hostname.value); 
  };

  useEffect(() => {
    fetchData();
  }, [hostname]);
  
  const fetchData = async () => {
    try {
      const res = await CambiarHostname();
    } catch (error) {
      // Manejar errores si es necesario
    } 
  };

  const CambiarHostname = () => {
    return fetch("http://localhost:3001/api/config/hostname", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tipo: 'hostname', ip: data.key, username: data.username, password: data.password, hostname: hostname })
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  return (
    <div className='divConfiguraciones'>
        <form onSubmit={handleSubmit}>
            <label htmlFor="Hostname">Ingresa el Hostname</label>
            <input type="text" name='Hostname'/>
            <button>Enviar</button>
            {mensajeResultado && <MensajeExito/>}
        </form>
    </div>
  );
}

export function FormBanner({data}) {
  const [mensajeResultado, setMensajeResultado] = useState(false);

  const handleSubmitBanner = (event) => {
    event.preventDefault(); 
    const banner = event.target.elements.Banner.value; 
    fetchData(banner)
  };

  
  const fetchData = async (banner) => {
    try {
      const res = await CambiarBanner(banner);
    } catch (error) {
      // Manejar errores si es necesario
    }
  };

  const CambiarBanner = (banner) => {
    return fetch("http://localhost:3001/api/config/banner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tipo: 'banner', ip: data.key, username: data.username, password: data.password, banner: banner })
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

    return (
      <div className='divConfiguraciones'>
          <form onSubmit={handleSubmitBanner}>
              <label htmlFor="Banner">Ingresa el mensaje del día</label>
              <input type="text" name='Banner'/>
              <button>Enviar</button>
              {mensajeResultado && <MensajeExito/>}
          </form>
      </div>
    );
}


export function FormIPinterfaz() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const interfaz = event.target.elements.Interfaz.value;
    const direccion = event.target.elements.dirIP.value; 
    const mascara = event.target.elements.mascara.value;  
    console.log("Interfaz:", interfaz);
    console.log("Dirección IP:", direccion);
    console.log("Máscara:", mascara);
  };

    return (
      <div className='divConfiguraciones'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Interfaz">Escoge la interfaz</label>
              <select name = 'Interfaz'>
                <option></option>
              </select>
              <label htmlFor="dirIp">Ingresa la dirección IP para asignar</label>
              <input type="text"name='dirIP'/>
              <label htmlFor="mascara">Ingresa la máscara de la dirección</label>
              <input type="text" name='mascara'/>
              <button>Enviar</button>
          </form>
      </div>
    );
}


export function FormDescripcionInterfaz() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const interfaz = event.target.elements.Interfaz.value;
    const descripcion = event.target.elements.descr.value;  
    console.log("Interfaz:", interfaz);
    console.log("Descripción:", descripcion);
  };

    return (
      <div className='divConfiguraciones'>
          <form onSubmit={handleSubmit}>
                <label htmlFor="Interfaz">Escoge la interfaz</label>
                    <select name = 'Interfaz'>
                        <option></option>
                    </select>
                <label htmlFor="descr">Ingresa las descripción</label>
                <input type="text" name = 'descr'/>
                <button>Enviar</button>
          </form>
      </div>
    );
}

export function FormEtherChannel() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const interfaz1 = event.target.elements.Interfaz1.value;
    const interfaz2 = event.target.elements.Interfaz2.value;
    console.log("Interfaz:", interfaz1);
    console.log("Interfaz:", interfaz2);
  };

    return (
      <div className='divConfiguraciones'>
          <form onSubmit={handleSubmit}>
                <label htmlFor="Interfaz1">Escoge la primera interfaz</label>
                    <select>
                        <option></option>
                    </select>
                    <label htmlFor="Interfaz2">Escoge la Segunda interfaz</label>
                    <select>
                        <option></option>
                    </select>
                <button>Enviar</button>
          </form>
      </div>
    );
}

export function FormDHCPv4() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const direccionesExcluidas = event.target.elements.excludeAddresses.value;
    const pool = event.target.elements.poolName.value;
    const network = event.target.elements.Network.value;
    const router = event.target.elements.defaultRouter.value;
    const dns = event.target.elements.dnsServer.value;
    console.log("Excluidos:", direccionesExcluidas);
    console.log("Pool:", pool);
    console.log("Red:", network);
    console.log("Router:", router);
    console.log("Servidor DNS:", dns);
  };

  return (
    <div className='divConfiguraciones'>
        <form onSubmit={handleSubmit}>
            <label htmlFor="excludeAddresses">Ingresa las direcciones a excluir</label>
            <input type="text" id="excludeAddresses" name="excludeAddresses" />

            <label htmlFor="poolName">Ingresa el nombre del pool para DHCP</label>
            <input type="text" id="poolName" name="poolName" />

            <label htmlFor="Network">Ingresa la red deseada</label>
            <input type="text" id="Network" name="Network" />

            <label htmlFor="defaultRouter">Ingresa la dirección del router predeterminado</label>
            <input type="text" id="defaultRouter" name="defaultRouter" />

            <label htmlFor="dnsServer">Ingresa la dirección del servidor DNS</label>
            <input type="text" id="dnsServer" name="dnsServer" />

            <button>Enviar</button>
        </form>
    </div>
  );
}

export function FormVTP({data}) {
  const [banner, setBanner] = useState("");
  const [mensajeResultado, setMensajeResultado] = useState(false);

  const handleSubmitBanner = (event) => {
    event.preventDefault(); 
    const dominio = event.target.elements.domain.value;
    const password = event.target.elements.pwd.value; 
    const mode = event.target.elements.mode.value; 
    fetchData(dominio, password, mode);
  };
  
  const fetchData = async (dominio, password, mode) => {
    try {
      const res = await CambiarBanner(dominio, password, mode);
    } catch (error) {
      // Manejar errores si es necesario
    }
  };

  const CambiarBanner = (dominio, password, mode) => {
    return fetch("http://localhost:3001/api/config/vtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tipo: 'vtp', ip: data.key, username: data.username, password: data.password, dominio: dominio
        , password: password, mode: mode
       })
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }
    return (
      <div className='divConfiguraciones'>
          <form onSubmit={handleSubmitBanner}>
                <label htmlFor="domain">Ingresa el dominio VTP</label>
                <input type="text" name = 'domain'/>
                <label htmlFor="pwd">Ingresa la contraseña VTP</label>
                <input type="password" name = 'pwd'/>
                <label htmlFor="mode">Ingresa el modo VTP</label>
                <select name="mode" id="mode">
                  <option value="Server">Server</option>
                  <option value="Client">Client</option>
                </select>
                <button>Enviar</button>
          </form>
      </div>
    );
}

export function FormVLANS() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const numero = event.target.elements.numero.value;
    const nombre = event.target.elements.nombre.value;  
    console.log("VLAN:", numero);
    console.log("Nombre:", nombre);
  };

    return (
      <div className='divConfiguraciones'>
          <form onSubmit={handleSubmit}>                
                <label htmlFor="numero">Ingresa el número de vlan</label>
                <input type="text" name = 'numero'/>
                <label htmlFor="nombre">Ingresa el nombre de la vlan</label>
                <input type="text" name = 'nombre'/>
                <button>Enviar</button>
          </form>
      </div>
    );
}

export function FormIPRoute() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const ip = event.target.elements.ip.value;
    const mask = event.target.elements.mask.value;
    const salidaip = event.target.elements.salidaip.value;
    const intsalida = event.target.elements.intsalida.value;
    
    let command = '';
    if (salidaip) {
      command = `ip route ${ip} ${mask} ${salidaip}\n`;
    } else if (intsalida) {
      command = `ip route ${ip} ${mask} ${intsalida}\n`;
    }
    
    console.log("IP:", ip);
    console.log("Máscara:", mask);
    console.log("Salida IP:", salidaip);
    console.log("Interfaz de salida:", intsalida);
    console.log("Comando:", command);
  };

  return (
    <div className='divConfiguraciones'>
      <form onSubmit={handleSubmit}>                
        <label htmlFor="ip">Ingresa la dirección IP</label>
        <input type="text" name="ip" placeholder="Ejemplo: 192.168.1.0"/>
        
        <label htmlFor="mask">Ingresa la máscara de subred</label>
        <input type="text" name="mask" placeholder="Ejemplo: 255.255.255.0"/>
        
        <label htmlFor="salidaip">Ingresa la dirección IP de salida</label>
        <input type="text" name="salidaip" placeholder="Ejemplo: 10.0.0.1"/>
        
        <label htmlFor="intsalida">Ingresa la interfaz de salida</label>
        <input type="text" name="intsalida" placeholder="Ejemplo: Serial0/1"/>
        
        <button>Enviar</button>
      </form>
    </div>
  );
}


export function FormNative() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const int = event.target.elements.interfaz.value;
    const nativa = event.target.elements.vlan.value;  
    console.log("VLAN:", nativa);
    console.log("Interfaz:", int);
  };

    return (
      <div className='divConfiguraciones'>
          <form onSubmit={handleSubmit}>                
                <label htmlFor="interfaz">Ingresa la interfaz troncal</label>
                <input type="text" name = 'interfaz'/>
                <label htmlFor="vlan">Ingresa el número de la VLAN nativa</label>
                <input type="text" name = 'vlan'/>
                <button>Enviar</button>
          </form>
      </div>
    );
}

export function FormAccessVlan() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const interfaz = event.target.elements.interfaz.value;
    const vlan = event.target.elements.vlan.value;  
    console.log("VLAN:", vlan);
    console.log("Interfaz:", interfaz);
  };

  return (
    <div className='divConfiguraciones'>
      <form onSubmit={handleSubmit}>                
        <label htmlFor="interfaz">Ingresa los puertos</label>
        <input type="text" name="interfaz" placeholder="Ejemplo: fa0/1-2"/>
        
        <label htmlFor="vlan">Ingresa el número de la VLAN que pertenece a los puertos</label>
        <input type="text" name="vlan" placeholder="Ejemplo: 10"/>
        
        <button>Enviar</button>
      </form>
    </div>
  );
}

export function FormPortSecurityMax() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const interfaz = event.target.elements.interfaz.value;
    const macMax = event.target.elements.macMax.value;  
    console.log("Interfaz:", interfaz);
    console.log("MAC Máximo:", macMax);
  };

  return (
    <div className='divConfiguraciones'>
      <form onSubmit={handleSubmit}>                
        <label htmlFor="interfaz">Ingresa la interfaz</label>
        <input type="text" name="interfaz" placeholder="Ejemplo: fa0/1-2"/>
        
        <label htmlFor="macMax">Ingresa el máximo de MAC</label>
        <input type="text" name="macMax" placeholder="Ejemplo: 1"/>
        
        <button>Enviar</button>
      </form>
    </div>
  );
}

export function FormPortSecurityType() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const interfaz = event.target.elements.interfaz.value;
    const macType = event.target.elements.macType.value;  
    console.log("Interfaz:", interfaz);
    console.log("Tipo de MAC:", macType);
  };

  return (
    <div className='divConfiguraciones'>
      <form onSubmit={handleSubmit}>                
        <label htmlFor="interfaz">Ingresa la interfaz</label>
        <input type="text" name="interfaz" placeholder="Ejemplo: fa0/1-2"/>
        
        <label htmlFor="macType">Ingresa el tipo de MAC</label>
        <input type="text" name="macType" placeholder="Ejemplo: sticky"/>
        
        <button>Enviar</button>
      </form>
    </div>
  );
}

export function FormPortSecurityViolation() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const interfaz = event.target.elements.interfaz.value;
    const violation = event.target.elements.violation.value;  
    console.log("Interfaz:", interfaz);
    console.log("Tipo de Violación:", violation);
  };

  return (
    <div className='divConfiguraciones'>
      <form onSubmit={handleSubmit}>                
        <label htmlFor="interfaz">Ingresa la interfaz</label>
        <input type="text" name="interfaz" placeholder="Ejemplo: fa0/1-2"/>
        
        <label htmlFor="violation">Ingresa el tipo de violación</label>
        <input type="text" name="violation" placeholder="Ejemplo: protect"/>
        
        <button>Enviar</button>
      </form>
    </div>
  );
}

export function FormRoutInterVlan() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const subint = event.target.elements.subint.value;
    const vlan = event.target.elements.vlan.value;
    const native = event.target.elements.native.checked;
    const ip = event.target.elements.ip.value;
    const mask = event.target.elements.mask.value;
    console.log("Subinterfaz:", subint);
    console.log("VLAN:", vlan);
    console.log("Nativo:", native);
    console.log("Dirección IP:", ip);
    console.log("Máscara de subred:", mask);
  };

  return (
    <div className='divConfiguraciones'>
      <form onSubmit={handleSubmit}>                
        <label htmlFor="subint">Ingresa la subinterfaz</label>
        <input type="text" name="subint" placeholder="Ejemplo: g0/0.40"/>
        
        <label htmlFor="vlan">Ingresa el número de VLAN</label>
        <input type="text" name="vlan" placeholder="Ejemplo: 10"/>
        
        <label htmlFor="native">¿Es VLAN nativa?</label>
        <input type="checkbox" name="native" />
        
        <label htmlFor="ip">Ingresa la dirección IP</label>
        <input type="text" name="ip" placeholder="Ejemplo: 192.168.1.1"/>
        
        <label htmlFor="mask">Ingresa la máscara de subred</label>
        <input type="text" name="mask" placeholder="Ejemplo: 255.255.255.0"/>
        
        <button>Enviar</button>
      </form>
    </div>
  );
}

export function FormDefaultGateway() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const ip = event.target.elements.ip.value;
    console.log("Dirección IP del gateway por defecto:", ip);
  };

  return (
    <div className='divConfiguraciones'>
      <form onSubmit={handleSubmit}>                
        <label htmlFor="ip">Ingresa la dirección IP del gateway por defecto</label>
        <input type="text" name="ip" placeholder="Ejemplo: 192.168.1.1"/>
        
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default {
  FormHostname,
  FormBanner,
  FormIPinterfaz,
  FormDescripcionInterfaz,
  FormEtherChannel,
  FormDHCPv4,
  FormVTP,
  FormVLANS,
  FormIPRoute,
  FormNative,
  FormAccessVlan,
  FormPortSecurityMax,
  FormPortSecurityType,
  FormPortSecurityViolation,
  FormRoutInterVlan,
  FormDefaultGateway
};