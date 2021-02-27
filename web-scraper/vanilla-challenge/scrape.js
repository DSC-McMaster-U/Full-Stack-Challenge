const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');

async function scrapeData(url) {
	try {
		const browser = await puppeteer.launch({ headless: false });

		const page = await browser.newPage();
		path = __dirname + '/' + uuidv4() + '.png';
		await page.goto(url);
		await page.screenshot({ path: path });
		return path;
	} catch (err) {
		console.log(err);
	}
}

module.exports = scrapeData