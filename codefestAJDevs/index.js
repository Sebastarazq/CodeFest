import express, { json } from 'express';
import path from 'path';
import db from './config/db.js'; // Importa la conexión a la base de datos
import usuariosRoutes from './routes/usuariosRoutes.js';
//import publicacionesRoutes from './routes/publicacionesRoutes.js';
//import comentariosRoutes from './comentariosRoutes.js';
//import appRoutes from './appRoutes.js'; // Importa las rutas relacionadas con la aplicación


const app = express();

// Configuración de Pug como motor de plantillas
// Habilitar pug
app.set('view engine','pug') //usar pug
app.set('views','./views') // aca estaran los archivos


// Carpeta publica
app.use(express.static('public'))

// Ruta para la página de inicio
app.use('/',usuariosRoutes)


// Iniciar el servidor después de que la conexión a la base de datos se haya establecido
db.once('open', () => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor en ejecución en http://localhost:${port}`);
    });
  });
