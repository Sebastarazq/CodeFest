// Importa el controlador y otras dependencias
import express from 'express';
import { mostrarFormularioIniciarSesion, registroUsuario, iniciarSesion } from '../controllers/usuariosController.js';

const router = express.Router();

// Ruta para mostrar el formulario de inicio de sesión (GET)
router.get('/iniciar-sesion', mostrarFormularioIniciarSesion);

// Ruta para el registro de un nuevo usuario (POST)
router.post('/registro', registroUsuario);

// Ruta para iniciar sesión (POST)
router.post('/iniciar-sesion', iniciarSesion);

// Otras rutas relacionadas con usuarios
// Por ejemplo, rutas para ver el perfil, actualizar información, etc.

export default router;
