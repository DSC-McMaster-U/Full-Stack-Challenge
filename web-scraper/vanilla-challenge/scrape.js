const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');
const { BlobServiceClient } = require('@azure/storage-blob');

require('dotenv').config();
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

async function scrapeData(url) {
	try {
		const browser = await puppeteer.launch({ headless: false });

		const page = await browser.newPage();
		console.log(1);
		const blobName = uuidv4() + '.jpg';
		console.log(2);
		const path = 'https://fullstackchallenge.blob.core.windows.net/challenge2/' + blobName;
		console.log(3);
		await page.goto(url);
		console.log(4);
		const screenshot = await page.screenshot({ type: 'jpeg', encoding: 'binary' });
		console.log(6);
		containerName = 'challenge2';
		//Upload to azure
		const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
		const containerClient = blobServiceClient.getContainerClient(containerName);
		const blockBlobClient = containerClient.getBlockBlobClient(blobName);
		const uploadBlobResponse = await blockBlobClient.upload(screenshot, screenshot.length);
		console.log(1);

		console.log('See the blob here: ' + path);
		await browser.close();
		return path;
	} catch (err) {
		console.log(err);
	}
}

module.exports = scrapeData;
