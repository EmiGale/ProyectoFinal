const sql = require('mssql');

//Conexion base de datos AZURE
const config = {
    user: 'Emiliano',
    password: 'Proyecto1',
    server: 'proyecto-redes.database.windows.net', 
    database: 'ProyectoRedes',
    options: {
      encrypt: true 
    }
};

// Función para conectar a la base de datos
async function connectToDatabase() {
  try {
    // Establecer la conexión
    const conexion = await sql.connect(config);
    console.log('Conexión establecida correctamente');
    
    // Retornar el objeto de la conexión
    return conexion;
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err; 
  }
}

// Función para cerrar la conexión a la base de datos
async function closeConnection(conexion) {
  try {
    // Cerrar la conexión
    await conexion.close();
    console.log('Conexión cerrada correctamente');
  } catch (err) {
    console.error('Error al cerrar la conexión:', err);
    throw err; 
  }
}

async function inicioSesion(data) {
  let conexion;

  try {
    conexion = await connectToDatabase();
    
    // Buscar el usuario
    const result = await conexion.request()
      .input('username', sql.VarChar, data.user)
      .input('password', sql.VarChar, data.password)
      .query('SELECT * FROM USUARIOS WHERE username = @username AND password = @password');
      
    // Cerrar la conexión
    await closeConnection(conexion);
    
    if (result.recordset.length != 0 ) {
      return(result.recordset[0].id);
    }
    else {
      return(0);
    }
  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
}

async function Registrarse(data) {
  let conexion;

  try {
    conexion = await connectToDatabase();
    
    // Buscar el usuario
    const result = await conexion.request()
      .input('username', sql.VarChar, data.user)
      .input('password', sql.VarChar, data.password)
      .query('INSERT INTO USUARIOS (username, password) VALUES (@username, @password)');
      
    // Cerrar la conexión
    await closeConnection(conexion);
  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
}

async function registrarSSH(data) {
  let conexion;

  try {
    conexion = await connectToDatabase();
    
    // Buscar el usuario
    const result = await conexion.request()
      .input('username', sql.VarChar, data.usuario)
      .input('password', sql.VarChar, data.password)
      .input('ip', sql.VarChar, data.ip)
      .query('INSERT INTO USUARIOS_SSH (username, password, IP) VALUES (@username, @password, @ip)');
      
    // Cerrar la conexión
    await closeConnection(conexion);

  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
}

module.exports = { 
  inicioSesion: inicioSesion,
  registrarSSH: registrarSSH,
  Registrarse: Registrarse
};