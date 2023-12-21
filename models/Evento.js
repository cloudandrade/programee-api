const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Evento = new Schema({
  _id: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  classe: {
    type: String,
  },
  classeId: {
    type: String,
  },
  descricao: {
    type: String,
  },
  data: {
    type: Date,
  },
});
mongoose.model('eventos', Evento);