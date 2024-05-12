from clase import *
import sys
import json

ip = sys.argv[1]
username = sys.argv[2]
password = sys.argv[3]

try:
    conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)

    conexion.connect()

    version = conexion.show_ip_int_brief()

    print(json.dumps(version))
except:
    print(json.dumps("Error al conectarse."))
