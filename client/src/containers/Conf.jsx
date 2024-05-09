import React, {useState} from 'react';
import './css/Conf.css'

export function FormHostname() {

  return (
    <div>
        <form>
            <label htmlFor="Hostname">ingresa el Hostname</label>
            <input type="text" />
            <button>Enviar</button>
        </form>
    </div>
  );
}

export function FormBanner() {

    return (
      <div>
          <form>
              <label htmlFor="Banner">ingresa el mensaje del día</label>
              <input type="text" />
              <button>Enviar</button>
          </form>
      </div>
    );
  }


  export function FormIPinterfaz() {

    return (
      <div>
          <form>
            <label htmlFor="dirIp">Escoge la interfaz</label>
              <select>
                <option></option>
              </select>
              <label htmlFor="dirIp">Ingresa la dirección IP para asignar</label>
              <input type="text" />
              <label htmlFor="dirIp">Ingresa la máscara de la dirección</label>
              <input type="text" />
              <button>Enviar</button>
          </form>
      </div>
    );
  }

  export function FormDescripcionInterfaz() {

    return (
      <div>
          <form>
                <label htmlFor="descr">Escoge la interfaz</label>
                    <select>
                        <option></option>
                    </select>
                <label htmlFor="descr">Ingresa las descripción</label>
                <input type="text" />
                <button>Enviar</button>
          </form>
      </div>
    );
}

export function FormEtherChannel() {

    return (
      <div>
          <form>
                <label htmlFor="etherchannel">Escoge la primera interfaz</label>
                    <select>
                        <option></option>
                    </select>
                    <label htmlFor="etherchannel">Escoge la Segunda interfaz</label>
                    <select>
                        <option></option>
                    </select>
                <button>Enviar</button>
          </form>
      </div>
    );
}

  export function FormDHCPv4() {

    return (
      <div>
          <form>
              <label htmlFor="dhcp">ingresa las direcciones a excluir</label>
              <input type="text" />
              <label htmlFor="dhcp">ingresa el nombre del pool para dhcp</label>
              <input type="text" />
              <label htmlFor="dhcp">ingresa la red deseada</label>
              <input type="text" />
              <label htmlFor="dhcp">ingresa la dirección del default router</label>
              <input type="text" />
              <label htmlFor="dhcp">ingresa la dirección del dns server</label>
              <input type="text" />
              <button>Enviar</button>
          </form>
      </div>
    );
    
  }