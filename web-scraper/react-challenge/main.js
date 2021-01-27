const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()

const url = path.join(__dirname, './client/build')
const PORT = process.env.PORT || 5000

app.use(cors({origin: true}))
app.use(express.static(url))

//Answer API requests ---
app.get('/api/screenshot', (req, res)=>{
	console.log(req.body.url)
	
	res.set('Content-Type', 'application/json')
	res.send('{"message":"Hello from the custom server!"}')
})

//Start listening for requests
app.listen(PORT)