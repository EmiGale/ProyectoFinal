from clase import *

def AgregarIP(dispositivo, ipUsadas):
    ipBrief = dispositivo.show_ip_int_brief()
    version = dispositivo.show_version()
    #print(ipBrief)
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
    #print(cdpResult)
    for disnuevo in cdpResult:
        if disnuevo['management_ip'] not in ipUsadas:
            dispositivo.agregar_Conexiones(disnuevo['local_port'], disnuevo['remote_port'], disnuevo['management_ip'])
            configurator.append(DeviceConfigurator(device_type='cisco_ios', host=disnuevo["management_ip"], username='gmedina', password='cisco', secret='cisco'))
            
    return ipUsadas

