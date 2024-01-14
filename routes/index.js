const express = require('express');
const router = express.Router();
const nodb = require('../config/nodb/nodb')

require('../models/Evento'); //importando o model para ser usado
const Evento = mongoose.model('eventos'); //passando o valor do model para uma variavel e relacionando a collection

router.get('/', async (req, res) => {
	res.send('programee-api :: online');
});

//get all itens
router.get('/eventos', async (req, res) => {
	console.log('Buscando lista de eventos ordenando pela data');
	res.json(await nodb.getAll())
});

//criando o evento
router.post('/evento', async (req, res) => {
	console.log('Criando novo evento');
	console.log('req ' + JSON.stringify(req.body))
	let novoEvento = req.body;
	novoEvento.data = new Date(novoEvento.data)
	const eventoCriado = await nodb.create(novoEvento)
	console.log('evento enviado: ' + JSON.stringify(eventoCriado))
	res.json(eventoCriado)
});

module.exports = router;
