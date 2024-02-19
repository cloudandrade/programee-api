const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodb = require('../config/nodb/nodb');

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
	console.log('req ' + JSON.stringify(req.body));

	let novoEvento = req.body;

	// Verifica se a data e o horário estão presentes
	if (!novoEvento.data || !novoEvento.horario) {
		return res.status(400).json({ error: 'Data e horário são obrigatórios.' });
	}

	// Formatação correta da data
	novoEvento.data = formatDate(novoEvento.data, novoEvento.horario);

	if (process.env.DB_STRATEGY && process.env.DB_STRATEGY === 'nodb') {
		const eventoCriado = await nodb.create(novoEvento);
		console.log('evento criado: ' + JSON.stringify(eventoCriado));
		res.json(eventoCriado);
	} else {
		// Geração de novo ID para o evento
		novoEvento._id = new mongoose.mongo.ObjectId();

		const eventoCriado = await Evento.create(novoEvento);
		console.log('evento criado: ' + JSON.stringify(eventoCriado));
		res.json(eventoCriado);
	}
});

function formatDate(date, time) {
	const formattedDate = new Date(`${date}T${time}:00Z`);
	return formattedDate.toISOString();
}

module.exports = router;
