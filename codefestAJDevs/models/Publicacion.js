
import mongoose from 'mongoose';

const publicacionSchema = new mongoose.Schema({
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  compartidos: {
    type: Number,
    default: 0,
  },
  comentarios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comentarios',
    },
  ],
});

export default mongoose.model('Publicacion', publicacionSchema);
