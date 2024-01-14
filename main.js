const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
require('dotenv').config()
const nodb = require('./config/nodb/nodb')
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
nodb.checkDb()

//SERVER
app.listen(process.env.port || PORT, console.log(`Server started on port ${PORT}`));