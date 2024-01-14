let db = require('./db.json')
const mongoose = require('mongoose');
const fs = require("fs");

class Evento {
  constructor({
    titulo,
    classe,
    classeId,
    descricao,
    data }
  ) {
    this._id = new mongoose.mongo.ObjectId();
    this.titulo = titulo
    this.classe = classe
    this.classeId = classeId
    this.descricao = descricao
    this.data = data
  }
}

async function create(input) {
  const evento = new Evento(input)
  db.push(evento)
  saveDb(JSON.stringify(db))
  return evento
}

async function getAll() {
  db = getDbData()
  const arrayConvertido = converterStringParaData(db)
  db = ordenarPorData(arrayConvertido)
  return db
}

async function checkDb() {
  console.log(`DB have ${db.length} entries, and is already to be used`)
}



function saveDb(db) {
  fs.writeFile("./config/nodb/db.json", db, (error) => {
    if (error) {
      console.error(error);
      throw error;
    }
    console.log("db.json saved");
  });
}

function getDbData() {
  try {
    const data = fs.readFileSync("./config/nodb/db.json");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function converterStringParaData(array) {
  return array.map(function (obj) {
    // Se a propriedade data já é uma instância de Date, mantenha-a.
    // Caso contrário, converta a string para um objeto Date.
    obj.data = obj.data instanceof Date ? obj.data : new Date(obj.data);
    return obj;
  });
}

function ordenarPorData(array) {
  return array.sort(function (a, b) {
    return a.data - b.data;
  });
}

module.exports = { create, getAll, checkDb, Evento }