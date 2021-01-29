const path = require('path')
const express = require('express')
const cors = require('cors')
const puppeteer = require('puppeteer')
const { v4: uuidv4 } = require('uuid')
const bodyParser = require('body-parser')

const app = express()
app.use(cors({origin: true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './client/build')))


//Take a screenshot of a given page
app.post('/api/screenshot/:d', async (req, res)=>{
	try {
		const browser = await puppeteer.launch({ headless: true })
		const page = await browser.newPage()
		const saveTo = __dirname + '/screenshots/' + uuidv4() + '.jpg'
		
		console.log(req.body)
		
		await page.goto(req.body.url)
		
		await page.screenshot({
			path: saveTo,
			type: "jpeg",
		})
		
		await page.close()
		await browser.close()
		
		return res.json({url: saveTo})
		
	} catch (err) {
		console.error(err)
		res.status(500).json({error:'Unable to create screenshot!'})
	}
})

//Start listening for requests
const PORT = process.env.PORT || 5000
app.listen(PORT)

