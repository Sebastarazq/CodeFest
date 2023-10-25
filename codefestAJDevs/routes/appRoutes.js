// Importa las dependencias necesarias
import express from 'express';
import { mostrarTodasLasPublicaciones } from '../controllers/publicacionesController.js';

// Crea un enrutador para gestionar las rutas de publicaciones
const router = express.Router();

// Ruta principal para mostrar todas las publicaciones (GET)
router.get('/', mostrarTodasLasPublicaciones);


// Otras rutas relacionadas con publicaciones
// Por ejemplo, rutas para comentarios, likes, etc.

export default router;
