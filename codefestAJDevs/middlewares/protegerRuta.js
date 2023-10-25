import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const protegerRuta = async (req, res, next) => {
  // Verificar si hay un token
  // Extraemos la cookie
  const { _token } = req.cookies;
  if (!_token) {
    return res.redirect('/iniciar-sesion');
  }

  // Comprobar el token
  try {
    const decoded = jwt.verify(_token, process.env.JWT_SECRET || 'proyectotechconnectUpros');
    const usuario = await Usuario.findOne({ _id: decoded.id }).select('-password');

    // Almacenar el usuario en req
    // Si hay un usuario o existe el usuario
    if (usuario) {
      req.usuario = usuario;
      return next();
    } else {
      return res.redirect('/iniciar-sesion');
    }
  } catch (error) {
    return res.clearCookie('_token').redirect('/iniciar-sesion');
  }
};

export default protegerRuta;
