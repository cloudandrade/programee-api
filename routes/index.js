const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodb = require('../config/nodb/nodb')

require('../models/Evento'); //importando o model para ser usado
const Evento = mongoose.model('eventos'); //passando o valor do model para uma variavel e relacionando a collection

router.get('/', async (req, res) => {
	res.send('programee-api :: online');
});

//get all itens
router.get('/eventos', async (req, res) => {
	console.log('Buscando lista de eventos ordenando pela data');
	if (process.env.DB_STRATEGY && process.env.DB_STRATEGY === 'nodb') {
		res.json(await nodb.getAll())
	} else {
		await Evento.find({}).sort({ data: 'asc' }).exec()
			.then((lista) => {
				res.json(lista);
			});
	}
});

//criando o evento
router.post('/evento', async (req, res) => {
	console.log('Criando novo evento');
	console.log('req ' + req.body)

	if (process.env.DB_STRATEGY && process.env.DB_STRATEGY === 'nodb') {
		let novoEvento = req.body;
		novoEvento.data = new Date(novoEvento.data)
		const eventoCriado = await nodb.create(novoEvento)
		console.log('evento enviado: ' + JSON.stringify(eventoCriado))
		res.json(eventoCriado)
	} else {
		let novoEvento = req.body;
		novoEvento.data = Date.parse(novoEvento.data)
		novoEvento._id = new mongoose.mongo.ObjectId();
		console.log('evento enviado: ' + JSON.stringify(novoEvento))
		const eventoCriado = await Evento.create(novoEvento);
		res.json(eventoCriado);
	}
});

module.exports = router;
