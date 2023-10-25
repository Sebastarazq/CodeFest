import mongoose from 'mongoose';

const publicacionSchema = new mongoose.Schema({
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
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
      ref: 'comentario',
    },
  ],
  fecha: {
    type: Date,
    default: Date.now, // Establece la fecha de creación por defecto como la fecha actual.
  },
});

export default mongoose.model('Publicacion', publicacionSchema, 'publicacion');
