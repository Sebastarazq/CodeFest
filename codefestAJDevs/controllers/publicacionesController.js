import jwt from 'jsonwebtoken';
import Publicacion from '../models/Publicacion.js'; 
import Usuario from '../models/Usuario.js';


const mostrarTodasLasPublicaciones = async (req, res) => {
    try {
      const publicaciones = await Publicacion.find();
  
      // Obtén el token de la cookie
      const token = req.cookies._token;
  
      // Decodifica el token para obtener el payload
      let decodedToken;
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'proyectotechconnectUpros');
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return res.status(401).json({ error: 'Token no válido' });
      }
  
      // El _id del usuario estará en el campo "id" del payload del token
      const userId = decodedToken.id;
      console.log('ID del usuario:', userId);
  
      // Busca al usuario en la base de datos usando el _id
      const usuario = await Usuario.findById(userId);
      console.log('Usuario encontrado:', usuario);
  
      // Verifica si se encontró al usuario y obtén su nombre
      const username = usuario ? usuario.nombre : 'Invitado';
      console.log('Nombre de usuario:', username);
  
      // Renderiza la vista y pasa las publicaciones y el nombre de usuario como datos
      res.render('principal/inicio', { publicaciones, username });
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
      res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
};
  

export {
  mostrarTodasLasPublicaciones
};
