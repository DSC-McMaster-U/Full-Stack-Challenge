import './App.css'
import axios from 'axios'
import React, {useState} from 'react'
import {Card, Container, FormControl, Button} from 'react-bootstrap'

function App() {
	
	const [url, setUrl] = useState('http://google.com')
	
	const [screenshotURL, setScreenshotURl] = useState('')
	
	async function submit(){
		try{
			const result = await axios.post('http://localhost:5000/api/screenshot', {
				url: url
			})

			console.log(result)
			setScreenshotURl(result.data.url)
		}catch(err){
			console.error(err)
		}
		
	}
	
	return (
		<div className="App">
			
			<Container>
				<div className="topBar">
					
					<FormControl 
						className='urlBar' 
						placeholder='Enter a URL'
						value={url} 
						onChange={e=>setUrl(e.target.value)}
					/>
					<Button  className = 'submitButton' onClick={submit}>Submit</Button>
				</div>
				
				
				<Card className='mainCard'>
					<Card.Body>
						<img src={screenshotURL} style={{width:'100%', height:'100%'}}/>
					</Card.Body>
					
				</Card>
				
			</Container>
			
		</div>
	)
}

export default App;
