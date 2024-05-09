from clase import *
import sys
import json

ip = sys.argv[1]
username = sys.argv[2]
password = sys.argv[3]

conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)

conexion.connect()

version = conexion.show_version()

print(json.dumps(version))
