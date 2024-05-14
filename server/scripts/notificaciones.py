import requests
from email.message import EmailMessage
import smtplib

def sms():
        # Definir las credenciales de Twilio
    account_sid = 'AC66dd4d3779f4a31507607397deb2284d'
    auth_token = 'f341b620c62b1d418c9d16b089b6b91e'

    # Construir la URL del endpoint de Twilio para enviar mensajes SMS
    url = f'https://api.twilio.com/2010-04-01/Accounts/{account_sid}/Messages.json'

    To = input("Numero del destinatario: ")
    Mensaje = input("Mensaje: ")
    # Configurar los datos del mensaje SMS

    data = {
        'To': To,
        'From': '+12565884037',
        'Body': Mensaje
    }

    # Realizar la solicitud HTTP POST para enviar el mensaje SMS
    response = requests.post(url, data=data, auth=(account_sid, auth_token))

    # Imprimir la respuesta
    print(response.text)


def correo():
    remitente = "teconecto.red@outlook.com"
    password = "horgaremmgfbgqyh"
    destinatario = input("Correo del destinatario: ")
    mensaje = input("Mensaje: ")

    email = EmailMessage()
    email["From"] = remitente
    email["To"] = destinatario
    email["Subject"] = "Aviso Teconecto"
    email.set_content(mensaje)

    smtp = smtplib.SMTP("smtp.outlook.com", 25)
    smtp.starttls()
    smtp.login(remitente, password)
    smtp.sendmail(remitente,destinatario,email.as_string())

    smtp.quit()



sms()

correo()