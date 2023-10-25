import mongoose from 'mongoose';

const comentarioSchema = new mongoose.Schema({
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario', 
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  publicacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'publicacion',
    required: true,
  },
});

export default mongoose.model('Comentario', usuarioSchema, 'comentario');
