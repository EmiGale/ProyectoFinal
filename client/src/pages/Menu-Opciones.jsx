import React, { useState } from "react";
import '../styles/menuOpciones.css';

function ConfPage() {
  const [num1, setNumer1] = useState("");
  const [num2, setNumer2] = useState("");

  const notificationContainer = document.getElementById('notificationContainer');

  const MandaNombre = (event) => {
    event.preventDefault();
    console.log("Num1: ", num1)
    console.log("Num2: ", num2)

    fetch("/api/configuraciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ num1: num1, num2: num2 }) // Envía el nombre como un objeto JSON
    })
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta de la API:", data); // Maneja la respuesta de la API
      const notification = document.createElement('div');
      notification.classList.add('notification');
      
      // Agregar el mensaje de la notificación
      notification.textContent = "Respuesta de la API: " + JSON.stringify(data);
      
      // Agregar la notificación al contenedor
      notificationContainer.appendChild(notification);
      
      // Eliminar la notificación después de 3 segundos
      setTimeout(() => {
        notification.remove();
      }, 3000);
    })
    .catch(error => {
      console.error("Error al enviar el nombre a la API:", error); // Maneja errores
    });
  }

  const handleNum1 = (event) => {
    setNumer1(event.target.value);
  }

  const handleNum2 = (event) => {
    setNumer2(event.target.value);
  }

  return (
    <div className="App">
      <form onSubmit={MandaNombre}>
        <label>Numero 1 </label>
        <input type='number' value={num1} onChange={handleNum1}></input>
        <label>Numero 2 </label>
        <input type='number' value={num2} onChange={handleNum2}></input>
        <button>Enviar</button>
      </form>
      <div id="notificationContainer"></div>
    </div>
  );
}

export default ConfPage;
