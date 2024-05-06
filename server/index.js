const { inicioSesion } = require('./scripts/base-de-datos');
const { spawn } = require('child_process');
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/'));
app.use(session({
  secret: 'Gf26V5Fr8ZmLjxr', // Cambia esto por una cadena segura y única
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());

app.post("/api/configuraciones", (req, res) => {
    const n1 = req.body.num1;
    const n2 = req.body.num2;
    console.log(req.body)

    const rutaScriptPython = 'server/scripts/suma.py';
    const argumentos = [n1, n2];

    // Ejecuta el script de Python como un proceso hijo
    const procesoPython = spawn('python', [rutaScriptPython, ...argumentos]);

    // Captura la salida estándar (stdout) del proceso
    procesoPython.stdout.on('data', (data) => {
        console.log(`Resultado del script: ${data.toString()}`);
        res.json({ message: `¡Hola, la suma es: ${data.toString()}` });
    });

    // Captura los errores del proceso
    procesoPython.stderr.on('data', (data) => {
    console.error(`Error del script: ${data.toString()}`);
    });

    // Maneja el cierre del proceso
    procesoPython.on('close', (code) => {
    console.log(`Proceso de Python finalizado con código de salida ${code}`);
    });
});

app.post("/api/inicio-sesion", (req, res) => {
    inicioSesion(req.body).then(check => { //sirve para iniciar sesion con las cookies
        if (check == 1) {
            req.session.usuario = { id: 1, nombre: req.body.user };
        }
        res.json({ result: check });
      });
});

app.get('/api/checar-sesion', (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json({ authenticated: true });
    } else {
      res.status(401).json({ authenticated: false });
    }
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});