const path = require('path')
const express = require('express')
const cors = require('cors')
const puppeteer = require('puppeteer')
const { v4: uuidv4 } = require('uuid')
const bodyParser = require('body-parser')
const { BlobServiceClient } = require('@azure/storage-blob');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const app = express()
app.use(cors({origin: true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './client/build')))


//Take a screenshot of a given page
app.post('/api/screenshot', async (req, res)=>{
	
	//Check if url is blank
	if (!req.body.url){
		res.status(500).json({error:'Missing URL'})
	}
	
	try {
		//take the screenshot as base64
		const browser = await puppeteer.launch({ headless: true })
		const page = await browser.newPage()
		await page.goto(req.body.url)
		const screenshot = await page.screenshot({type: "jpeg", encoding: 'binary'})
		const blobName = uuidv4() + '.jpg'
		
		
		//Upload to azure
		const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING)
		const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER)
		const blockBlobClient = containerClient.getBlockBlobClient(blobName)
		const uploadBlobResponse = await blockBlobClient.upload(screenshot, screenshot.length);
		
		//Close puppeteer
		await page.close()
		await browser.close()
		
		return res.json({url:'Works'})
		
	} catch (err) {
		console.error(err)
		res.status(500).json(JSON.stringify(err))
	}
})

//Start listening for requests
const PORT = process.env.PORT || 5000
app.listen(PORT)