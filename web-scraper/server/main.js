const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()

const withReact = true //set to false if you don't want react
const url = withReact ? path.join(__dirname, '../react-challenge/build') : path.resolve(__dirname, '../vanilla-challenge')
const PORT = process.env.PORT || 5000

app.use(cors({origin: true}))
app.use(express.static(url))



//Answer API requests ---
app.get('/api/createSheet', (req, res)=>{
	res.set('Content-Type', 'application/json');
	res.send('{"message":"Hello from the custom server!"}')
})



app.get('/api/getTextSnippets', (req, res) => {
	res.json('Hello world')
})


//Start listening for requests
app.listen(PORT)