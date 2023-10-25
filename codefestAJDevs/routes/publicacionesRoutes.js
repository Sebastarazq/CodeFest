// Importa las dependencias necesarias
import express from 'express';
import protegerRuta from '../middlewares/protegerRuta.js';
import { mostrarTodasLasPublicaciones } from '../controllers/publicacionesController.js';

// Crea un enrutador para gestionar las rutas de publicaciones
const router = express.Router();

// Ruta principal para mostrar todas las publicaciones (GET)
router.get('/',protegerRuta, mostrarTodasLasPublicaciones);

/* // Ruta para mostrar una publicación específica (GET)
router.get('/:id', mostrarUnaPublicacion);

// Ruta para crear una nueva publicación (POST)
router.post('/', crearPublicacion);

// Ruta para editar una publicación (PUT)
router.put('/:id', editarPublicacion);

// Ruta para eliminar una publicación (DELETE)
router.delete('/:id', eliminarPublicacion);
 */
// Otras rutas relacionadas con publicaciones
// Por ejemplo, rutas para comentarios, likes, etc.

export default router;
