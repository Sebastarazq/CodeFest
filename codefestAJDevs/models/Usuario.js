
import mongoose from 'mongoose';

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
      ref: 'Usuario',
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

export default mongoose.model('Usuario', usuarioSchema);
