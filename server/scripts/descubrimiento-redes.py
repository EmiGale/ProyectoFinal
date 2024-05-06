from clase import *
import json
import requests 
from descubrimientoFunciones import *

configurator = []
configurator.append(DeviceConfigurator(device_type='cisco_ios', host='192.168.1.1', username='gmedina', password='cisco', secret='cisco'))

# Connect to the device
configurator[0].connect()

ipUsadas = []
host = []
# Configure the hostname
#output_hostname = configurator[0].configure_hostname('R2')

ipUsadas = AgregarIP(configurator[0], ipUsadas)

ipUsadas = AgregarDispositivos(configurator[0], ipUsadas, configurator)

configurator[0].disconnect()

for dispositivo in configurator:
    dispositivo.connect()
    checar = len(dispositivo.ver_IP())
    if checar == 0:
        ipUsadas = AgregarIP(dispositivo, ipUsadas)

    if dispositivo.device['host'] not in host:
        AgregarDispositivos(dispositivo, ipUsadas, configurator)
        print(dispositivo.device['host'])
        host.append(dispositivo.device['host'])
    dispositivo.disconnect()

print("-----------------------------------------------")

print(ipUsadas)
datosFinales = ""

for dispositivo in configurator:
    print(dispositivo)
    print(dispositivo.ver_Conexiones())
    #print(dispositivo.ver_Conexiones())

unique_configurations = []
unique_configurations_strings = set()

for config in configurator:
    config_str = json.dumps(config.to_dict(), sort_keys=True)
    if config_str not in unique_configurations_strings:
        unique_configurations_strings.add(config_str)
        unique_configurations.append(config)

# Serialize each object individually
serialized_configurators = [config.to_dict() for config in unique_configurations]

# Serialize the list to JSON
serialized_config = json.dumps(serialized_configurators)
print(serialized_config)
