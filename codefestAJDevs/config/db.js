import mongoose from 'mongoose';

// Define la URI de la base de datos
const dbURI = 'mongodb://127.0.0.1/FacultadSistemasAppD'; // Reemplaza con la URI real de tu base de datos

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Manejo de errores de conexión
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

export default db;
