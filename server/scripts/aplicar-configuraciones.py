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
elif tipo == 'vlan':
    vlan = sys.argv[5]
    name = sys.argv[6]
    try:
        conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)
        conexion.connect()

        version = conexion.configure__crear_vlan(vlan, name)

        print(json.dumps(version))
    except:
        print(json.dumps("Error al conectarse."))
elif tipo == 'default':
    ip2 = sys.argv[5]
    try:
        conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)
        conexion.connect()

        version = conexion.default_gate_sw(ip2)

        print(json.dumps(version))
    except:
        print(json.dumps("Error al conectarse."))
elif tipo == 'logging':
    ip2 = sys.argv[5]
    try:
        conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)
        conexion.connect()

        version = conexion.logging(ip2)

        print(json.dumps(version))
    except:
        print(json.dumps("Error al conectarse."))
elif tipo == 'ntp':
    ip2 = sys.argv[5]
    try:
        conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)
        conexion.connect()

        version = conexion.ntp(ip2)

        print(json.dumps(version))
    except:
        print(json.dumps("Error al conectarse."))
elif tipo == 'user':
    user = sys.argv[5]
    password2 = sys.argv[6]
    try:
        conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)
        conexion.connect()

        version = conexion.username(user, password2)

        print(json.dumps(version))
    except:
        print(json.dumps("Error al conectarse."))
elif tipo == 'route':
    ip2 = sys.argv[5]
    mask = sys.argv[6]
    salidaip = sys.argv[7]
    try:
        conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)
        conexion.connect()

        version = conexion.ip_route(ip2, mask, salidaip)

        print(json.dumps(version))
    except:
        print(json.dumps("Error al conectarse."))
elif tipo == 'ipint':
    interface = sys.argv[5]
    ip2 = sys.argv[6]
    mask = sys.argv[7]
    try:
        conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)
        conexion.connect()

        version = conexion.add_ip_int(interface, ip2, mask)

        print(json.dumps(version))
    except:
        print(json.dumps("Error al conectarse."))
elif tipo == 'shut':
    interface = sys.argv[5]
    try:
        conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)
        conexion.connect()

        version = conexion.shutdown(interface)

        print(json.dumps(version))
    except:
        print(json.dumps("Error al conectarse."))
elif tipo == 'noshut':
    interface = sys.argv[5]
    try:
        conexion = DeviceConfigurator(device_type='cisco_ios', host=ip, username=username, password=password, secret=password)
        conexion.connect()

        version = conexion.no_shutdown(interface)

        print(json.dumps(version))
    except:
        print(json.dumps("Error al conectarse."))