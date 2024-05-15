from netmiko import ConnectHandler

class DeviceConfigurator:
    def __init__(self, device_type, host, username, password, port=22, secret=None):
        self.device = {
            'device_type': device_type,
            'host': host,
            'username': username,
            'password': password,
            'port': port,
            'secret': secret,
        }
        self.info = []
        self.conexiones = []
        self.ips = []
        self.connection = None

    def __str__(self):
        return f"device: {self.device}, ips: {self.ips}, connections: {self.conexiones}, info: {self.info}"
    
    def ver_Device(self):
        return self.device

    def ver_IP(self):
        return self.ips
    
    def ver_Info(self):
        return self.info
    
    def agregar_IP(self, interface, ip):
        self.ips.append([interface, ip])

    def agregar_Info(self, hostname, tipo, software, version, serial):
        self.info.append([hostname, tipo, software, version, serial])

    def agregar_Conexiones(self, interface_remote, interface_local, ip_remote):
        self.conexiones.append([interface_remote, interface_local, ip_remote])

    def ver_Conexiones(self):
        return self.conexiones
    
    def to_dict(self):
        return {
            "device": self.device,
            "ips": self.ips,
            "connections": self.conexiones,
            "info": self.info,
        }

    def connect(self):
        self.connection = ConnectHandler(**self.device)

    def disconnect(self):
        if self.connection:
            self.connection.disconnect()

    def configure_hostname(self, hostname):
        if not self.connection:
            raise ValueError("Connection not established. Please connect firnew_hostname")
        
        config_commands = [f'hostname {hostname}']
        output = self.connection.send_config_set(config_commands)
        return output
    
    def banner(self, banner):
        if not self.connection:
            raise ValueError("Connection not established. Please connect firnew_hostname")
        
        config_commands = [f'banner motd #{banner}#']
        output = self.connection.send_config_set(config_commands)
        return output

    def configure_interface_description(self, interface, description):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        command = 'interface {}\n'.format(interface)

        output = self.connection.send_config_set([command])

        command = 'description {}\n'.format(description)
        
        output = self.connection.send_config_set([command])
        return output

    def show_cdp(self):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")

        output = self.connection.send_command("show cdp neighbors detail", use_textfsm=True)

        return output
    
    def show_version(self):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        output = self.connection.send_command("show version", use_textfsm=True)
        return output
    
    def show_version_complet(self):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        output = self.connection.send_command("show version")
        return output
    
    def show_rendimiento(self):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        output = self.connection.send_command("show processes cpu history", use_textfsm=True)
        return output
    
    def show_ip_int_brief(self):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        output = self.connection.send_command("show ip interface brief", use_textfsm=True)
        return output
    
    def show_ip_int_brief_v6(self):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        output = self.connection.send_command("show ipv6 interface brief", use_textfsm=True)
        return output
    

    ##Añadir ip a interfaz
    def add_ip_int(self,interface,ip,mask):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        commands = [
            f'interface {interface}',
            f'ip add {ip} {mask}',
            f'no shutdown'
        ]

        output = []
        output.append(self.connection.send_config_set(commands))

        return output


    def configure_dhcp(self, pool_name, excl_begin, excl_end, net, subnet_mask, default_router, dns_server):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")

        commands = [
            'ip dhcp excluded-address {} {}\n'.format(excl_begin, excl_end),
            'ip dhcp pool {}\n'.format(pool_name),
            'network {} {}\n'.format(net, subnet_mask),
            'default-router {}\n'.format(default_router),
            'dns-server {}\n'.format(dns_server)
        ]

        output = ""
        
        output += self.connection.send_config_set(commands)

        return output
    
    
    def configure_vtp(self, domain, mode, password):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")

        commands = [
            'vtp mode {} \n'.format(mode),
            'vtp domain {} \n'.format(domain),
            'vtp password {} \n'.format(password),
        ]
        output = ""
        output += self.connection.send_config_set(commands)

        return output
    
    def configure__crear_vlan(self, nvlan, name):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")

        commands = [
            f'vlan {nvlan}',
            f'name {name}',
        ]

        output = []
        output.append(self.connection.send_config_set(commands))

        return output



    def no_ip_domain(self):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        commands = [
                'no ip domain-lookup'
            ]

        output = ""
        for command in commands:
                output += self.connection.send_config_set(command)

        return output
    
    def ntp(self, ip):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        commands = 'ntp server {} \n'.format(ip)

        output = self.connection.send_config_set(commands)

        return output
    
    def username(self, user, password):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        commands = 'username {} privilege 15 secret {} \n'.format(user, password)

        output = self.connection.send_config_set(commands)

        return output
    
    def ip_route(self, ip, mask, salidaip):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        command = 'ip route {} {} {}\n'.format(ip, mask, salidaip)
        output = self.connection.send_config_set(command)

        return output

    def nat_dynamic(self, nat_pool, inicio_nat, fin_nat, netmask, numaccs, condiciones, interfaces):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        commands = [  'ip nat pool {} {} {} netmask {} \n'.format(nat_pool, inicio_nat, fin_nat, netmask)]
       
        for condicion in condiciones:
            if "permit" == condicion[0]:
                ipacc, maskacc = condicion[1], condicion[2]
                commands.append('access-list {} permit {} {}\n'.format(numaccs, ipacc, maskacc))
            else:
                ipacc, maskacc = condicion[1], condicion[2]
                commands.append('access-list {} deny {} {}\n'.format(numaccs, ipacc, maskacc))

        commands.append('ip nat inside source list {} pool {} \n'.format(numaccs, nat_pool))

        for interfaz in interfaces:
            if "inside" in interfaz[0]:
                interfazz = interfaz[1]
                commands.append('int {} \n'.format(interfazz))
                commands.append('ip nat inside')
            else:
                interfazz = interfaz[1]
                commands.append('int {} \n'.format(interfazz))
                commands.append('ip nat outside')

        commands_str = ''.join(commands)
    
        output = self.connection.send_config_set(commands_str)

        return output
    
    def native_vlan(self, int, vlan):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        commands = ['int {} \n'.format(int),
                    'sw mode trunk',
                    'sw trunk native vlan {} \n'.format(vlan)]
        output = self.connection.send_config_set(commands)

        return output  
    
    def logging(self, ip):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        commands = ['logging {} \n'.format(ip),
                    'loggin trap 4',]

        output = self.connection.send_config_set(commands)

        return output
      
    def access_vlan(self, int, vlans): ##aqui de preferencia recibir fa0/1-2 si es rango, para no ir de interfaz en interfaz
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        if "range" in int:
            commands = ['int range {} \n'.format(int),
                        'sw mode access \n',
                        'sw access vlan {} \n'.format(vlans)]
        else:
            commands = ['int {} \n'.format(int),
                        'sw mode access \n',
                        'sw access vlan {} \n'.format(vlans)]
        output = self.connection.send_config_set(commands)
        return output

    def port_security_max(self, int, mac_max):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        #Interfaz
        if "range" in int:
            commands = ['int range {} \n'.format(int),
                        'sw port-security \n',
                        'sw port-security maximum {} \n'.format(mac_max)]
        #O Rango de interfacez
        else:
            commands = ['int range {} \n'.format(int),
                        'sw port-security \n',
                        'sw port-security maximum {} \n'.format(mac_max)]
        output = self.connection.send_config_set(commands)
        return output
        
    def port_security_type(self, int, mac_type):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        #Interfaz
        if "range" in int:
            commands = ['int range {} \n'.format(int),
                        'sw port-security \n',
                        'sw port-security mac-add {} \n'.format(mac_type)]
        #O Rango de interfacez
        else:
            commands = ['int range {} \n'.format(int),
                        'sw port-security \n',
                        'sw port-security mac-add {} \n'.format(mac_type)]
        output = self.connection.send_config_set(commands)
        return output
    
    def port_security_type(self, int, violation):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        #Interfaz
        if "range" in int:
            commands = ['int range {} \n'.format(int),
                        'sw port-security \n',
                        'sw port-security violation {} \n'.format(violation)]
        #O Rango de interfacez
        else:
            commands = ['int range {} \n'.format(int),
                        'sw port-security \n',
                        'sw port-security violation {} \n'.format(violation)]
        output = self.connection.send_config_set(commands)
        return output

        
    def rout_inter_vlan(self, subint, vlan, native, ip, mask): ##manden subinterfaz ej. g0/0.40
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        if native == True:
            commands = ['int {} \n'.format(subint),
                        'Encapsulation dot1q {} native'.format(vlan),
                        'ip add {} {} \n'.format(ip, mask)]
        else:
            commands = ['int {} \n'.format(subint),
                        'Encapsulation dot1q {} \n'.format(vlan),
                        'ip add {} {} \n'.format(ip, mask)]
            
        output = self.connection.send_config_set(commands)

        return output
    
    def default_gate_sw(self,ip):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        commands = 'ip default-gateway {} \n'.format(ip)

        output = self.connection.send_config_set(commands)

        return output
    
    def shutdown(self, interface):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        commands = [
            f'interface {interface}',
            f'shutdown'
        ]

        output = []
        output.append(self.connection.send_config_set(commands))

        return output
    
    def no_shutdown(self, int):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        commands = [
            f'interface {int}',
            f'no shutdown'
        ]

        output = []
        output.append(self.connection.send_config_set(commands))

        return output


        

    def copy_running_config_startup_config(self):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        commands = 'do copy running-config startup-config \n'
        
        output = self.connection.send_config_set(commands)
        
        return output
