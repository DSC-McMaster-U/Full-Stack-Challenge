const express = require('express');

const server = express();

const path = require('path');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const scrape = require('./scrape.js');
const scrapeData = require('./scrape.js');

server.set('view engine', 'html');
server.engine('html', require('ejs').renderFile);

server.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

server.use(bodyParser.urlencoded({ extended: false }));

server.post('/scrape', async function (req, res) {
	const url = req.body.url;
	const image = await scrapeData(url);
	console.log(image);
	res.render(__dirname + '/index.html', { img: image });
});

server.listen(PORT);

console.log('server running');
