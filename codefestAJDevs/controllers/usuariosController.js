// Importa el modelo de usuario
import Usuario from '../models/Usuario.js';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Función para mostrar el formulario de registro
const mostrarFormularioRegistro = (req, res) => {
    // Aquí puedes renderizar el formulario de registro
    res.render('usuario/formulario-registro', { title: 'Registrarse' });
  };

  
// Función para registrar un nuevo usuario con reglas de validación incluidas
const registroUsuario = async (req, res) => {
    // Validación
    await check('nombre', 'El nombre no debe contener números').matches(/^[A-Za-z]+/).run(req);
    await check('apellido', 'El apellido no debe contener números').matches(/^[A-Za-z]+/).run(req);
    await check('email', 'Correo electrónico no válido').isEmail().run(req);
    await check('contrasena', 'La contraseña debe contener al menos una letra mayúscula, un número y un símbolo, y tener al menos 8 caracteres de longitud').matches(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Hubo errores de validación, muestra el formulario nuevamente con errores
        return res.render('usuario/formulario-registro', {
            title: 'Regístrate',
            errors: errors.array(),
            usuario: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
            },
        });
    }

    const { nombre, apellido, email, contrasena } = req.body;

    try {
        // Verifica si el correo electrónico ya está en uso
        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.render('usuario/formulario-registro', {
                title: 'Regístrate',
                error: 'El correo electrónico ya está en uso.',
            });
        }

        // Crea un nuevo usuario en la base de datos
        const nuevoUsuario = new Usuario({ nombre, apellido, email, contrasena });
        await nuevoUsuario.save();

        // Redirige a la página de inicio de sesión o muestra un mensaje de éxito
        res.redirect('/iniciar-sesion');
    } catch (error) {
        // Maneja errores, por ejemplo, muestra un mensaje de error o redirige a una página de error
        console.error(error);
        res.status(500).send('Error al registrar el usuario');
    }
};
  
  
// Función para iniciar sesión
const iniciarSesion = async (req, res) => {
    try {
      const { email, contrasena } = req.body;
      console.log(req.body)
  
      // Validación
      await check('email', 'Correo electrónico no válido').isEmail().run(req);
  
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        // Hubo errores de validación, muestra el formulario nuevamente con errores
        return res.render('usuario/formulario-iniciar-sesion', {
          title: 'Iniciar Sesión',
          errors: errors.array(),
        });
      }
  
      // Realiza la autenticación, verifica el email
      const usuario = await Usuario.findOne({ email });
  
      if (!usuario) {
        // El usuario no existe
        return res.render('usuario/formulario-iniciar-sesion', {
          title: 'Iniciar Sesión',
          error: 'Credenciales inválidas',
        });
      }
  
      console.log('Contraseña recibida:', contrasena);
      console.log('Contraseña almacenada:', usuario.contrasena);
  
      // Verifica la contraseña hasheada
      const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
  
      if (!contrasenaValida) {
        // Contraseña incorrecta
        return res.render('usuario/formulario-iniciar-sesion', {
          title: 'Iniciar Sesión',
          error: 'La contraseña es incorrecta',
        });
      }
  
      // Si las credenciales son válidas, genera un token de autenticación
      const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET || 'proyectotechconnectUpros', {
        expiresIn: '1h',
      });
  
      // Envía el token como cookie o como respuesta JSON
      res.cookie('_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      });
  
      // Puedes redirigir al usuario a una página de inicio
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }
  };
  
// Controlador usuariosController.js
const mostrarFormularioIniciarSesion = (req, res) => {
    // Aquí puedes renderizar el formulario de inicio de sesión
    res.render('usuario/formulario-iniciar-sesion', { title: 'Iniciar Sesión' });
};
  
  // Otras funciones relacionadas con usuarios
  // Por ejemplo, función para ver el perfil, actualizar información, etc.
  
  // Exporta las funciones
export { 
registroUsuario, 
iniciarSesion,
mostrarFormularioIniciarSesion,
mostrarFormularioRegistro
};