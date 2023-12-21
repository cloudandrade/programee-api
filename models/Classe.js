const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Classe = new Schema({
  _id: {
    type: String,
    required: true,
  },
  classe: {
    type: String,
    required: true,
  }
});
mongoose.model('classe', Classe);