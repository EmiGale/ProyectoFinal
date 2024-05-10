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
    
    def ver_IP(self):
        return self.ips
    
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
    

    ##Añadir ip a interfaz
    def add_ip_int(self,interface,ip,mask):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        command = 'interface {}\n'.format(interface)

        output = self.connection.send_config_set([command])

        command = 'ip add{}\n'.format(ip, mask)

        output = self.connection.send_config_set([command])

        return output

    def configure_dhcp(self, pool_name, excl_begin, excl_end, net, subnet_mask, default_router, dns_server):
        if not self.connection:
            raise ValueError("Connection not established. Please connect first.")
        
        command = 'ip dhcp excluded-address{}\n'.format(excl_begin, excl_end)
        output = self.connection.send_config_set(command)

        command = 'ip dhcp pool{}\n'.format(pool_name)
        output = self.connection.send_config_set(command)

        command = 'network{}\n'.format(net, subnet_mask)
        output = self.connection.send_config_set(command)

        command = 'default-router{}\n'.format(default_router)
        output = self.connection.send_config_set(command)

        command = 'dns-server{}\n'.format(dns_server)
        output = self.connection.send_config_set(command)

        return output


        
        


