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

export function FormVTP() {

    return (
      <div>
          <form>
                <label htmlFor="VTP">Escoje si es servidor o cliente</label>
                    <select>
                        <option>
                            Server
                        </option>
                        <option>
                            Client
                        </option>
                    </select>
                    <label htmlFor="VTP">Ingresa el dominio vtp</label>
                    <input type="text" />
                    <label htmlFor="VTP">Ingresa el password vtp</label>
                    <input type="text" />
                <button>Enviar</button>
          </form>
      </div>
    );
}

export function FormVlan() {

    return (
      <div>
          <form>
                <label htmlFor="Vlan">Ingresa el número de vlan</label>
                <input type="number" min="1" max="1005"/>
                <label htmlFor="Vlan">Ingresa el nombre designado a la VLAN</label>
                <input type="text" />
                <label htmlFor="Vlan">Ingresa la ip</label>
                <input type="text" />
                <label htmlFor="Vlan">Ingresa la máscara</label>
                <input type="text" />
                <button>Enviar</button>
          </form>
      </div>
    );
}

export function FormIPRoute() {

    return (
      <div>
          <form>
                <label htmlFor="IPRoute">Ingresa la red</label>
                <input type="text" />
                <label htmlFor="IPRoute">Ingresa la máscara</label>
                <input type="text" />
                <label htmlFor="IPRoute">Ingresa la ip de siguiente salto</label>
                <input type="text" />
                <label htmlFor="etherchannel">O escoge la interfaz</label>
                    <select>
                        <option></option>
                    </select>
                <button>Enviar</button>
          </form>
      </div>
    );
}

/*
export function FormNATDynamic() {

    return (
      <div>
          <form>
                <label htmlFor="IPRoute">Ingresa el nombre de la pool</label>
                <input type="text" />
                <label htmlFor="IPRoute">Ingresa la primera IP del rango</label>
                <input type="text" />
                <label htmlFor="IPRoute">Ingresa la última IP del rango</label>
                <input type="text" />
                <label htmlFor="IPRoute">Ingresa la netmask</label>
                <input type="text"/>
                <label htmlFor="IPRoute"></label>
                <input type="text"/>
                <button>Enviar</button>
          </form>
      </div>
    );
}
*/