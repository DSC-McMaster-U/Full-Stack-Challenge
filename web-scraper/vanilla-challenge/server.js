const express = require('express');

const server = express();

const path = require('path');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const scrape = require('./scrape.js');
const scrapeData = require('./scrape.js');

server.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

server.use(bodyParser.urlencoded({ extended: false }));

server.post('/scrape', async function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
	const url = req.body.url;
	const img = await scrapeData(url);
	document.getElementById('tings').src = img;
});

server.listen(PORT);

console.log('server running');
