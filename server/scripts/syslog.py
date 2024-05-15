import socket
import json
from email.message import EmailMessage
import smtplib

HOST = '192.168.10.11'
PORT = 514

def maill(mensaje):
    remitente = "teconecto.red@outlook.com"
    password = "horgaremmgfbgqyh"
    destinatario = 'JDiego220@hotmail.com'

    email = EmailMessage()
    email["From"] = remitente
    email["To"] = destinatario
    email["Subject"] = "Aviso Teconecto"
    email.set_content(mensaje)

    smtp = smtplib.SMTP("smtp.outlook.com", 25)
    smtp.starttls()
    smtp.login(remitente, password)
    smtp.sendmail(remitente, destinatario, email.as_string())
    smtp.quit()

def parse_syslog_message(data):
    mensaje = data.decode("utf-8")

    colon1_idx = mensaje.find(':') + 22  
    colon2_idx = mensaje.find(':', colon1_idx + 1) + 1

    part1 = mensaje[colon1_idx -20 :colon1_idx]
    part2 = mensaje[colon1_idx+2:colon2_idx-1]
    part3 = mensaje[colon2_idx+1:]

    if '0' in part2:
        part2 = 'Emergencia'
    elif '1' in part2:
        part2 = 'Alerta'
    elif '2' in part2:
        part2 = 'Critico'
    elif '3' in part2:
        part2 = 'Error'
    elif '4' in part2:
        part2 = 'Advertencia'
    elif '5' in part2:
        part2 = 'Notificacion'
    elif '6' in part2:
        part2 = 'Informativo'
    elif '7' in part2:
        part2 = 'Depuración'

    json_obj = {
    "Tiempo": part1,
    "Tipo": part2,
    "Descripcion": part3
    }

    return json_obj

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.bind((HOST, PORT))
    print(f"{HOST} Listening on port {PORT}")
    while True:
        data, addr = s.recvfrom(1024)
        json_obj = parse_syslog_message(data)
        json_string = json.dumps(json_obj)
        print(json_string)
        maill(json_string)