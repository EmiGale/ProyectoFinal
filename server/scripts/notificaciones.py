import requests
from email.message import EmailMessage
import smtplib


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



correo()