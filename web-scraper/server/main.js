const path = require('path')
const express = require('express')

const app = express()
const cors = require('cors')
app.use(cors({origin: true}))

const PORT = process.env.PORT || 5000

const withReact = true //set to false if you don't want react
const url = withReact ? path.resolve(__dirname, '../react-challenge/build', 'index.html') : path.resolve(__dirname, '../vanilla-challenge', 'index.html')



//Answer API requests ---
app.get('/api/createSheet', (req, res)=>{
	res.set('Content-Type', 'application/json');
	res.send('{"message":"Hello from the custom server!"}')
})



app.get('/api/getTextSnippets', (req, res) => {
	res.json('Hello world')
})



//Send all requests (other than  api requests) to correct index.html
app.get('*', (req, res)=>{
	res.sendFile(url)
})



//Start listening for requests
app.listen(PORT, (e)=>{
	console.error(e)
})