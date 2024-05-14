from clase import *
import sys
import json

tipo = sys.argv[1]
ip = sys.argv[2]
username = sys.argv[3]
password = sys.argv[4]


if tipo == 'hostname':
    hostname = sys.argv[5]
    try:
        conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)
        conexion.connect()

        version = conexion.configure_hostname(hostname)

        print(json.dumps(version))
    except:
        print(json.dumps("Error al conectarse."))
elif tipo == 'banner':
    banner = sys.argv[5]
    try:
        conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)
        conexion.connect()

        version = conexion.banner(banner)

        print(json.dumps(version))
    except:
        print(json.dumps("Error al conectarse."))
elif tipo == 'vtp':
    dominio = sys.argv[5]
    password2 = sys.argv[6]
    mode = sys.argv[7]
    try:
        conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)
        conexion.connect()

        version = conexion.configure_vtp(dominio, mode, password2)

        print(json.dumps(version))
    except:
        print(json.dumps("Error al conectarse."))
