const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/keys').MongoURI;
const routes = require('./routes');
require('dotenv').config()

const mongoose = require('mongoose');
const cors = require('cors');

//EXPRESS
const app = express();

//SERVER PORT
const PORT = process.env.PORT || 5000;

//BODY PARSER
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//routes
app.use(routes);

if (process.env.DB_STRATEGY && process.env.DB_STRATEGY === 'hosted') {
  //MONGO ONLINE - Atlas

  console.log('AtlasDb Starting Connection...');
  mongoose
    .connect(db, {})
    .then(() => {
      console.log('AtlasDb Connected...');
    })
    .catch((err) => {
      console.log('Falha ao conectar ao AtlasDb');
      console.log(err);
    });
} else {
  // MONGOOSE local

  console.log('MongoDb Starting Connection...');
  mongoose.Promise = global.Promise;
  mongoose
    .connect('mongodb://localhost/tealist', {})
    .then(() => {
      console.log('Mongodb connected...');
    })
    .catch((erro) => {
      console.log('houve um problema ao se conectar ao banco de dados, erro: ' + erro);
    })
}

//SERVER
app.listen(process.env.port || PORT, console.log(`Server started on port ${PORT}`));