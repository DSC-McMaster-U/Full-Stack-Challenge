import './App.css'
import {useState} from 'react'
import {Card, Container, FormControl, Button} from 'react-bootstrap'

function App() {
	
	const [url, setUrl] = useState('')
	
	function submit(){
		console.log(url)
	}
	
	return (
		<div className="App">
			
			<Container>
				<div className="topBar">
					
					<FormControl 
						className='urlBar' 
						value={url} 
						onChange={e=>setUrl(e.target.value)}
					/>
					
					<Button  className = 'submitButton' onClick={submit}>Submit</Button>
				</div>
				
				
				<Card className='mainCard'>
					<Card.Body>
						Scraped Content Goes Here!
					</Card.Body>
					
				</Card>
				
			</Container>
			
		</div>
	)
}

export default App;
