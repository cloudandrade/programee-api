const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Evento'); //importando o model para ser usado
const Evento = mongoose.model('eventos'); //passando o valor do model para uma variavel e relacionando a collection

router.get('/', async (req, res) => {
	res.send('programee-api :: online');
});

//get all itens
router.get('/eventos', async (req, res) => {
	console.log('Buscando lista de eventos ordenando pela data');
	Evento.find({})
		/* .sort({ id: 'asc' }) */
		.then((lista) => {
			res.json(lista);
		});
});

//criando o evento
router.post('/evento', async (req, res) => {
	console.log('Criando novo evento');
	const novoEvento = req.body;

	console.log('Objeto Enviado: ');
	console.log(evento);
	const eventoCriado = await Evento.create(novoEvento);
	res.json(eventoCriado);
});

module.exports = router;
