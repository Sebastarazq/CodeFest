import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  foto_de_perfil: {
    type: String,
  },
  descripción: {
    type: String,
  },
  amigos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuario',
    },
  ],
  publicaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publicacion',
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publicacion',
    },
  ],
  compartidos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publicacion',
    },
  ],
});

// Middleware para hash de la contraseña antes de guardarla
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) {
    return next();
  }
  try {
    const saltRounds = 10;
    const hashContrasena = await bcrypt.hash(this.contrasena, saltRounds);
    this.contrasena = hashContrasena;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('Usuario', usuarioSchema, 'usuario');

