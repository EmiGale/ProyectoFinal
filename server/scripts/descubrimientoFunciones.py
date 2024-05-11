from clase import *

def AgregarIP(dispositivo, ipUsadas):
    ipBrief = dispositivo.show_ip_int_brief()
    dispositivoIP = dispositivo.ver_IP()
    version = dispositivo.show_version()
    versionCom = dispositivo.show_version_complet()
    serial = version[0]['serial'][0]

    if (versionCom.find("Switch") != -1):
        tipo = "switch"
    else:
        tipo = "router"

    dispositivo.agregar_Info(version[0]['hostname'], tipo, version[0]['software_image'], version[0]['version'], serial)

    dispositivoIP = dispositivo.ver_IP()
    for ip in ipBrief:
        if ip['ip_address'] != "unassigned":
            if ip['ip_address'] not in dispositivoIP:
                dispositivo.agregar_IP(ip['interface'], ip['ip_address'])
            if ip['ip_address'] not in ipUsadas:
                ipUsadas.append(ip['ip_address'])
    return ipUsadas

def AgregarDispositivos(dispositivo, ipUsadas, configurator):
    cdpResult = dispositivo.show_cdp()
    for disnuevo in cdpResult:
        if disnuevo['management_ip'] not in ipUsadas:
            ipUsadas.append(disnuevo['management_ip'])
            configurator.append(DeviceConfigurator(device_type='cisco_ios', host=disnuevo["management_ip"], username='gmedina', password='cisco', secret='cisco'))

        dispositivo.agregar_Conexiones(disnuevo['local_port'], disnuevo['remote_port'], disnuevo['management_ip'])

    return ipUsadas

