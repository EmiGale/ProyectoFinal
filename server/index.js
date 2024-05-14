const { inicioSesion, registrarSSH, Registrarse } = require('./scripts/base-de-datos');
const { spawn } = require('child_process');
const express = require("express");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
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
    
});

app.post("/api/info", (req, res) => {
  console.log(req.body)
  const rutaScriptPython = 'server/scripts/info.py';
  const argumentos = [req.body.ip, req.body.username, req.body.password];

  const procesoPython = spawn('python', [rutaScriptPython, ...argumentos]);

  // Captura la salida estándar (stdout) del proceso
  procesoPython.stdout.on('data', (data) => {
      console.log(data.toString());
      const jsonData = JSON.parse(data.toString());
      res.json(jsonData);
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

app.post("/api/detectar-topologia", (req, res) => {
  const rutaScriptPython = 'server/scripts/descubrimiento-redes.py';

  const procesoPython = spawn('python', [rutaScriptPython]);

    // Captura la salida estándar (stdout) del proceso
    procesoPython.stdout.on('data', (data) => {
        console.log(`Resultado del script: ${data.toString()}`);
        const jsonData = JSON.parse(data.toString());
        res.json(jsonData);
    });

    // Captura los errores del proceso
    procesoPython.stderr.on('data', (data) => {
      console.error(`Error del script: ${data}`);
    });

    // Maneja el cierre del proceso
    procesoPython.on('close', (code) => {
      console.log(`Proceso de Python finalizado con código de salida ${code}`);
    });
  
});

app.post("/api/config/hostname", (req, res) => {
  const rutaScriptPython = 'server/scripts/aplicar-configuraciones.py';

  const argumentos = [req.body.tipo, req.body.ip, req.body.username, req.body.password, req.body.hostname];

  console.log(argumentos);
  const procesoPython = spawn('python', [rutaScriptPython, ...argumentos]);

    procesoPython.stdout.on('data', (data) => {
        console.log(`Resultado del script: ${data.toString()}`);
        const jsonData = JSON.parse(data.toString());
        res.json(jsonData);
    });
    procesoPython.stderr.on('data', (data) => {
      console.error(`Error del script: ${data}`);
    });
    procesoPython.on('close', (code) => {
      console.log(`Proceso de Python finalizado con código de salida ${code}`);
    });
  
});

app.post("/api/config/banner", (req, res) => {
  const rutaScriptPython = 'server/scripts/aplicar-configuraciones.py';

  const argumentos = [req.body.tipo, req.body.ip, req.body.username, req.body.password, req.body.banner];

  console.log(argumentos);
  const procesoPython = spawn('python', [rutaScriptPython, ...argumentos]);

    procesoPython.stdout.on('data', (data) => {
        console.log(`Resultado del script: ${data.toString()}`);
        const jsonData = JSON.parse(data.toString());
        res.json(jsonData);
    });
    procesoPython.stderr.on('data', (data) => {
      console.error(`Error del script: ${data}`);
    });
    procesoPython.on('close', (code) => {
      console.log(`Proceso de Python finalizado con código de salida ${code}`);
    });
  
});

app.post("/api/config/vtp", (req, res) => {
  const rutaScriptPython = 'server/scripts/aplicar-configuraciones.py';

  const argumentos = [req.body.tipo, req.body.ip, req.body.username, req.body.password, req.body.dominio, req.body.password,
    req.body.mode
  ];

  console.log(argumentos);
  const procesoPython = spawn('python', [rutaScriptPython, ...argumentos]);

    procesoPython.stdout.on('data', (data) => {
        console.log(`Resultado del script: ${data.toString()}`);
        const jsonData = JSON.parse(data.toString());
        res.json(jsonData);
    });
    procesoPython.stderr.on('data', (data) => {
      console.error(`Error del script: ${data}`);
    });
    procesoPython.on('close', (code) => {
      console.log(`Proceso de Python finalizado con código de salida ${code}`);
    });
  
});

app.post("/api/inicio-sesion", (req, res) => {
    let user = req.body.user
    inicioSesion(req.body).then(check => { //sirve para iniciar sesion con las cookies
        if (check == 1) {
            const token = jwt.sign({ user }, 'clave_secreta', { expiresIn: '1h' });
            res.json({ result: 1, token });
        }
        else
        res.json({ result: check });
      });
});

app.post("/api/registrar-ip", (req, res) => {
  console.log(req.body);
  registrarSSH(req.body);
});

app.post("/api/registrarte", (req, res) => {
  console.log(req.body);
  Registrarse(req.body);
  console.log("Se agrego");
});

app.post("/api/cerrar-sesion", (req, res) => {
    res.clearCookie('token');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});