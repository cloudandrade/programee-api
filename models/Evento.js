const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Evento = new Schema({
  _id: {
    type: String
  },
  titulo: {
    type: String,
    required: true,
  },
  classe: {
    type: String,
  },
  classeId: {
    type: Number,
  },
  descricao: {
    type: String,
  },
  data: {
    type: Date,
  },
  horario: {
    type: String,
  }
});
mongoose.model('eventos', Evento);