from clase import *
import json
from descubrimientoFunciones import *

configurator = []
configurator.append(DeviceConfigurator(device_type='cisco_ios', host='192.168.1.1', username='gmedina', password='cisco', secret='cisco'))

# Connect to the device
configurator[0].connect()

serialUsadas = []
ipUsadas = []
disEliminar = []
serialUsadas = []
host = []

ipUsadas = AgregarIP(configurator[0], ipUsadas)

ipUsadas = AgregarDispositivos(configurator[0], ipUsadas, configurator)
configurator[0].disconnect()

for dispositivo in configurator:
    dispositivo.connect()
    serialDispositivo = dispositivo.ver_Info()

    checar = len(dispositivo.ver_IP())
    if checar == 0:
        ipUsadas = AgregarIP(dispositivo, ipUsadas)

    if serialDispositivo[0][4] in serialUsadas:
        dispositivo.disconnect()
        disEliminar.append(dispositivo)
    else:
        serialUsadas.append(serialDispositivo[0][4])
        if dispositivo.device['host'] not in host:
            AgregarDispositivos(dispositivo, ipUsadas, configurator)
            host.append(dispositivo.device['host'])

        dispositivo.disconnect()
    
for dispo in disEliminar:
    configurator.remove(dispo)

#for dispositivo in configurator:
#    print(dispositivo)

serialized_configurators = [config.to_dict() for config in configurator]
serialized_config = json.dumps(serialized_configurators)
print(serialized_config)

