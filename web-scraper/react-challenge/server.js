const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


//Load environment variables 
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

//Configure Express
const app = express()
app.use(cors({origin: true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './client/build')))



//Start listening for requests
const PORT = process.env.PORT || 5000
app.listen(PORT)